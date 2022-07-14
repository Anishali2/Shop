import React from 'react';
import Image from 'react-native-scalable-image';

export const ScalableImage = ({source, width, style}) => {
  return <Image source={source} width={width} style={style} />;
};
