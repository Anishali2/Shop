import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import Theme from '../../Theme/Theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {moderateScale} from '../../Theme/Dimensions';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {ScalableImage} from './ScalableImage';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Header} from '../../assets/Components/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import ImageCropPicker from 'react-native-image-crop-picker';
import {useSelector, useDispatch} from 'react-redux';
import {updateSelectedImages} from '../../redux/actions/auth';
import {
  createSellerPost,
  getHomePosts,
  getSearchPost,
} from '../../redux/actions/home';
import ShowSnackBar from '../../assets/Components/ShowSnackBar';
import {CustomActivity} from '../../assets/Components/CustomActivity';
import {BallIndicator} from 'react-native-indicators';
import * as types from '../../redux/actions/types';

const {width, height} = Dimensions.get('window');

const HomeScreen = ({navigation}) => {
  const {type, createPostImages, uid, email} = useSelector(state => state.auth);
  const [data, setData] = useState([]);
  const [moreImages, setMoreImages] = useState([]);
  const [description, setDescription] = useState('');
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);
  const [showShimmer, setShowShimmer] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [allSellers, setAllSellers] = useState([]);
  const [searchData, setSearchData] = useState(allSellers);
  const [showSearch, setShowSearch] = useState(false);
  const images = useRef();
  const createPost = useRef();
  const dispatch = useDispatch();
  const showSearchModel = useRef();

  useEffect(() => {
    handleGetPosts();
  }, []);

  const handleGetPosts = () => {
    var formdata = new FormData();
    formdata.append('__api_key__', 'secret key');
    setShowShimmer(true);
    dispatch(getHomePosts(formdata, onSuccessGetPost, onErrorgetPost));
  };

  const onSuccessGetPost = res => {
    console.log(res);
    setData(res);
    setShowShimmer(false);
  };

  const onErrorgetPost = err => {
    setShowShimmer(false);
  };

  const handleHomeNavigation = item => {
    if (item.seller_uid === uid) {
      navigation.navigate('Profile');
    } else {
      navigation.navigate('OtherProfile', {item: item});
    }
  };

  const handleDeltePost = item => {
    var formdata = new FormData();
    formdata.append('__api_key__', 'secret key');
    formdata.append('post_uid', item);
    setShowShimmer(true);
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    fetch(`${types.BASEURL}/delete_post.php`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setShowShimmer(false);
        setData(data.filter(f => f.post_uid !== item));
        ShowSnackBar('Post has been deleted', 'green');
      })
      .catch(error => {
        setShowShimmer(false);
        ShowSnackBar('There was some error...', 'red');
      });
  };

  const renderItem = ({item, index}) => {
    return (
      <View key={index} style={styles.flatlistCardContainer}>
        <View style={styles.cardTOpWrapper}>
          <View style={styles.topImageWrapper}>
            <TouchableOpacity
              onPress={() => handleHomeNavigation(item)}
              activeOpacity={1}>
              <Image
                source={{uri: item.profile_picture}}
                resizeMode="cover"
                style={styles.flatlistUserImage}
              />
            </TouchableOpacity>
            <View
              style={{
                marginLeft: moderateScale(10),
              }}>
              <Text
                onPress={() => handleHomeNavigation(item)}
                style={styles.flatListUserName}>
                {item.first_name} {item.last_name}
              </Text>
              <View style={styles.flatlistDateWrapper}>
                <FontAwesome5
                  name="calendar-alt"
                  size={moderateScale(17)}
                  color="#2EC8B2"
                />
                <Text style={styles.flatlistDate}>{item.created_at}</Text>
              </View>
            </View>
          </View>
          {item.seller_uid === uid && (
            <Text
              onPress={() => handleDeltePost(item.post_uid)}
              style={styles.delete}>
              Delete
            </Text>
          )}
        </View>
        <Text style={[styles.flatlistDate, styles.description]}>
          {item.description}
        </Text>
        {item?.post_image[0] && (
          <View style={styles.flatListImagesWrapper}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => handleShowMoreImages(item.post_image)}>
              <Image
                source={{uri: item?.post_image[0]}}
                resizeMode="cover"
                style={
                  item?.post_image[1]
                    ? styles.image1
                    : [
                        styles.image1,
                        {
                          width: (width / 100) * 90 - moderateScale(30),
                        },
                      ]
                }
              />
            </TouchableOpacity>
            {item?.post_image[1] && (
              <View style={styles.subImagesWrapper}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => handleShowMoreImages(item.post_image)}
                  style={
                    item?.post_image[1]
                      ? styles.image2
                      : [
                          styles.image2,
                          {
                            height: '100%',
                          },
                        ]
                  }>
                  <Image
                    source={{uri: item?.post_image[1]}}
                    resizeMode="cover"
                    style={{width: '100%', height: '100%'}}
                  />
                </TouchableOpacity>
                {item?.post_image[2] && (
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => handleShowMoreImages(item.post_image)}>
                    <ImageBackground
                      source={{uri: item?.post_image[2]}}
                      resizeMode="cover"
                      borderRadius={moderateScale(20)}
                      style={styles.viewMoreImage}>
                      {item?.post_image[3] && (
                        <>
                          <View style={styles.backBlurr} />
                          <Text style={styles.viewmOreTag}>
                            +{item?.post_image.length - 2}
                          </Text>
                        </>
                      )}
                    </ImageBackground>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        )}
        <View style={styles.flatlistBottomReactionContainer}>
          <MaterialCommunityIcons
            name="heart"
            color={'#F76652'}
            size={moderateScale(20)}
            style={{
              marginLeft: moderateScale(20),
            }}
          />
          <Text style={styles.flatlistDate}>102</Text>
          <MaterialCommunityIcons
            name="message-bulleted"
            color="#2EC8B2"
            size={moderateScale(20)}
            style={{
              marginLeft: moderateScale(20),
            }}
          />
          <Text style={styles.flatlistDate}>102</Text>
        </View>
      </View>
    );
  };

  const handleShowMoreImages = post_image => {
    setMoreImages(post_image);
    images.current.open();
  };

  const createPostRenderItem = ({item, index}) => {
    return (
      <View
        key={item.name}
        style={{
          width: (((width / 100) * 90) / 100) * 34,
          height: (((width / 100) * 90) / 100) * 34,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: moderateScale(20),
          marginRight: moderateScale(5),
        }}>
        <Image
          source={{
            uri: item.uri,
          }}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: moderateScale(20),
          }}
        />
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            let imagesData = createPostImages.filter(f => f.name !== item.name);
            dispatch(updateSelectedImages(imagesData));
          }}
          style={{
            position: 'absolute',
            top: moderateScale(5),
            right: moderateScale(5),
            backgroundColor: 'white',
            borderRadius: 100,

            elevation: moderateScale(5),
            width: moderateScale(31),
            height: moderateScale(31),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Ionicons
            name="close-circle"
            size={moderateScale(33)}
            color="#2FC8B3"
            style={{
              top: moderateScale(-3),
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const handleCamera = () => {
    let imagesData = createPostImages;
    ImageCropPicker.openCamera({
      width: 300,
      height: 400,
      mediaType: 'photo',
      //   cropping: true,
    }).then(image => {
      var filename = image.path.replace(/^.*[\\\/]/, '');
      const data = {type: image.mime, uri: image.path, name: filename};
      imagesData.push(data);
      dispatch(updateSelectedImages(imagesData));
    });
  };

  const handleGallery = () => {
    let imagesData = createPostImages;
    ImageCropPicker.openPicker({
      multiple: true,
      mediaType: 'photo',
    }).then(image => {
      let tempData = image.map(k => {
        var filename = k.path.replace(/^.*[\\\/]/, '');
        return {
          type: k.mime,
          uri: k.path,
          name: filename,
        };
      });
      tempData.forEach(k => {
        imagesData.push(k);
      });
      dispatch(updateSelectedImages(imagesData));
    });
  };

  const handleCreatePost = () => {
    if (description.length === 0) {
      ShowSnackBar('Please Enter the title of Post...', 'red');
    } else {
      if (createPostImages.length === 0) {
        ShowSnackBar('Please upload atleast 1 image...', 'red');
      } else {
        var formdata = new FormData();
        formdata.append('__api_key__', 'secret key');
        formdata.append('seller_uid', uid);
        formdata.append('description', description);
        createPostImages.map(k => {
          formdata.append('images[]', {
            name: k.name,
            type: k.type,
            uri: k.uri,
          });
        });
        setShowActivityIndicator(true);
        dispatch(createSellerPost(formdata, onSuccess, onError));
      }
    }
  };

  const onSuccess = res => {
    setShowActivityIndicator(false);
    ShowSnackBar('Post has been created Successfully...', 'green');
    createPost.current.close();
    dispatch(updateSelectedImages(''));
    setDescription('');
    handleGetPosts();
  };

  const onError = err => {
    setShowActivityIndicator(false);
    ShowSnackBar('There was some error creating Post', 'red');
  };

  const handleSearch = text => {
    setSearchValue(text);
    setSearchData(
      allSellers.filter(f =>
        f.full_name.toLowerCase().match(text.toLowerCase()),
      ),
    );
  };

  const searchRenderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSearchValue('');
          showSearchModel.current.close();
          navigation.navigate('OtherProfile', {item: item});
        }}
        activeOpacity={1}
        style={styles.searchWrapper}>
        <View style={styles.searchContainer}>
          <Image
            source={{uri: item.profile_picture}}
            resizeMode="cover"
            style={styles.searchImage}
          />
          <Text style={styles.searchTag}>{item.full_name}</Text>
        </View>
        <FontAwesome5
          name="chevron-right"
          color="#191B32"
          size={moderateScale(18)}
        />
      </TouchableOpacity>
    );
  };

  const handleShowSearch = () => {
    var formdata = new FormData();
    formdata.append('__api_key__', 'secret key');

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };
    setShowShimmer(true);
    fetch(`${types.BASEURL}/get_all_sellers.php`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.state === 'OK') {
          setShowShimmer(false);
          setAllSellers(result.data.all_sellers);
          showSearchModel.current.open();
        } else {
          setShowShimmer(false);
          ShowSnackBar('There was some error', 'red');
        }
      })
      .catch(error => console.log('error', error));
  };

  return (
    <View style={styles.mainContainer}>
      <Header
        LeftIcon={() => (
          <MaterialCommunityIcons
            name="magnify"
            color="transparent"
            size={moderateScale(28)}
          />
        )}
        RightIcon={() => (
          <MaterialCommunityIcons
            onPress={() => handleShowSearch()}
            name="magnify"
            color="#2EC8B2"
            size={moderateScale(28)}
          />
        )}
        Tag={'Shopenlive'}
      />
      {data.length === 0 ? (
        <Text style={styles.noPost}>No posts to show</Text>
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingBottom: moderateScale(110),
            paddingTop: moderateScale(70),
          }}
          showsVerticalScrollIndicator={false}
        />
      )}
      {type === 2 && (
        <AntDesign
          onPress={() => {
            dispatch(updateSelectedImages([]));
            setDescription('');
            createPost.current.open();
          }}
          name="pluscircle"
          color="#2EC8B2"
          size={moderateScale(60)}
          style={{
            position: 'absolute',
            bottom: moderateScale(90),
            right: (width / 100) * 5,
            backgroundColor: 'white',
            borderRadius: 100,
            elevation: moderateScale(5),
          }}
        />
      )}
      <RBSheet
        openDuration={800}
        ref={images}
        height={height}
        closeOnDragDown={false}>
        <ScalableImage source={moreImages} close={images} />
      </RBSheet>
      <RBSheet
        openDuration={800}
        ref={showSearchModel}
        height={height}
        customStyles={{
          container: {
            backgroundColor: 'transparent',
          },
        }}
        closeOnPressBack={true}
        closeOnDragDown={false}>
        <View style={styles.searchContainerWrapper}>
          <View style={styles.searchBarContainer}>
            <MaterialCommunityIcons
              name="magnify"
              color="#2EC8B2"
              size={moderateScale(28)}
              style={{
                marginRight: moderateScale(10),
              }}
            />
            <TextInput
              placeholder="Search here"
              value={searchValue}
              onChangeText={handleSearch}
              style={styles.searchINputField}
            />
          </View>

          <FlatList
            data={searchData}
            renderItem={searchRenderItem}
            style={{
              marginVertical: moderateScale(10),
            }}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: moderateScale(2),
                  backgroundColor: '#2FC8B3',
                  width: '90%',
                  alignSelf: 'center',
                  marginVertical: moderateScale(10),
                }}
              />
            )}
          />

          <Text
            onPress={() => showSearchModel.current.close()}
            style={styles.searchBackButton}>
            Back
          </Text>
        </View>
      </RBSheet>
      <RBSheet
        openDuration={800}
        ref={createPost}
        height={height}
        closeOnPressBack={false}
        closeOnDragDown={false}>
        <View
          style={{
            flex: 1,
          }}>
          <ScrollView
            style={{
              flex: 1,
              backgroundColor: 'white',
            }}
            contentContainerStyle={{
              paddingBottom: moderateScale(110),
              paddingTop: moderateScale(70),
            }}
            showsVerticalScrollIndicator={false}>
            <Header
              LeftIcon={() => (
                <Ionicons
                  onPress={() => createPost.current.close()}
                  name="arrow-back"
                  color="#2EC8B2"
                  size={moderateScale(28)}
                />
              )}
              RightIcon={() => (
                <Ionicons
                  name="arrow-back"
                  color="transparent"
                  size={moderateScale(28)}
                />
              )}
              Tag={'Create Post'}
            />
            <TextInput
              placeholder="What's on your mind?...."
              value={description}
              onChangeText={setDescription}
              keyboardType="default"
              multiline={true}
              style={styles.inputField}
            />
            <FlatList
              data={createPostImages}
              horizontal={true}
              renderItem={createPostRenderItem}
              keyExtractor={(item, index) => (item + index).toString()}
              ListFooterComponent={() => {
                return (
                  <View
                    style={{
                      width:
                        (((width / 100) * 90) / 100) * 33.33 -
                        ((width / 100) * 5) / 3,
                      height:
                        (((width / 100) * 90) / 100) * 33.33 -
                        ((width / 100) * 5) / 3,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: moderateScale(20),
                      overflow: 'hidden',
                    }}>
                    <AntDesign
                      name="pluscircle"
                      color="#2EC8B2"
                      size={moderateScale(60)}
                      style={{
                        backgroundColor: 'white',
                        borderRadius: 100,
                      }}
                    />
                  </View>
                );
              }}
              contentContainerStyle={{
                paddingLeft: (width / 100) * 5,
              }}
              showsHorizontalScrollIndicator={false}
            />
            <View style={styles.footerWrapper}>
              <View style={styles.separator} />
              <View style={styles.buttonWrapper}>
                <Ionicons
                  onPress={() => handleGallery()}
                  name="md-images"
                  color="#B7B7B7"
                  size={moderateScale(30)}
                />
                <View
                  style={{
                    width: moderateScale(1),
                    height: '65%',
                    backgroundColor: '#2FC8B3',
                  }}
                />
                <Entypo
                  onPress={() => handleCamera()}
                  name="camera"
                  color="#B7B7B7"
                  size={moderateScale(30)}
                />
              </View>
            </View>
            <Text onPress={() => handleCreatePost()} style={styles.POST}>
              POST
            </Text>
          </ScrollView>
          {showActivityIndicator && <CustomActivity />}
        </View>
      </RBSheet>
      {showShimmer && <CustomActivity />}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },

  flatlistCardContainer: {
    width: (width / 100) * 90,
    borderWidth: 0.5,
    backgroundColor: 'white',
    elevation: moderateScale(5),
    borderColor: '#9295A3',
    alignSelf: 'center',
    borderRadius: moderateScale(20),
    paddingHorizontal: moderateScale(15),
    paddingTop: moderateScale(20),
    paddingBottom: moderateScale(10),
    marginTop: moderateScale(20),
  },
  topImageWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  flatlistUserImage: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#2EC8B2',
  },
  flatListUserName: {
    fontSize: moderateScale(18),
    fontFamily: Theme.fontFamily.Poppins_Regular,
    color: '#191B32',
  },
  flatlistDateWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  flatlistDate: {
    fontFamily: Theme.fontFamily.Poppins_Regular,
    fontSize: moderateScale(12),
    color: '#191B32',
    marginLeft: moderateScale(5),
  },
  description: {
    marginTop: moderateScale(15),
  },
  flatListImagesWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: moderateScale(10),
  },
  image1: {
    width: (width / 100) * 45 - moderateScale(20),
    borderRadius: moderateScale(20),
    height: (height / 100) * 30,
  },
  subImagesWrapper: {
    height: (height / 100) * 30,
    width: (width / 100) * 50 - (width / 100) * 5 - moderateScale(20),
    justifyContent: 'space-between',
  },
  image2: {
    width: '100%',
    height: '48.5%',
    borderRadius: moderateScale(20),
    overflow: 'hidden',
  },
  viewMoreImage: {
    height: (((height / 100) * 30) / 100) * 48.5,
    width: (width / 100) * 50 - (width / 100) * 5 - moderateScale(20),
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBlurr: {
    backgroundColor: 'black',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: moderateScale(20),
    opacity: 0.4,
  },
  viewmOreTag: {
    color: 'white',
    fontSize: moderateScale(24),
    fontFamily: Theme.fontFamily.Poppins_Bold,
  },
  flatlistBottomReactionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: moderateScale(5),
  },
  showMoreWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: moderateScale(100),
  },
  inputField: {
    width: (width / 100) * 90,
    height: (height / 100) * 21,
    backgroundColor: 'white',
    elevation: moderateScale(5),
    borderRadius: moderateScale(10),
    alignSelf: 'center',
    borderWidth: moderateScale(1),
    borderColor: '#9295A3',
    textAlignVertical: 'top',
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(15),
    fontSize: moderateScale(12),
    fontFamily: Theme.fontFamily.Poppins_Medium,
    color: '#979797',
    marginBottom: moderateScale(20),
  },
  footerWrapper: {
    width: width,
    marginTop: moderateScale(20),
    // alignSelf: 'center',
    alignItems: 'center',
  },
  separator: {
    width: (width / 100) * 90,
    height: moderateScale(1),
    backgroundColor: '#2FC8B3',
  },
  buttonWrapper: {
    width: (width / 100) * 90,
    height: moderateScale(55),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderRadius: moderateScale(12),
    marginTop: moderateScale(10),
    borderColor: '#2FC8B3',
    elevation: moderateScale(3),
  },
  POST: {
    alignSelf: 'flex-end',
    marginRight: (width / 100) * 5,
    backgroundColor: '#2FC8B3',
    height: moderateScale(50),
    textAlign: 'center',
    textAlignVertical: 'center',
    width: moderateScale(100),
    borderTopRightRadius: moderateScale(20),
    borderBottomLeftRadius: moderateScale(20),
    color: 'white',
    fontSize: moderateScale(16),
    fontFamily: Theme.fontFamily.Poppins_SemiBold,
    marginTop: moderateScale(10),
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  searchImage: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(25),
    borderWidth: moderateScale(1),
    borderColor: '#2FC8B3',
  },
  searchTag: {
    fontSize: moderateScale(16),
    fontFamily: Theme.fontFamily.Poppins_Regular,
    color: 'black',
    marginLeft: moderateScale(10),
  },
  searchContainerWrapper: {
    backgroundColor: 'white',
    width: (width / 100) * 90,
    borderRadius: moderateScale(20),
    borderWidth: moderateScale(1),
    borderColor: 'black',
    elevation: moderateScale(10),
    alignSelf: 'center',
    marginTop: moderateScale(30),
    paddingVertical: moderateScale(20),
    height: '85%',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: moderateScale(10),
    height: moderateScale(50),
    backgroundColor: '#EDEDED',
    borderRadius: moderateScale(10),
    width: '90%',
    alignSelf: 'center',
  },
  searchINputField: {
    fontSize: moderateScale(12),
    color: '#2B2B2B',
    fontFamily: Theme.fontFamily.Poppins_Regular,
    width: '86%',
  },
  searchBackButton: {
    color: 'white',
    alignSelf: 'flex-end',
    height: moderateScale(50),
    backgroundColor: '#2FC8B3',
    borderRadius: moderateScale(10),
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingHorizontal: moderateScale(30),
    marginRight: '5%',
    marginTop: 'auto',
  },
  noPost: {
    marginTop: moderateScale(120),
    fontFamily: Theme.fontFamily.Poppins_Regular,
    fontSize: moderateScale(16),
    color: '#2EC8B2',
    textAlign: 'center',
  },
  cardTOpWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  delete: {
    backgroundColor: 'white',
    elevation: moderateScale(10),
    fontFamily: Theme.fontFamily.Poppins_Regular,
    fontSize: moderateScale(14),
    height: moderateScale(30),
    paddingHorizontal: moderateScale(15),
    borderRadius: moderateScale(5),
    textAlignVertical: 'center',
    textAlign: 'center',
    borderWidth: 0.5,
    borderColor: 'grey',
  },
});

export default HomeScreen;
