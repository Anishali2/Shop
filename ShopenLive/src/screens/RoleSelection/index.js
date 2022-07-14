import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Theme from '../../Theme/Theme';
import {moderateScale} from '../../Theme/Dimensions';

const {width, height} = Dimensions.get('window');

const RoleScreen = ({navigation}) => {
  const [show, setShow] = useState(0);

  const RowButton = () => {
    return (
      <>
        <View style={styles.rowButtonWrapper}>
          <Text
            onPress={() => handleNavigation(1)}
            style={[styles.rowButtonTag, {borderRightWidth: 0.35}]}>
            Login
          </Text>
          <Text
            onPress={() => handleNavigation(2)}
            style={[styles.rowButtonTag, {borderLeftWidth: 0.3}]}>
            Register
          </Text>
        </View>
        <ImageBackground
          resizeMode="contain"
          style={styles.caret}
          source={require('../../assets/images/rolefront.png')}>
          <Image
            source={require('../../assets/images/roleBack.png')}
            style={styles.caretin}
          />
        </ImageBackground>
      </>
    );
  };

  const handleNavigation = r => {
    if (r === 1) {
      if (show === 3) {
        navigation.navigate('Login', {
          role: 1,
        });
      } else if (show === 4) {
        navigation.navigate('Login', {
          role: 2,
        });
      }
    } else if (r === 2) {
      if (show === 3) {
        navigation.navigate('Signup', {
          role: 1,
        });
      } else if (show === 4) {
        navigation.navigate('Signup', {
          role: 2,
        });
      }
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Image
        source={require('../../assets/images/cart.png')}
        style={styles.image}
      />
      <Text style={styles.topTag}>Select Your Role</Text>
      {show !== 0 && (
        <TouchableOpacity
          activeOpacity={0}
          onPress={() => setShow(0)}
          style={{
            position: 'absolute',
            backgroundColor: '#000000',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: 3,
            opacity: 0.5,
          }}
        />
      )}
      <View
        style={[
          styles.buttonWrapper,
          {zIndex: show === 4 ? 0 : show, marginBottom: moderateScale(50)},
        ]}>
        {show === 3 && <RowButton />}
        <Text
          onPress={() => setShow(show === 3 ? 0 : 3)}
          style={[styles.buttonContainer, {}]}>
          Buyer
        </Text>
      </View>
      <View
        style={[
          styles.buttonWrapper,
          {zIndex: show === 3 ? 0 : show, marginBottom: 'auto'},
        ]}>
        {show === 4 && <RowButton />}
        <Text
          onPress={() => setShow(show === 4 ? 0 : 4)}
          style={styles.buttonContainer}>
          Seller
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#2FC8B3',
    alignItems: 'center',
  },
  image: {
    width: (width / 100) * 88.5,
    height: (height / 100) * 37.47,
    resizeMode: 'contain',
    marginTop: 'auto',
  },
  topTag: {
    color: 'white',
    fontFamily: Theme.fontFamily.Poppins_Bold,
    fontSize: moderateScale(30),
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  buttonWrapper: {
    // marginTop: 'auto',
    // marginBottom: 'auto',
    // alignItems: 'center',
    // alignSelf: 'center',
  },
  buttonContainer: {
    width: (width / 100) * 56.3,
    height: moderateScale(60),
    backgroundColor: 'white',
    color: '#2FC8B3',
    fontFamily: Theme.fontFamily.Poppins_SemiBold,
    fontSize: moderateScale(25),
    borderRadius: moderateScale(12),
    textAlign: 'center',
    textAlignVertical: 'center',
    elevation: moderateScale(10),
    alignSelf: 'center',
  },
  rowButtonWrapper: {
    width: (width / 100) * 90,
    height: moderateScale(70),
    borderRadius: moderateScale(12),
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: moderateScale(10),
    alignSelf: 'center',
  },
  rowButtonTag: {
    color: '#2FC8B3',
    fontFamily: Theme.fontFamily.Poppins_SemiBold,
    fontSize: moderateScale(25),
    width: '50%',
    textAlign: 'center',
    textAlignVertical: 'center',
    height: '80%',
    borderColor: '#2FC8B3',
  },
  caret: {
    width: moderateScale(90),
    height: moderateScale(90),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: moderateScale(30),
    zIndex: 1,
    alignSelf: 'center',
  },
  caretin: {
    width: moderateScale(60),
    height: moderateScale(60),
    resizeMode: 'contain',
  },
});

export default RoleScreen;
