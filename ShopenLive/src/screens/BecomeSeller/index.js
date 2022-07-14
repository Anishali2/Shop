import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Alert} from 'react-native';
import Theme from '../../Theme/Theme';
import {moderateScale} from '../../Theme/Dimensions';
import {CustomActivity} from '../../assets/Components/CustomActivity';

const {width, height} = Dimensions.get('window');

const BecomeSeller = ({navigation}) => {
  const [show, setShow] = useState(false);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.card}>
        <Text style={styles.cost}>€ 29.9</Text>
        <Text style={styles.duration}>Per Month</Text>
        <Text
          onPress={() => {
            navigation.replace('PaymentScreen');
          }}
          style={styles.button}>  
          PURCHASE
        </Text>
      </View>
      <Text style={styles.description}>
        10 Trail Days and that you can cancel you subscription during these 10
        days
      </Text>
      {show && <CustomActivity />}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: (width / 100) * 80,
    height: (height / 100) * 50,
    borderRadius: moderateScale(30),
    borderColor: '#2EC8B2',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: moderateScale(5),
    overflow: 'visible',
  },
  cost: {
    fontSize: moderateScale(70),
    fontFamily: Theme.fontFamily.Poppins_Bold,
    color: '#2EC8B2',
    lineHeight: moderateScale(70),
    paddingTop: moderateScale(10),
  },
  duration: {
    fontSize: moderateScale(20),
    fontFamily: Theme.fontFamily.Poppins_SemiBold,
    color: '#2EC8B2',
  },
  description: {
    color: '#2EC8B2',
    fontSize: moderateScale(18),
    fontFamily: Theme.fontFamily.Poppins_SemiBold,
    width: (width / 100) * 80,
    textAlign: 'center',
    marginTop: (height / 100) * 10,
  },
  button: {
    color: 'white',
    fontSize: moderateScale(25),
    fontFamily: Theme.fontFamily.Poppins_SemiBold,
    height: moderateScale(60),
    width: (width / 100) * 65,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: '#2EC8B2',
    borderRadius: moderateScale(12),
    position: 'absolute',
    bottom: moderateScale(-30),
  },
});

export default BecomeSeller;
