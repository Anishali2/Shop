import React, {useState, useRef} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import Theme from '../../Theme/Theme';
import {moderateScale} from '../../Theme/Dimensions';
import Entypo from 'react-native-vector-icons/Entypo';
import Zocial from 'react-native-vector-icons/Zocial';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RBSheet from 'react-native-raw-bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';
import {Header} from '../../assets/Components/Header';
import {useDispatch, useSelector} from 'react-redux';
import ShowSnackBar from '../../assets/Components/ShowSnackBar';
import {updateProfile, userLogin} from '../../redux/actions/auth';
import {CustomActivity} from '../../assets/Components/CustomActivity';

const {width, height} = Dimensions.get('window');

const EditProfile = ({navigation, route}) => {
  const {
    image,
    first,
    last,
    email,
    country,
    phone,
    address,
    uid,
    type,
    password,
  } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [newFirstName, setNewFirstName] = useState(first);
  const [newLastName, setNewLastName] = useState(last);
  const [newCountry, setNewCountry] = useState(country);
  const [newPhone, setNewPhone] = useState(phone);
  const [newAddress, setNewAddress] = useState(address);
  const [newImage, setNewImage] = useState({
    name: '',
  });
  const bottomSheet = useRef();
  const [showActivityIndicator, setShowActivityInidcator] = useState(false);

  const handleCamera = async () => {
    try {
      var granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'ShopenLive App Camera Permission',
          message:
            'ShopenLive App needs access to your camera ' +
            'for your profile picture.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        ImagePicker.openCamera({
          width: 500,
          height: 500,
          cropping: true,
          mediaType: 'photo',
        }).then(image => {
          console.log(image);
          var filename = image.path.replace(/^.*[\\\/]/, '');
          const data = {type: image.mime, uri: image.path, name: filename};
          setNewImage(data);
        });
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleGallery = async () => {
    try {
      var granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'ShopenLive App Gallery Permission',
          message:
            'ShopenLive App needs access to your Gallery ' +
            'for your profile picture.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        ImagePicker.openPicker({
          width: 500,
          height: 500,
          cropping: true,
          mediaType: 'photo',
        }).then(image => {
          console.log(image);
          var filename = image.path.replace(/^.*[\\\/]/, '');
          const data = {type: image.mime, uri: image.path, name: filename};
          setNewImage(data);
        });
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleValidate = () => {
    if (
      newCountry.length === 0 ||
      newPhone.length === 0 ||
      newAddress.length === 0 ||
      newLastName.length === 0 ||
      newFirstName.length === 0
    ) {
      ShowSnackBar('Please fill all Fields...', 'red');
    } else {
      setShowActivityInidcator(true);
      var formdata = new FormData();
      formdata.append('__api_key__', 'secret key');
      if (type === 1) {
        formdata.append('buyer_uid', uid);
      } else {
        formdata.append('seller_uid', uid);
      }
      formdata.append('first_name', newFirstName);
      formdata.append('last_name', newLastName);
      formdata.append('phone', newPhone);
      formdata.append('country', newCountry);
      formdata.append('address', newAddress);
      if (newImage.name.length === 0) {
        var filename = image.replace(/^.*[\\\/]/, '');
        var temp = image.split('.');
        formdata.append('profile_picture', {
          name: filename,
          type: `image/${image.split('.')[temp.length - 1]}`,
          uri: image,
        });
      } else {
        formdata.append('profile_picture', {
          uri: newImage.uri,
          name: newImage.name,
          type: newImage.type,
        });
      }
      dispatch(updateProfile(formdata, onSuccessUpdate, onErrorUpdate, type));
    }
  };

  const onSuccessUpdate = res => {
    let role = type;
    var formdata = new FormData();
    formdata.append('__api_key__', 'secret key');
    formdata.append('email', email);
    formdata.append('password', password);
    dispatch(userLogin(formdata, onSuccess, onError, role));
  };

  const onSuccess = res => {
    setShowActivityInidcator(false);
    ShowSnackBar('Profile data has been updated...', 'green');
    navigation.goBack();
  };

  const onError = err => {
    setShowActivityInidcator(false);
    ShowSnackBar('There was some error...', 'red');
  };

  const onErrorUpdate = err => {
    setShowActivityInidcator(false);
    ShowSnackBar('Phone number already exists...', 'red');
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.mainContainer}
        contentContainerStyle={{
          paddingTop: moderateScale(40),
        }}>
        <Header
          LeftIcon={() => (
            <AntDesign
              onPress={() => navigation.goBack()}
              name="arrowleft"
              size={moderateScale(35)}
              color="#2EC8B2"
            />
          )}
          RightIcon={() => (
            <AntDesign
              name="arrowleft"
              size={moderateScale(35)}
              color="transparent"
            />
          )}
          Tag={'Edit Profile'}
        />
        <View style={styles.profile}>
          <Image
            source={newImage.name === '' ? {uri: image} : {uri: newImage.uri}}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 100,
            }}
            resizeMode="contain"
          />
          <MaterialCommunityIcons
            onPress={() => bottomSheet.current.open()}
            name="pencil-circle-outline"
            color={'#2FC8B3'}
            size={moderateScale(40)}
            style={{
              position: 'absolute',
              bottom: moderateScale(-5),
              right: moderateScale(-5),
              backgroundColor: 'white',
              borderRadius: 100,
            }}
          />
        </View>
        <View style={styles.nameFieldWrapper}>
          <View style={{width: '49%'}}>
            <Text style={[styles.inputHeading, {marginLeft: 0}]}>
              First Name
            </Text>
            <View style={[styles.inputFieldContainer, {width: '100%'}]}>
              <Ionicons
                name="person"
                size={moderateScale(28)}
                color="#2FC8B3"
              />
              <TextInput
                value={newFirstName}
                onChangeText={setNewFirstName}
                style={[styles.inputField, {width: '90%'}]}
              />
            </View>
          </View>
          <View style={{width: '49%'}}>
            <Text style={[styles.inputHeading, {marginLeft: 0}]}>
              Last Name
            </Text>
            <View style={[styles.inputFieldContainer, {width: '100%'}]}>
              <Ionicons
                name="person"
                size={moderateScale(28)}
                color="#2FC8B3"
              />
              <TextInput
                value={newLastName}
                onChangeText={setNewLastName}
                style={[styles.inputField, {width: '90%'}]}
              />
            </View>
          </View>
        </View>
        <Text style={styles.inputHeading}>Email</Text>
        <View style={styles.inputFieldContainer}>
          <Zocial name="email" size={moderateScale(28)} color="#2FC8B3" />
          <TextInput
            editable={false}
            value={email}
            style={[styles.inputField, {color: '#979797'}]}
          />
        </View>

        <Text style={styles.inputHeading}>Country</Text>
        <View style={styles.inputFieldContainer}>
          <Fontisto name="world-o" size={moderateScale(28)} color="#2FC8B3" />
          <TextInput
            value={newCountry}
            onChangeText={setNewCountry}
            style={styles.inputField}
          />
        </View>
        <Text style={styles.inputHeading}>Address</Text>
        <View style={styles.inputFieldContainer}>
          <Entypo
            name="location-pin"
            size={moderateScale(28)}
            color="#2FC8B3"
          />
          <TextInput
            value={newAddress}
            onChangeText={setNewAddress}
            style={styles.inputField}
          />
        </View>
        <Text style={styles.inputHeading}>Phone</Text>
        <View style={styles.inputFieldContainer}>
          <FontAwesome
            name="phone-square"
            size={moderateScale(28)}
            color="#2FC8B3"
          />
          <TextInput
            keyboardType="number-pad"
            value={newPhone}
            onChangeText={setNewPhone}
            style={styles.inputField}
          />
        </View>
        <Text onPress={() => handleValidate()} style={styles.bottomArrowButton}>
          Validate
        </Text>
        <RBSheet
          ref={bottomSheet}
          height={moderateScale(200)}
          customStyles={{
            container: {
              justifyContent: 'center',
              alignItems: 'center',
              borderTopLeftRadius: moderateScale(15),
              borderTopRightRadius: moderateScale(15),
            },
          }}>
          <View style={styles.bottomSheetButtonWrapper}>
            <Text
              onPress={() => {
                bottomSheet.current.close();
                handleCamera();
              }}
              style={[styles.bottomSheetButtonTag, {borderBottomWidth: 0.3}]}>
              Open Camera
            </Text>
            <Text
              onPress={() => {
                bottomSheet.current.close();
                handleGallery();
              }}
              style={[styles.bottomSheetButtonTag, {borderTopWidth: 0.3}]}>
              Open Gallery
            </Text>
          </View>
        </RBSheet>
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
  profile: {
    width: (width / 100) * 40,
    height: (width / 100) * 40,
    borderRadius: 100,
    alignSelf: 'center',
    marginVertical: moderateScale(30),
    borderWidth: moderateScale(5),
    borderColor: '#2FC8B3',
  },
  inputHeading: {
    fontSize: moderateScale(15),
    color: '#979797',
    marginLeft: (width / 100) * 5,
    fontFamily: Theme.fontFamily.Poppins_Medium,
    marginTop: moderateScale(20),
  },
  nameFieldWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: (width / 100) * 90,
    alignSelf: 'center',
  },
  inputFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: (width / 100) * 90,
    height: moderateScale(60),
    borderRadius: moderateScale(12),
    overflow: 'hidden',
    elevation: moderateScale(2),
    borderWidth: 0.5,
    borderColor: '#2FC8B3',
    backgroundColor: 'white',
    alignSelf: 'center',
    paddingHorizontal: moderateScale(15),
  },
  inputField: {
    width: (width / 100) * 90 - moderateScale(60),
    height: '100%',
    paddingLeft: moderateScale(20),
    color: 'black',
    fontFamily: Theme.fontFamily.Poppins_Regular,
    fontSize: moderateScale(15),
  },
  bottomArrowButton: {
    width: (width / 100) * 90,
    height: moderateScale(60),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2FC8B3',
    borderRadius: 100,
    alignSelf: 'center',
    marginVertical: moderateScale(50),
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    fontFamily: Theme.fontFamily.Poppins_Medium,
    fontSize: moderateScale(22),
    elevation: moderateScale(10),
  },
  bottomSheetButtonWrapper: {
    height: moderateScale(120),
    width: (width / 100) * 90,
    backgroundColor: 'white',
    borderRadius: moderateScale(15),
    borderWidth: 0.6,
    borderColor: '#2FC8B3',
  },
  bottomSheetButtonTag: {
    height: '50%',
    width: '100%',
    textAlignVertical: 'center',
    paddingLeft: moderateScale(30),
    borderColor: '#2FC8B3',
    fontSize: moderateScale(16),
    fontFamily: Theme.fontFamily.Poppins_SemiBold,
    color: '#2FC8B3',
  },
});

export default EditProfile;
