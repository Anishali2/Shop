import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet, Dimensions, Text} from 'react-native';
import Theme from '../../Theme/Theme';
import {moderateScale} from '../../Theme/Dimensions';

const {width, height} = Dimensions.get('window');

export const Header = ({LeftIcon, Tag, RightIcon}) => {
  return (
    <LinearGradient
      colors={['white', 'white', 'transparent']}
      locations={[0, 0.7, 1.3]}
      style={styles.header}>
      <LeftIcon />
      <Text style={styles.headerTag}>{Tag}</Text>
      <RightIcon />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: (width / 100) * 5,
    height: moderateScale(70),
    width: width,
    position: 'absolute',
    zIndex: 1,
    paddingBottom: moderateScale(5),
  },
  headerTag: {
    fontSize: moderateScale(24),
    color: '#2EC8B2',
    fontFamily: Theme.fontFamily.Poppins_Medium,
  },
});
