import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import Theme from '../../Theme/Theme';
import {moderateScale} from '../../Theme/Dimensions';
import Image from 'react-native-scalable-image';

const {width, height} = Dimensions.get('window');

const WelcomeSeller = ({navigation}) => {
  return (
    <ScrollView
      style={styles.mainContainer}
      showsVerticalScrollIndicator={false}>
      <View
        style={{
          minHeight: height,
          justifyContent: 'center',
        }}>
        <View style={styles.imageCard}>
          <Image
            width={(width / 100) * 80}
            height={(height / 100) * 30}
            source={require('../../assets/images/welcomeSeller.png')}
          />
          <View style={styles.inputContainer}>
            <Text style={styles.tag}>Welcome to Shopenlive</Text>
            <TextInput
              placeholder="Introduce yourself and talk more about the products you sell....."
              placeholderTextColor={'#2FC8B3'}
              multiline={true}
              style={styles.inputField}
            />
          </View>
        </View>
        <Text style={styles.next}>Next ➜</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageCard: {
    alignItems: 'center',
  },
  inputContainer: {
    width: (width / 100) * 90,
    backgroundColor: '#2FC8B3',
    borderRadius: moderateScale(12),
    alignItems: 'center',
    paddingTop: moderateScale(15),
    paddingBottom: moderateScale(30),
  },
  tag: {
    color: 'white',
    fontFamily: Theme.fontFamily.Poppins_SemiBold,
    fontSize: moderateScale(22),
  },
  inputField: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: moderateScale(10),
    textAlignVertical: 'top',
    minHeight: moderateScale(100),
    marginTop: moderateScale(20),
    color: 'black',
    fontFamily: Theme.fontFamily.Poppins_Regular,
    fontSize: moderateScale(16),
  },
  next: {
    color: 'black',
    fontSize: moderateScale(18),
    fontFamily: Theme.fontFamily.Poppins_Medium,
    textAlign: 'center',
    marginTop: (height / 100) * 5,
  },
});

export default WelcomeSeller;
