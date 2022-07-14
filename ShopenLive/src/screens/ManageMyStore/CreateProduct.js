import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Dimensions,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Header} from '../../assets/Components/Header';
import Theme from '../../Theme/Theme';
import {moderateScale} from '../../Theme/Dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector, useDispatch} from 'react-redux';
import {updateSelectedImages} from '../../redux/actions/auth';
import ImageCropPicker from 'react-native-image-crop-picker';
import ModalDropdown from 'react-native-modal-dropdown';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ShowSnackBar from '../../assets/Components/ShowSnackBar';
import {CustomActivity} from '../../assets/Components/CustomActivity';
import {handleCreateProduct} from '../../redux/actions/home';

const {width, height} = Dimensions.get('window');

const colors = [
  '808080',
  '000000',
  'FF0000',
  '800000',
  'FFFF00',
  'FFFFFF',
  '00FF00',
  '008000',
  '00FFFF',
  '0000FF',
  '000080',
  'FF00FF',
  '800080',
];

const CreateProduct = ({navigation}) => {
  const dispatch = useDispatch();
  const {createPostImages, uid} = useSelector(state => state.auth);
  const [colorOpen, setColorOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState('00FF00');
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [size, setSize] = useState('');
  const [Quantity, setQuantity] = useState(0);
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);
  const [colorSelectedindex, setColorSelectedIndex] = useState('');
  const [sizes, setSizes] = useState([]);
  const [colorArray, setColorArray] = useState([]);

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

  const createPostRenderItem = ({item, index}) => {
    return (
      <View
        key={item.name}
        style={{
          width: (((width / 100) * 90) / 100) * 50,
          height: (((width / 100) * 90) / 100) * 50,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: moderateScale(20),
          marginRight: moderateScale(5),
          borderWidth: moderateScale(3),
          borderColor: '#2FC8B3',
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
      </View>
    );
  };

  const handleValidate = () => {
    if (
      number.length === 0 ||
      name.length === 0 ||
      price.length === 0 ||
      sizes.length === 0 ||
      Quantity.length === 0
    ) {
      ShowSnackBar('Please Fill all Fields', 'red');
    } else {
      if (createPostImages.length === 0) {
        ShowSnackBar('Please upload 1 image of product', 'red');
      } else {
        var formdata = new FormData();
        formdata.append('__api_key__', 'secret key');
        formdata.append('seller_uid', uid);
        formdata.append('number', number);
        formdata.append('name', name);
        formdata.append('price', price);
        formdata.append(
          'size',
          JSON.stringify(
            sizes.map(k => {
              return k.size;
            }),
          ),
        );
        formdata.append(
          'color',
          JSON.stringify(
            colorArray.map(k => {
              return k.color;
            }),
          ),
        );
        formdata.append(
          'quantity',
          JSON.stringify(
            colorArray.map(k => {
              return k.quantity;
            }),
          ),
        );
        formdata.append('image', {
          uri: createPostImages[0].uri,
          name: createPostImages[0].name,
          type: createPostImages[0].type,
        });

        console.log(formdata);
        setShowActivityIndicator(true);
        dispatch(handleCreateProduct(formdata, onSuccess, onError));
      }
    }
  };

  const onSuccess = res => {
    setShowActivityIndicator(false);
    ShowSnackBar('Product has been created successfully', 'green');
    dispatch(updateSelectedImages([]));
    setNumber('');
    setName('');
    setPrice('');
    setSize('');
    setQuantity('');
    navigation.goBack();
  };

  const onError = err => {
    setShowActivityIndicator(false);
    ShowSnackBar('Product with number already exists...', 'red');
    setNumber('');
    console.log(err);
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
            name="arrow-back"
            color="transparent"
            size={moderateScale(28)}
          />
        )}
        Tag={'Add Product'}
      />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: moderateScale(110),
          paddingTop: moderateScale(70),
        }}>
        <View style={styles.fieldWrapper}>
          <Text style={styles.fieldTag}>Number</Text>
          <TextInput
            value={number}
            placeholder="Enter Product number here...."
            placeholderTextColor={'grey'}
            keyboardType="number-pad"
            onChangeText={setNumber}
            style={styles.inputField}
          />
        </View>
        <View style={styles.fieldWrapper}>
          <Text style={styles.fieldTag}>Name</Text>
          <TextInput
            value={name}
            keyboardType="default"
            placeholder="Enter Product name here...."
            placeholderTextColor={'grey'}
            onChangeText={setName}
            style={styles.inputField}
          />
        </View>
        <FlatList
          style={{
            marginBottom: moderateScale(20),
          }}
          data={createPostImages}
          horizontal={true}
          renderItem={createPostRenderItem}
          keyExtractor={(item, index) => (item + index).toString()}
          ListFooterComponent={() => {
            return (
              createPostImages.length === 0 && (
                <TouchableOpacity
                  activeOpacity={1}
                  // disabled={createPostImages.length === 0 ? false : true}
                  onPress={() => handleGallery()}>
                  <View
                    style={{
                      width: (((width / 100) * 90) / 100) * 50,
                      height: (((width / 100) * 90) / 100) * 50,
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
                </TouchableOpacity>
              )
            );
          }}
          contentContainerStyle={{
            paddingLeft: (width / 100) * 5,
          }}
          showsHorizontalScrollIndicator={false}
        />
        <View style={styles.fieldWrapper}>
          <Text style={styles.fieldTag}>Price</Text>
          <TextInput
            value={price}
            onChangeText={setPrice}
            // placeholder="Enter Product Price here...."
            placeholderTextColor={'grey'}
            keyboardType="number-pad"
            style={[
              styles.inputField,
              {
                width: (width / 100) * 45,
              },
            ]}
          />
        </View>
        <View style={styles.fieldWrapper}>
          <Text style={styles.fieldTag}>Size</Text>
          <TextInput
            style={[
              styles.inputField,
              {
                width: (width / 100) * 45,
              },
            ]}
            // placeholder="Enter Product size here...."
            placeholderTextColor={'grey'}
            value={size}
            keyboardType={'default'}
            onChangeText={setSize}
            maxLength={2}
          />

          <AntDesign
            onPress={() => {
              if (size !== '') {
                let tempData = sizes;
                tempData.push({
                  size: size,
                });
                setSizes(tempData);
                setSize('');
              } else {
                ShowSnackBar('Please enter size...', 'red');
              }
            }}
            name="pluscircle"
            color="#2EC8B2"
            size={moderateScale(35)}
            style={{
              backgroundColor: 'white',
              borderRadius: 100,
              marginLeft: moderateScale(10),
            }}
          />
        </View>
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
            paddingRight: moderateScale(5),
          }}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  overflow: 'visible',
                }}>
                <Text style={styles.sizeRenderItem}>{item.size}</Text>
              </View>
            );
          }}
        />
        <View style={styles.fieldWrapper}>
          <Text style={styles.fieldTag}>Color</Text>
          <View
            style={{
              height: moderateScale(50),
              width: moderateScale(150),
              borderColor: '#979797',
              borderWidth: 0.5,
              borderRadius: moderateScale(5),
              overflow: 'hidden',
              borderBottomLeftRadius: colorOpen ? 0 : moderateScale(5),
              borderBottomRightRadius: colorOpen ? 0 : moderateScale(5),
            }}>
            <ModalDropdown
              options={colors}
              onDropdownWillShow={() => {
                setColorOpen(true);
              }}
              renderRow={option => {
                return (
                  <View
                    style={{
                      backgroundColor: 'white',
                      height: moderateScale(50),
                      justifyContent: 'center',
                      paddingLeft: moderateScale(15),
                    }}>
                    <View
                      style={{
                        width: moderateScale(25),
                        height: moderateScale(25),
                        borderRadius: 100,
                        backgroundColor: `#${option}`,
                        elevation: moderateScale(2),
                        borderWidth: 0.5,
                        borderColor: 'grey',
                      }}
                    />
                  </View>
                );
              }}
              onSelect={val => {
                setSelectedColor(colors[val]);
              }}
              onDropdownWillHide={() => {
                setColorOpen(false);
              }}
              dropdownStyle={{
                width: moderateScale(150),
              }}
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  height: '100%',
                  overflow: 'hidden',
                  paddingLeft: moderateScale(15),
                }}>
                <View
                  style={{
                    width: moderateScale(25),
                    height: moderateScale(25),
                    borderRadius: 100,
                    backgroundColor: `#${selectedColor}`,
                    elevation: moderateScale(2),
                    borderWidth: 0.5,
                    borderColor: 'grey',
                  }}
                />
                <FontAwesome5
                  name={colorOpen ? 'chevron-up' : 'chevron-down'}
                  color="#545659"
                  size={moderateScale(18)}
                  style={{
                    height: '100%',
                    width: moderateScale(35),
                    textAlign: 'center',
                    textAlignVertical: 'center',
                  }}
                />
              </View>
            </ModalDropdown>
          </View>
          <AntDesign
            onPress={() => {
              let doPush = true;
              for (let i = 0; i < colorArray.length; i++) {
                if (selectedColor === colorArray[i].color) {
                  doPush = false;
                }
              }
              if (doPush === false) {
                ShowSnackBar('Color Already added....', 'red');
              } else {
                let tempData = colorArray;
                tempData.push({
                  color: selectedColor,
                  quantity: 0,
                });
                setColorSelectedIndex(tempData.length - 1);
                setQuantity(0);
              }
            }}
            name="pluscircle"
            color="#2EC8B2"
            size={moderateScale(35)}
            style={{
              backgroundColor: 'white',
              borderRadius: 100,
              marginLeft: moderateScale(10),
            }}
          />
        </View>
        <FlatList
          horizontal={true}
          data={colorArray}
          showsHorizontalScrollIndicator={false}
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
            paddingRight: moderateScale(5),
          }}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  setColorSelectedIndex(index);
                  setQuantity(item.quantity);
                }}
                style={{
                  overflow: 'visible',
                }}>
                <View
                  style={{
                    width:
                      colorSelectedindex === index
                        ? moderateScale(40)
                        : moderateScale(35),
                    height:
                      colorSelectedindex === index
                        ? moderateScale(40)
                        : moderateScale(35),
                    borderRadius: 100,
                    backgroundColor: `#${item.color}`,
                    elevation:
                      colorSelectedindex === index
                        ? moderateScale(10)
                        : moderateScale(2),
                    borderWidth:
                      colorSelectedindex === index
                        ? moderateScale(3)
                        : moderateScale(1),
                    borderColor: 'white',
                  }}
                />
                <Text
                  style={{
                    position: 'absolute',
                    backgroundColor: 'white',
                    width:
                      colorSelectedindex === index
                        ? moderateScale(25)
                        : moderateScale(20),
                    height:
                      colorSelectedindex === index
                        ? moderateScale(25)
                        : moderateScale(20),
                    borderRadius: 100,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    top: moderateScale(-5),
                    right: moderateScale(-5),
                    color: 'black',
                    fontFamily: Theme.fontFamily.Poppins_Regular,
                    borderWidth: 0.5,
                    borderColor:
                      colorSelectedindex === index ? 'black' : 'grey',
                    fontSize:
                      colorSelectedindex === index
                        ? moderateScale(14)
                        : moderateScale(12),
                  }}>
                  {item.quantity}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
        <View style={styles.fieldWrapper}>
          <Text style={styles.fieldTag}>Quantity</Text>
          <View
            style={{
              height: moderateScale(50),
              width: moderateScale(150),
              borderColor: '#979797',
              borderWidth: 0.5,
              borderRadius: moderateScale(5),
              overflow: 'hidden',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <AntDesign
              onPress={() => {
                if (Quantity !== 0 && colorSelectedindex !== '') {
                  setQuantity(Quantity - 1);
                  let tempData = colorArray.map((k, kindex) => {
                    if (kindex === colorSelectedindex) {
                      return {
                        ...k,
                        quantity: k.quantity - 1,
                      };
                    } else return k;
                  });
                  setColorArray(tempData);
                }
              }}
              name="minus"
              color="black"
              size={moderateScale(25)}
              style={{
                width: moderateScale(50),
                height: moderateScale(50),
                textAlign: 'center',
                textAlignVertical: 'center',
              }}
            />
            <Text
              style={{
                fontSize: moderateScale(18),
                fontFamily: Theme.fontFamily.Poppins_Medium,
                color: colorSelectedindex === '' ? 'grey' : '#2FC8B3',
              }}>
              {Quantity}
            </Text>
            <AntDesign
              onPress={() => {
                if (colorSelectedindex !== '') {
                  setQuantity(Quantity + 1);
                  let tempData = colorArray.map((k, kindex) => {
                    if (kindex === colorSelectedindex) {
                      return {
                        ...k,
                        quantity: k.quantity + 1,
                      };
                    } else return k;
                  });
                  setColorArray(tempData);
                }
              }}
              name="plus"
              color="black"
              size={moderateScale(25)}
              style={{
                width: moderateScale(50),
                height: moderateScale(50),
                textAlign: 'center',
                textAlignVertical: 'center',
              }}
            />
          </View>
        </View>

        <Text onPress={() => handleValidate()} style={styles.bottomButton}>
          Validate
        </Text>
      </ScrollView>
      {showActivityIndicator && <CustomActivity />}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  fieldWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: (width / 100) * 5,
    marginBottom: moderateScale(10),
  },
  inputField: {
    height: moderateScale(50),
    width: (width / 100) * 90 - moderateScale(100),
    borderColor: '#2FC8B3',
    borderWidth: 0.5,
    borderRadius: moderateScale(5),
    color: 'black',
    fontFamily: Theme.fontFamily.Poppins_Regular,
    fontSize: moderateScale(15),
    paddingLeft: moderateScale(10),
  },
  fieldTag: {
    color: '#545659',
    fontSize: moderateScale(15),
    fontFamily: Theme.fontFamily.Poppins_Medium,
    width: moderateScale(100),
  },
  bottomButton: {
    width: (width / 100) * 70,
    height: moderateScale(50),
    borderRadius: moderateScale(20),
    backgroundColor: '#2EC8B2',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    fontFamily: Theme.fontFamily.Poppins_SemiBold,
    fontSize: moderateScale(16),
    alignSelf: 'center',
    marginTop: moderateScale(30),
  },
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
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

export default CreateProduct;
