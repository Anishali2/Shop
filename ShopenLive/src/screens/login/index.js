import React, {useState} from 'react';
import {
  View,
  ScrollView,
  TextInput,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Theme from '../../Theme/Theme';
import Entypo from 'react-native-vector-icons/Entypo';
import Zocial from 'react-native-vector-icons/Zocial';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import {moderateScale} from '../../Theme/Dimensions';
import {CustomActivity} from '../../assets/Components/CustomActivity';
import ShowSnackBar from '../../assets/Components/ShowSnackBar';
import {userLogin} from '../../redux/actions/auth';

const {width, height} = Dimensions.get('window');

const Login = ({navigation, route}) => {
  const {role} = route.params;
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(true);
  const [showActivityIndicator, setShowActivityInidcator] = useState(false);

  const emailFormat =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const handleLogin = () => {
    if (email.length === 0 || password.length === 0) {
      ShowSnackBar('Please fill all fields...', 'red');
    } else {
      if (email.match(emailFormat)) {
        var formdata = new FormData();
        formdata.append('__api_key__', 'secret key');
        formdata.append('email', email);
        formdata.append('password', password);
        setShowActivityInidcator(true);
        dispatch(userLogin(formdata, onSuccess, onError, role));
      } else {
        ShowSnackBar('Email is not valid...', 'red');
      }
    }
  };

  const onSuccess = res => {
    setShowActivityInidcator(false);
    ShowSnackBar('Login Success...', 'green');
    navigation.replace('BottomTab');
  };

  const onError = err => {
    setShowActivityInidcator(false);
    ShowSnackBar('Invalid Credentials...', 'red');
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <ScrollView style={styles.mainContainer}>
        <Text style={styles.topTag}>
          {role === 1 ? 'Buyer' : 'Seller'} Login
        </Text>
        <Image
          source={require('../../assets/images/logo.png')}
          resizeMode="contain"
          style={styles.logo}
        />
        <Text style={styles.inputHeading}>Email</Text>
        <View style={styles.inputFieldContainer}>
          <Zocial name="email" size={moderateScale(28)} color="#2FC8B3" />
          <TextInput
            value={email}
            onChangeText={setEmail}
            keyboardType={'email-address'}
            style={styles.inputField}
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
            keyboardType="default"
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
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
        <Text onPress={() => handleLogin()} style={styles.login}>
          Login
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
          <Text style={styles.bottomButtonTag}>Login with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.bottomButtonContainer, {backgroundColor: '#3B5999'}]}>
          <Entypo
            name="facebook-with-circle"
            color="white"
            size={moderateScale(26)}
          />
          <Text style={styles.bottomButtonTag}>Login with Facebook</Text>
        </TouchableOpacity>
        <Text style={styles.bottomTag}>
          Don't have an account?{' '}
          <Text
            onPress={() => navigation.replace('Signup', {role: role})}
            style={styles.bottomSecTag}>
            SIGN UP
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
  topTag: {
    color: '#2EC8B2',
    fontSize: moderateScale(25),
    textAlign: 'center',
    marginTop: moderateScale((height / 100) * 8),
    fontFamily: Theme.fontFamily.Poppins_Medium,
  },
  logo: {
    width: (width / 100) * 34.1,
    height: (height / 100) * 13.7,
    alignSelf: 'center',
    marginTop: moderateScale(10),
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
  forgotPassword: {
    fontSize: moderateScale(10),
    color: '#2EC8B2',
    fontFamily: Theme.fontFamily.Poppins_Medium,
    marginTop: moderateScale(5),
    textAlign: 'right',
    marginRight: (width / 100) * 5,
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

export default Login;
