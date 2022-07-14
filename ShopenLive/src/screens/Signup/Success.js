import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  BackHandler,
  ScrollView,
} from 'react-native';
import Theme from '../../Theme/Theme';
import {moderateScale} from '../../Theme/Dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {sendOTP, verifyOTP} from '../../redux/actions/auth';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {CustomActivity} from '../../assets/Components/CustomActivity';
import ShowSnackBar from '../../assets/Components/ShowSnackBar';

const {width, height} = Dimensions.get('window');

const Success = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {role, email} = route.params;
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  const handleSendOtp = () => {
    var formdata = new FormData();
    formdata.append('__api_key__', 'secret key');
    formdata.append('email', email);
    setShowActivityIndicator(true);
    dispatch(sendOTP(formdata, onSuccessEmailSent, onErrorEmailSent));
  };

  const onErrorEmailSent = () => {
    setShowActivityIndicator(false);
    ShowSnackBar('There was something wrong...', 'red');
  };

  const onSuccessEmailSent = () => {
    setShowActivityIndicator(false);
    ShowSnackBar('Email has been sent for verification...', 'green');
  };

  const handleConfirmOtp = code => {
    var formdata = new FormData();
    formdata.append('__api_key__', 'secret key');
    formdata.append('otp', code);
    setShowActivityIndicator(true);
    dispatch(verifyOTP(formdata, onSuccessVerify, onErrorVerify));
  };

  const onSuccessVerify = res => {
    setShowActivityIndicator(false);
    ShowSnackBar('Account has been verified successfully...', 'green');
    navigation.replace('Login', {role: role});
  };

  const onErrorVerify = err => {
    setShowActivityIndicator(false);
    ShowSnackBar('Invalid code entered...', 'red');
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        <View style={styles.topBar}>
          <AntDesign
            // onPress={() => navigation.replace('Login', {role: role})}
            name="arrowleft"
            size={moderateScale(35)}
            color="transparent"
          />
          <Text style={styles.topTag}></Text>
          <AntDesign
            name="arrowleft"
            size={moderateScale(35)}
            color="transparent"
          />
        </View>
        <View>
          <Text style={styles.topText}>Check your Email</Text>
          <Text style={styles.middleText}>We’ve sent an OTP to</Text>
          <Text style={styles.secText}>{email}</Text>
          <Text style={styles.click}>{'\n'}Enter OTP Here</Text>

          <OTPInputView
            style={{
              width: '80%',
              height: moderateScale(60),
              alignSelf: 'center',
              marginVertical: moderateScale(20),
            }}
            pinCount={6}
            // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
            // onCodeChanged = {code => { this.setState({code})}}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={code => {
              handleConfirmOtp(code);
            }}
          />
        </View>
      </ScrollView>
      <Text style={styles.bottomTag}>
        Didn't recieve an email?{' '}
        <Text onPress={() => handleSendOtp()} style={styles.bottomSecTag}>
          RESEND EMAIL
        </Text>
      </Text>
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
    color: '#979797',
    fontSize: moderateScale(25),
    textAlign: 'center',
    fontFamily: Theme.fontFamily.Poppins_Medium,
  },
  topText: {
    color: '#2EC8B2',
    fontSize: moderateScale(25),
    fontFamily: Theme.fontFamily.Poppins_Bold,
    textAlign: 'center',
  },
  middleText: {
    fontSize: moderateScale(15),
    fontFamily: Theme.fontFamily.Poppins_Regular,
    color: 'black',
    textAlign: 'center',
    marginTop: moderateScale(30),
  },
  secText: {
    fontSize: moderateScale(15),
    fontFamily: Theme.fontFamily.Poppins_Bold,
    color: 'black',
    textAlign: 'center',
  },
  click: {
    color: 'black',
    fontSize: moderateScale(15),
    fontFamily: Theme.fontFamily.Poppins_Regular,
    textAlign: 'center',
    width: (width / 100) * 80,
    alignSelf: 'center',
  },
  bottomTag: {
    textAlign: 'center',
    color: '#979797',
    fontSize: moderateScale(15),
    fontFamily: Theme.fontFamily.Poppins_Regular,
    marginBottom: moderateScale(10),
  },
  bottomSecTag: {
    color: '#2FC8B3',
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#2EC8B2',
  },

  underlineStyleBase: {
    width: moderateScale(30),
    height: moderateScale(50),
    borderWidth: 0.5,
    borderBottomWidth: 1,
    color: 'black',
  },

  underlineStyleHighLighted: {
    borderColor: '#2EC8B2',
    color: 'black',
  },
});

export default Success;
