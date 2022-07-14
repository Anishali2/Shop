import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import Theme from '../../Theme/Theme';
import {moderateScale} from '../../Theme/Dimensions';
import {BallIndicator} from 'react-native-indicators';
import {useSelector} from 'react-redux';

const {width, height} = Dimensions.get('window');

const SplashScreen = ({navigation}) => {
  const {loggedIn} = useSelector(state => state.auth);
  useEffect(() => {
    setTimeout(() => {
      navigation.replace(loggedIn ? 'BottomTab' : 'AuthStack');
    }, 2500);
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Image
        source={require('../../assets/images/splash.png')}
        style={styles.image}
      />
      <Text style={styles.tag}>ShopenLive</Text>
      <BallIndicator color="white" style={styles.indicator} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#2FC8B3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: (width / 100) * 73.5,
    height: (height / 100) * 30.66,
    resizeMode: 'contain',
  },
  tag: {
    color: 'white',
    fontFamily: Theme.fontFamily.Poppins_Bold,
    fontSize: moderateScale(50),
    marginTop: moderateScale(10),
  },
  indicator: {
    position: 'absolute',
    bottom: moderateScale(30),
  },
});

export default SplashScreen;
