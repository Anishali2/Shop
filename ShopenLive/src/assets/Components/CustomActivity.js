import React from 'react';
import {BallIndicator} from 'react-native-indicators';
import {View, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const CustomActivity = () => {
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
      }}>
      <View
        style={{
          backgroundColor: 'black',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.4,
        }}
      />
      <BallIndicator color="white" />
    </View>
  );
};
