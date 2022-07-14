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
import {useDispatch} from 'react-redux';
import {sendOTP, userRegistration} from '../../redux/actions/auth';
import {CustomActivity} from '../../assets/Components/CustomActivity';
import ShowSnackBar from '../../assets/Components/ShowSnackBar';

const {width, height} = Dimensions.get('window');

const CreateProfile = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {role, nameFirst, signUpEmail, signUpPassword, nameLast} = route.params;
  const [firstName, setFirstName] = useState(nameFirst);
  const [lastName, setLastName] = useState(nameLast);
  const [email, setEmail] = useState(signUpEmail);
  const [password, setPassword] = useState(signUpPassword);
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState({
    name: '',
  });

  const [show, setShow] = useState(true);
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);

  const bottomSheet = useRef();

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
          setImage(data);
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
          setImage(data);
        });
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleSignUp = () => {
    if (
      firstName.length === 0 ||
      lastName.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      country.length === 0 ||
      phone.length === 0
    ) {
      ShowSnackBar('Please fill all fields...', 'red');
    } else {
      if (image.name.length === 0) {
        ShowSnackBar('Please upload user profile pic...', 'red');
      } else {
        var formdata = new FormData();
        formdata.append('__api_key__', 'secret key');
        formdata.append('first_name', firstName);
        formdata.append('last_name', lastName);
        formdata.append('email', email);
        formdata.append('phone', phone);
        formdata.append('country', country);
        formdata.append('address', address);
        formdata.append('password', password);
        formdata.append('profile_picture', {
          uri: image.uri,
          name: image.name,
          type: image.type,
        });
        setShowActivityIndicator(true);
        dispatch(userRegistration(formdata, onSuccess, onError, role));
      }
    }
  };

  const onSuccess = () => {
    var formdata = new FormData();
    formdata.append('__api_key__', 'secret key');
    formdata.append('email', email);
    dispatch(sendOTP(formdata, onSuccessEmailSent, onErrorEmailSent));
  };

  const onErrorEmailSent = () => {
    setShowActivityIndicator(false);
    ShowSnackBar('There was something wrong...', 'red');
  };

  const onSuccessEmailSent = () => {
    setShowActivityIndicator(false);
    ShowSnackBar('Email has been sent for verification...', 'green');
    navigation.replace('Success', {
      role: role,
      email: email,
    });
  };

  const onError = err => {
    setShowActivityIndicator(false);
    ShowSnackBar('Email or phone number already registered....', 'red');
    setEmail('');
    setPhone('');
  };

  return (
    <View style={styles.mainContainer}>
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
        Tag={'Create Your Profile'}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: moderateScale(70),
        }}>
        <View style={styles.profile}>
          <Image
            source={
              image.name === ''
                ? require('../../assets/images/profile.jpeg')
                : {uri: image.uri}
            }
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
                value={firstName}
                style={[styles.inputField, {width: '90%'}]}
                onChangeText={setFirstName}
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
                value={lastName}
                style={[styles.inputField, {width: '90%'}]}
                onChangeText={setLastName}
              />
            </View>
          </View>
        </View>
        <Text style={styles.inputHeading}>Email</Text>
        <View style={styles.inputFieldContainer}>
          <Zocial name="email" size={moderateScale(28)} color="#2FC8B3" />
          <TextInput
            value={email}
            style={styles.inputField}
            onChangeText={setEmail}
          />
        </View>
        <Text style={styles.inputHeading}>Password</Text>
        <View
          style={[
            styles.inputFieldContainer,
            {justifyContent: 'space-between'},
          ]}>
          <Image
            source={require('../../assets/images/password.png')}
            resizeMode="contain"
            style={{
              width: moderateScale(28),
              height: moderateScale(28),
            }}
          />
          <TextInput
            onChangeText={setPassword}
            value={password}
            secureTextEntry={show}
            style={[
              styles.inputField,
              {width: (width / 100) * 90 - moderateScale(100)},
            ]}
          />
          <Entypo
            name={show ? 'eye' : 'eye-with-line'}
            size={moderateScale(28)}
            color={password.length === 0 ? 'transparent' : '#2FC8B3'}
            onPress={() => setShow(!show)}
          />
        </View>
        <Text style={styles.inputHeading}>Country</Text>
        <View style={styles.inputFieldContainer}>
          <Fontisto name="world-o" size={moderateScale(28)} color="#2FC8B3" />
          <TextInput
            style={styles.inputField}
            value={country}
            onChangeText={setCountry}
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
            style={styles.inputField}
            value={address}
            onChangeText={setAddress}
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
            style={styles.inputField}
            value={phone}
            onChangeText={setPhone}
          />
        </View>
        <TouchableOpacity
          onPress={() => handleSignUp()}
          activeOpacity={1}
          style={styles.bottomArrowButton}>
          <AntDesign
            name="arrowright"
            color={'white'}
            size={moderateScale(32)}
          />
        </TouchableOpacity>
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
    width: moderateScale(70),
    height: moderateScale(70),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2FC8B3',
    borderRadius: 100,
    alignSelf: 'center',
    marginVertical: moderateScale(50),
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

export default CreateProfile;
