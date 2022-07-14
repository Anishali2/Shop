import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';
import Theme from '../../Theme/Theme';
import {moderateScale} from '../../Theme/Dimensions';
import Entypo from 'react-native-vector-icons/Entypo';
import Zocial from 'react-native-vector-icons/Zocial';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ShowSnackBar from '../../assets/Components/ShowSnackBar';
import {CustomActivity} from '../../assets/Components/CustomActivity';
import {useDispatch} from 'react-redux';
import {userRegistration} from '../../redux/actions/auth';

const {width, height} = Dimensions.get('window');

const Signup = ({navigation, route}) => {
  const {role} = route.params;
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [show, setShow] = useState(true);
  const [showConfirm, setShowConfirm] = useState(true);
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);

  const emailFormat =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const handleSignUp = () => {
    if (
      name.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      confirmPassword.length === 0
    ) {
      ShowSnackBar('Please Fill all Fields....', 'red');
    } else {
      if (email.match(emailFormat)) {
        if (password.length < 6) {
          ShowSnackBar('Password must be at least 6 characters', 'red');
        } else {
          if (password !== confirmPassword) {
            ShowSnackBar('Password did not match', 'red');
            setPassword('');
            setConfirmPassword('');
          } else {
            navigation.replace('CreateProfile', {
              role: role,
              signUpEmail: email,
              signUpPassword: password,
              nameFirst: name.split(' ')[0],
              nameLast: name.split(' ')[1] ? name.split(' ')[1] : '',
            });
          }
        }
      } else {
        ShowSnackBar('Entered email is not valid', 'red');
        setEmail('');
      }
    }
  };

  const onSuccess = res => {
    setShowActivityIndicator(false);
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    navigation.replace('Success', {
      role: role,
      email: email,
    });
  };

  const onError = err => {
    setShowActivityIndicator(false);
    ShowSnackBar('Email already registered....', 'red');
    setEmail('');
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <ScrollView style={styles.mainContainer}>
        <View style={styles.topBar}>
          <AntDesign
            onPress={() => navigation.goBack()}
            name="arrowleft"
            size={moderateScale(35)}
            color="#2EC8B2"
          />
          <Text style={styles.topTag}>Sign Up</Text>
          <AntDesign
            name="arrowleft"
            size={moderateScale(35)}
            color="transparent"
          />
        </View>
        <Text style={styles.inputHeading}>Name</Text>
        <View style={styles.inputFieldContainer}>
          <Ionicons name="person" size={moderateScale(28)} color="#2FC8B3" />
          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.inputField}
            keyboardType="default"
          />
        </View>
        <Text style={styles.inputHeading}>Email</Text>
        <View style={styles.inputFieldContainer}>
          <Zocial name="email" size={moderateScale(28)} color="#2FC8B3" />
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.inputField}
            keyboardType="email-address"
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
            secureTextEntry={show}
            value={password}
            style={[
              styles.inputField,
              {width: (width / 100) * 90 - moderateScale(100)},
            ]}
            keyboardType="default"
          />
          <Entypo
            name={show ? 'eye' : 'eye-with-line'}
            size={moderateScale(28)}
            color={password.length === 0 ? 'transparent' : '#2FC8B3'}
            onPress={() => setShow(!show)}
          />
        </View>
        <Text style={styles.inputHeading}>Confirm Password</Text>
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
            onChangeText={setConfirmPassword}
            secureTextEntry={showConfirm}
            value={confirmPassword}
            style={[
              styles.inputField,
              {width: (width / 100) * 90 - moderateScale(100)},
            ]}
            keyboardType="default"
          />
          <Entypo
            name={showConfirm ? 'eye' : 'eye-with-line'}
            size={moderateScale(28)}
            color="#2FC8B3"
            onPress={() => setShowConfirm(!showConfirm)}
          />
        </View>

        <Text onPress={() => handleSignUp()} style={styles.login}>
          Sign Up
        </Text>
        <Text
          style={[
            styles.topTag,
            {fontSize: moderateScale(20), marginTop: moderateScale(20)},
          ]}>
          Or
        </Text>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.bottomButtonContainer}>
          <AntDesign name="googleplus" color="white" size={moderateScale(26)} />
          <Text style={styles.bottomButtonTag}>Sign Up with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.bottomButtonContainer, {backgroundColor: '#3B5999'}]}>
          <Entypo
            name="facebook-with-circle"
            color="white"
            size={moderateScale(26)}
          />
          <Text style={styles.bottomButtonTag}>Sign Up with Facebook</Text>
        </TouchableOpacity>
        <Text style={styles.bottomTag}>
          Already have an account?{' '}
          <Text
            onPress={() => navigation.replace('Login', {role: role})}
            style={styles.bottomSecTag}>
            Log In
          </Text>
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
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: (width / 100) * 5,
    marginTop: (height / 100) * 7,
    marginBottom: moderateScale(15),
  },
  topTag: {
    color: '#2EC8B2',
    fontSize: moderateScale(25),
    textAlign: 'center',
    fontFamily: Theme.fontFamily.Poppins_Medium,
  },
  inputHeading: {
    fontSize: moderateScale(15),
    color: '#979797',
    marginLeft: (width / 100) * 5,
    fontFamily: Theme.fontFamily.Poppins_Medium,
    marginTop: moderateScale(20),
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
  login: {
    fontSize: moderateScale(20),
    fontFamily: Theme.fontFamily.Poppins_Medium,
    color: 'white',
    width: (width / 100) * 57.9,
    height: moderateScale(55),
    backgroundColor: '#2FC8B3',
    borderRadius: moderateScale(12),
    elevation: moderateScale(10),
    borderWidth: 0.5,
    borderColor: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: moderateScale(30),
    alignSelf: 'center',
  },
  bottomButtonContainer: {
    width: (width / 100) * 67.28,
    height: moderateScale(55),
    borderRadius: moderateScale(12),
    borderWidth: 0.5,
    borderColor: 'white',
    backgroundColor: '#F83C3B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: moderateScale(20),
    elevation: moderateScale(10),
  },
  bottomButtonTag: {
    color: 'white',
    fontSize: moderateScale(15),
    fontFamily: Theme.fontFamily.Poppins_Medium,
    marginLeft: moderateScale(20),
  },
  bottomTag: {
    textAlign: 'center',
    color: '#979797',
    fontSize: moderateScale(12),
    fontFamily: Theme.fontFamily.Poppins_Regular,
    marginTop: moderateScale(25),
    marginBottom: moderateScale(10),
  },
  bottomSecTag: {
    color: '#2FC8B3',
  },
});

export default Signup;
