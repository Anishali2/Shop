import React, {useRef, useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import Theme from '../../Theme/Theme';
import {moderateScale} from '../../Theme/Dimensions';
import {Header} from '../../assets/Components/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RBSheet from 'react-native-raw-bottom-sheet';
import * as types from '../../redux/actions/types';
import ShowSnackBar from '../../assets/Components/ShowSnackBar';
import {CustomActivity} from '../../assets/Components/CustomActivity';

const {width, height} = Dimensions.get('window');

const ModifyProduct = ({navigation, route}) => {
  const {item} = route.params;
  const bottomSheet = useRef();
  const [number, setNumber] = useState(item.number);
  const [price, setPrice] = useState(item.price);
  const [colors, setColors] = useState(JSON.parse(item.color));
  const [qunatities, setQuantities] = useState(JSON.parse(item.quantity));
  const [sizes, setSizes] = useState(JSON.parse(item.size));
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);

  const data = [1, 2, 3, 4];

  const productImagesRenderItem = ({falana, indexs}) => {
    return (
      <View
        style={{
          width: (((width / 100) * 90) / 100) * 50,
          height: (((width / 100) * 90) / 100) * 50,
          borderRadius: moderateScale(20),
          overflow: 'hidden',
          elevation: moderateScale(10),
          backgroundColor: 'white',
          borderWidth: moderateScale(2),
          borderColor: '#2FC8B3',
        }}>
        <Image
          source={{uri: item.image}}
          resizeMode="cover"
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </View>
    );
  };

  const productsrenderItem = ({item, index}) => {
    return (
      <View
        style={[
          styles.middleBar,
          {
            backgroundColor: 'white',
          },
        ]}>
        <View style={styles.fLTagWrapper}>
          <View
            style={{
              width: moderateScale(25),
              height: moderateScale(25),
              borderRadius: 100,
              backgroundColor: `#${colors[index]}`,
              borderWidth: moderateScale(2),
              borderColor: 'white',
              elevation: moderateScale(2),
            }}
          />
        </View>
        <View style={styles.fLTagWrapper}>
          <TextInput
            style={{
              width: '100%',
              height: '85%',
              borderRadius: moderateScale(5),
              borderWidth: 0.5,
              borderColor: '#2EC8B2',
              backgroundColor: 'white',
              color: 'black',
              fontFamily: Theme.fontFamily.Poppins_Regular,
              fontSize: moderateScale(14),
              textAlign: 'center',
            }}
            value={`${qunatities[index]}`}
            keyboardType={'number-pad'}
            onChangeText={newText => {
              let tempData = qunatities.map((k, kindex) => {
                if (kindex === index) {
                  return newText;
                } else return k;
              });
              setQuantities(tempData);
            }}
          />
        </View>
        <View
          style={[
            styles.fLTagWrapper,
            {
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              width: ((width / 100) * 90) / 2,
            },
          ]}>
          <FontAwesome5 name="edit" color="black" size={moderateScale(19)} />
          <MaterialCommunityIcons
            onPress={() => {
              let tempColors = colors.filter((f, findex) => findex !== index);
              let tempQunatity = qunatities.filter(
                (f, findex) => findex !== index,
              );
              setColors(tempColors);
              setQuantities(tempQunatity);
            }}
            name="delete-outline"
            color="black"
            size={moderateScale(22)}
          />
        </View>
      </View>
    );
  };

  const handleValidate = () => {
    var formdata = new FormData();
    var filename = item.image.replace(/^.*[\\\/]/, '');
    var temp = item.image.split('.');
    formdata.append('__api_key__', 'secret key');
    formdata.append('product_uid', item.uid);
    formdata.append('number', number);
    formdata.append('name', item.name);
    formdata.append('price', price);
    formdata.append('size', JSON.stringify(sizes));
    formdata.append('color', JSON.stringify(colors));
    formdata.append('quantity', JSON.stringify(qunatities));
    formdata.append('image', {
      name: filename,
      type: `image/${item.image.split('.')[temp.length - 1]}`,
      uri: item.image,
    });
    setShowActivityIndicator(true);
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    fetch(`${types.BASEURL}/update_product.php`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.state === 'OK') {
          setShowActivityIndicator(false);
          ShowSnackBar('Product modified successfully...', 'green');
          navigation.goBack();
        } else {
          ShowSnackBar('There was some error...', 'red');
          setShowActivityIndicator(false);
        }
      })
      .catch(error => console.log('error', error));
  };

  return (
    <View style={styles.mainContainer}>
      <Header
        LeftIcon={() => (
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back"
            color="#2EC8B2"
            size={moderateScale(28)}
          />
        )}
        RightIcon={() => (
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back"
            color="transparent"
            size={moderateScale(28)}
          />
        )}
        Tag={'Modify a Product'}
      />
      <ScrollView
        style={{
          flex: 1,
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: moderateScale(70),
          paddingBottom: moderateScale(110),
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: moderateScale(20),
            paddingHorizontal: (width / 100) * 5,
          }}>
          <Text
            style={{
              fontSize: moderateScale(18),
              fontFamily: Theme.fontFamily.Poppins_Medium,
              color: '#595959',
            }}>
            {item.name}
          </Text>
          <AntDesign
            onPress={() => bottomSheet.current.open()}
            name="delete"
            color={'#545659'}
            size={moderateScale(24)}
            style={{
              borderWidth: moderateScale(1),
              width: moderateScale(45),
              height: moderateScale(45),
              borderRadius: moderateScale(5),
              textAlign: 'center',
              textAlignVertical: 'center',
              backgroundColor: 'white',
              elevation: moderateScale(5),
              borderColor: '#545659',
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <FlatList
            data={[1]}
            style={{
              // backgroundColor: 'red',
              width: (width / 100) * 95,
            }}
            renderItem={productImagesRenderItem}
            horizontal={true}
            contentContainerStyle={{
              paddingHorizontal: (width / 100) * 5,
              paddingBottom: moderateScale(15),
            }}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  width: moderateScale(10),
                }}
              />
            )}
          />
          <Entypo
            name="chevron-thin-right"
            color="black"
            size={moderateScale(22)}
          />
        </View>

        <View style={styles.inputFieldWrapper}>
          <Text style={styles.inputFieldTag}>Number</Text>
          <TextInput
            style={styles.inputFiled}
            value={number}
            onChangeText={setNumber}
            keyboardType={'number-pad'}
          />
        </View>
        <View style={styles.inputFieldWrapper}>
          <Text style={styles.inputFieldTag}>Price</Text>
          <TextInput
            style={styles.inputFiled}
            value={price}
            onChangeText={setPrice}
            keyboardType={'number-pad'}
          />
        </View>
        <View style={styles.inputFieldWrapper}>
          <Text style={styles.inputFieldTag}>Sizes</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={sizes}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  width: moderateScale(20),
                }}
              />
            )}
            contentContainerStyle={{
              paddingVertical: moderateScale(5),
              paddingLeft: (width / 100) * 5,
              paddingBottom: moderateScale(20),
              paddingRight: moderateScale(10),
            }}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    overflow: 'visible',
                  }}>
                  <Text style={styles.sizeRenderItem}>{item}</Text>
                  <Text
                    onPress={() => {
                      let tempSizes = sizes.filter(
                        (f, findex) => findex !== index,
                      );
                      setSizes(tempSizes);
                    }}
                    style={{
                      position: 'absolute',
                      backgroundColor: '#2FC8B3',
                      width: moderateScale(20),
                      height: moderateScale(20),
                      textAlign: 'center',
                      textAlignVertical: 'center',
                      borderRadius: 100,
                      top: moderateScale(-5),
                      right: moderateScale(-8),
                      color: 'white',
                      fontSize: moderateScale(12),
                      fontFamily: Theme.fontFamily.Poppins_Bold,
                    }}>
                    ✕
                  </Text>
                </View>
              );
            }}
          />
        </View>

        <View style={styles.middleBar}>
          <Text style={styles.headingTag}>Color</Text>
          <Text style={styles.headingTag}>Qty.</Text>
        </View>
        <FlatList data={colors} renderItem={productsrenderItem} />

        <Text onPress={() => handleValidate()} style={styles.bottomButton}>
          Validate
        </Text>
        <Text style={[styles.bottomButton, styles.bottomSecButton]}>
          Add Product
        </Text>
      </ScrollView>
      <RBSheet
        ref={bottomSheet}
        height={height}
        customStyles={{
          container: {
            backgroundColor: 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}>
        <View style={styles.popUpContainer}>
          <Text style={styles.msg}>
            Do you want to{'\n'}Delete this article?
          </Text>
          <Text
            onPress={() => {
              var formdata = new FormData();
              formdata.append('__api_key__', 'secret key');
              formdata.append('product_uid', item.uid);

              var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow',
              };
              bottomSheet.current.close();
              setShowActivityIndicator(true);
              fetch(`${types.BASEURL}/delete_product.php`, requestOptions)
                .then(response => response.json())
                .then(result => {
                  if (result.state === 'OK') {
                    ShowSnackBar('Product deleted...', 'green');
                    setShowActivityIndicator(false);
                    navigation.goBack();
                  } else {
                    setShowActivityIndicator(false);
                    ShowSnackBar('There was some error...', 'red');
                  }
                })
                .catch(error => console.log('error', error));
            }}
            style={styles.RBButton}>
            Yes
          </Text>
          <Text
            onPress={() => bottomSheet.current.close()}
            style={[styles.RBButton, styles.noButton]}>
            No
          </Text>
        </View>
      </RBSheet>
      {showActivityIndicator && <CustomActivity />}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: (width / 100) * 5,
  },
  inputFieldWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: (width / 100) * 5,
  },
  inputFieldTag: {
    color: 'black',
    fontFamily: Theme.fontFamily.Poppins_Medium,
    fontSize: moderateScale(14),
    marginLeft: moderateScale(5),
    width: moderateScale(80),
    marginVertical: moderateScale(30),
    textAlignVertical: 'center',
  },
  inputFiled: {
    marginLeft: moderateScale(10),
    borderWidth: 0.5,
    height: moderateScale(45),
    color: 'black',
    fontFamily: Theme.fontFamily.Poppins_Regular,
    fontSize: moderateScale(14),
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: moderateScale(5),
    width: moderateScale(80),
    borderColor: '#2FC8B3',
    elevation: moderateScale(2),
    backgroundColor: 'white',
  },
  middleBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: moderateScale(50),
    backgroundColor: '#2FC8B3',
    paddingLeft: (width / 100) * 5,
  },
  headingTag: {
    color: 'white',
    fontSize: moderateScale(18),
    fontFamily: Theme.fontFamily.Poppins_SemiBold,
    width: ((width / 100) * 90) / 4,
    textAlign: 'center',
  },
  fLTagWrapper: {
    width: ((width / 100) * 90) / 4,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomButton: {
    width: (width / 100) * 50,
    height: moderateScale(50),
    borderRadius: moderateScale(10),
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    fontFamily: Theme.fontFamily.Poppins_Medium,
    fontSize: moderateScale(17),
    marginTop: moderateScale(30),
    alignSelf: 'center',
    backgroundColor: '#2FC8B3',
  },
  bottomSecButton: {
    backgroundColor: 'white',
    color: '#2FC8B3',
    borderWidth: 0.5,
    borderColor: '#2FC8B3',
  },
  popUpContainer: {
    width: (width / 100) * 90,
    backgroundColor: 'white',
    borderRadius: moderateScale(20),
    paddingVertical: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#2FC8B3',
    borderWidth: moderateScale(2),
  },
  msg: {
    color: '#191B32',
    fontFamily: Theme.fontFamily.Poppins_Medium,
    fontSize: moderateScale(20),
    textAlign: 'center',
  },
  RBButton: {
    height: moderateScale(50),
    width: '60%',
    backgroundColor: '#2FC8B3',
    color: 'white',
    borderRadius: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: moderateScale(30),
  },
  noButton: {
    borderWidth: moderateScale(1),
    borderColor: '#2FC8B3',
    color: '#2FC8B3',
    backgroundColor: 'white',
  },
  sizeRenderItem: {
    width: moderateScale(50),
    height: moderateScale(50),
    backgroundColor: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: moderateScale(10),
    elevation: moderateScale(2),
    color: 'black',
  },
});

export default ModifyProduct;
