import React from 'react';
import Snackbar from 'react-native-snackbar';

const ShowSnackBar = (text, bgColor, duration = Snackbar.LENGTH_SHORT) => {
  Snackbar.show({
    text: text,
    backgroundColor: bgColor,
    duration: duration,
  });
};

export default ShowSnackBar;
