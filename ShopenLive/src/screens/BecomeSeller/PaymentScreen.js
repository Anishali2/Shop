import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {Header} from '../../assets/Components/Header';
import Theme from '../../Theme/Theme';
import {moderateScale} from '../../Theme/Dimensions';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');

const CustomInput = ({tag, value, onChangeText, maxLength, keyboardType}) => {
  return (
    <View style={styles.CustomInputWrapper}>
      <Text style={styles.cusotmInputTag}>{tag}</Text>
      <TextInput
        style={styles.customInputField}
        value={value}
        onChangeText={onChangeText}
        maxLength={maxLength}
        keyboardType={keyboardType}
      />
      {tag !== "CARD HOLDER'S NAME"
        ? value.length === maxLength && (
            <AntDesign
              name="checkcircle"
              color="#2FC8B3"
              size={moderateScale(22)}
              style={{
                position: 'absolute',
                right: moderateScale(-10),
                backgroundColor: 'white',
              }}
            />
          )
        : value.length !== 0 && (
            <AntDesign
              name="checkcircle"
              color="#2FC8B3"
              size={moderateScale(22)}
              style={{
                position: 'absolute',
                right: moderateScale(-10),
                backgroundColor: 'white',
              }}
            />
          )}
    </View>
  );
};

const PaymentScreen = ({navigation}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [exipryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  return (
    <View style={styles.mainContainer}>
      <Header
        LeftIcon={() => (
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back"
            color="#2EC8B2"
            size={moderateScale(28)}
          />
        )}
        RightIcon={() => (
          <Ionicons
            name="arrow-back"
            color="transparent"
            size={moderateScale(28)}
          />
        )}
        Tag="Confirm Payment"
      />
      <ScrollView
        contentContainerStyle={{
          paddingTop: moderateScale(70),
          paddingBottom: moderateScale(110),
        }}>
        <LinearGradient
          style={{
            width: (width / 100) * 90,
            height: moderateScale(220),
            borderRadius: moderateScale(10),
            alignSelf: 'center',
          }}
          colors={['#2CC3AF', '#129987']}
          start={{x: 0, y: 0}}
          end={{
            x: 1,
            y: 0,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: moderateScale(15),
              paddingHorizontal: moderateScale(15),
            }}>
            <TextInput
              placeholder="Holder's Name"
              placeholderTextColor={'white'}
              editable={false}
              value={cardHolderName}
              style={{
                color: 'white',
                fontFamily: Theme.fontFamily.Poppins_Regular,
                fontSize: moderateScale(18),
                width: (width / 100) * 90 - moderateScale(80),
              }}
            />
            <Image
              source={require('../../assets/images/Card.png')}
              style={{
                resizeMode: 'contain',
                width: moderateScale(45),
                height: moderateScale(25),
              }}
            />
          </View>
          <TextInput
            value={cardNumber}
            placeholder={'●●●● ●●●● ●●●● ●●●●'}
            placeholderTextColor="white"
            editable={false}
            style={{
              paddingLeft: moderateScale(15),
              marginTop: moderateScale(15),
              color: 'white',
              fontFamily: Theme.fontFamily.Poppins_Regular,
              fontSize: moderateScale(18),
            }}
          />
          <View
            style={{
              marginTop: 'auto',
              marginBottom: moderateScale(15),
              marginLeft: moderateScale(15),
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: moderateScale(12),
                fontFamily: Theme.fontFamily.Poppins_Medium,
                bottom: moderateScale(-25),
              }}>
              VALID THRU
            </Text>
            <TextInput
              editable={false}
              value={exipryDate}
              placeholder="MM/YY"
              placeholderTextColor={'white'}
              style={{
                fontFamily: Theme.fontFamily.Poppins_Regular,
                color: 'white',
                fontSize: moderateScale(15),
                bottom: moderateScale(-10),
              }}
            />
          </View>
        </LinearGradient>
        <View style={styles.inputFieldWrapper}>
          <CustomInput
            tag="CARD NUMBER"
            keyboardType={'number-pad'}
            value={cardNumber}
            onChangeText={setCardNumber}
            maxLength={16}
          />
        </View>
        <View style={styles.inputFieldWrapper}>
          <View
            style={{
              width: '60%',
            }}>
            <CustomInput
              tag="EXPIRATION DATE"
              keyboardType={'number-pad'}
              value={exipryDate}
              onChangeText={text => {
                setExpiryDate(
                  text.length === 3 && !text.includes('/')
                    ? `${text.substring(0, 2)}/${text.substring(2)}`
                    : text,
                );
              }}
              maxLength={5}
            />
          </View>
          <View
            style={{
              width: '35%',
            }}>
            <CustomInput
              tag="CVV"
              value={cvv}
              onChangeText={setCvv}
              keyboardType={'number-pad'}
              maxLength={4}
            />
          </View>
        </View>
        <View style={styles.inputFieldWrapper}>
          <CustomInput
            tag="CARD HOLDER'S NAME"
            keyboardType={'default'}
            value={cardHolderName}
            onChangeText={setCardHolderName}
            maxLength={16}
          />
        </View>
        <View style={styles.inputFieldWrapper}>
          <Text style={styles.total}>TOTAL</Text>
          <Text style={styles.total}>$29.9</Text>
        </View>
        <Text style={styles.bottomButton}>Confirm Payment</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputFieldWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: (width / 100) * 90,
    alignSelf: 'center',
  },
  CustomInputWrapper: {
    width: '100%',
    height: moderateScale(50),
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(1),
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: moderateScale(20),
  },
  cusotmInputTag: {
    position: 'absolute',
    top: 0,
    fontFamily: Theme.fontFamily.Poppins_Regular,
    color: '#979797',
    fontSize: moderateScale(15),
    backgroundColor: 'white',
    left: moderateScale(10),
    top: moderateScale(-12),
    paddingHorizontal: moderateScale(5),
  },
  customInputField: {
    height: '100%',
    textAlign: 'left',
    textAlignVertical: 'center',
    paddingHorizontal: moderateScale(20),
    color: 'black',
    fontFamily: Theme.fontFamily.Poppins_Medium,
  },
  total: {
    color: 'black',
    fontFamily: Theme.fontFamily.Poppins_Medium,
    fontSize: moderateScale(18),
    marginTop: moderateScale(20),
  },
  bottomButton: {
    width: (width / 100) * 90,
    height: moderateScale(60),
    borderRadius: moderateScale(10),
    backgroundColor: '#2FC8B3',
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: moderateScale(18),
    fontFamily: Theme.fontFamily.Poppins_SemiBold,
    alignSelf: 'center',
    marginTop: moderateScale(30),
    elevation: moderateScale(5),
  },
});

export default PaymentScreen;
