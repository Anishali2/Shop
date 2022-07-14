import React, {useState} from 'react';

import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import {moderateScale} from '../../Theme/Dimensions';
import {Header} from '../../assets/Components/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Theme from '../../Theme/Theme';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ModalDropdown from 'react-native-modal-dropdown';
import {useSelector} from 'react-redux';

const {width, height} = Dimensions.get('window');

const fieldStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: (width / 100) * 90,
  borderBottomWidth: moderateScale(1),
  borderColor: '#ACADAF',
  alignSelf: 'center',
  paddingBottom: moderateScale(5),
  height: moderateScale(50),
};

let currency = ['£', '$', '¥', '€', '₹'];
let language = ['English', 'Urdu', 'Arabic', 'Persian', 'Chinese'];

const SettingsScreen = ({navigation}) => {
  const [showCurrency, setShowCurrency] = useState(false);
  const [showLanguage, setShowLanguage] = useState(false);
  const {type} = useSelector(state => state.auth);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingTop: moderateScale(70),
      }}>
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
        Tag={'Settings'}
      />
      {type === 2 && (
        <TouchableOpacity activeOpacity={1} style={fieldStyle}>
          <Text
            style={{
              color: '#545659',
              fontSize: moderateScale(15),
              fontFamily: Theme.fontFamily.Poppins_Regular,
            }}>
            Currency
          </Text>
          <View
            style={{
              height: moderateScale(40),
              width: moderateScale(120),
              borderColor: '#545659',
              borderWidth: 0.5,
              borderRadius: moderateScale(5),
            }}>
            <ModalDropdown
              options={currency}
              onDropdownWillShow={() => {
                setShowCurrency(true);
              }}
              onDropdownWillHide={() => {
                setShowCurrency(false);
              }}
              dropdownStyle={{
                width: moderateScale(120),
              }}
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingLeft: moderateScale(10),
                  height: '100%',
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: Theme.fontFamily.Poppins_Regular,
                    fontSize: moderateScale(16),
                  }}>
                  €
                </Text>
                <FontAwesome5
                  name={showCurrency ? 'chevron-up' : 'chevron-down'}
                  color="#545659"
                  size={moderateScale(18)}
                  style={{
                    height: '100%',
                    width: moderateScale(35),
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    borderLeftWidth: 0.5,
                    borderColor: '#545659',
                  }}
                />
              </View>
            </ModalDropdown>
          </View>
        </TouchableOpacity>
      )}
      {type === 2 && (
        <TouchableOpacity
          activeOpacity={1}
          style={[
            fieldStyle,
            {
              paddingTop: moderateScale(10),
            },
          ]}>
          <Text
            style={{
              color: '#545659',
              fontSize: moderateScale(15),
              fontFamily: Theme.fontFamily.Poppins_Regular,
            }}>
            Subscription
          </Text>
          <FontAwesome5
            name="chevron-right"
            color="#545659"
            size={moderateScale(18)}
          />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        activeOpacity={1}
        style={[
          fieldStyle,
          {
            paddingTop: moderateScale(10),
          },
        ]}>
        <Text
          style={{
            color: '#545659',
            fontSize: moderateScale(15),
            fontFamily: Theme.fontFamily.Poppins_Regular,
          }}>
          Contact
        </Text>
        <FontAwesome5
          name="chevron-right"
          color="#545659"
          size={moderateScale(18)}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        style={[
          fieldStyle,
          {
            borderBottomWidth: 0,
            paddingBottom: 0,
          },
        ]}>
        <Text
          style={{
            color: '#545659',
            fontSize: moderateScale(15),
            fontFamily: Theme.fontFamily.Poppins_Regular,
          }}>
          Language
        </Text>
        <View
          style={{
            height: moderateScale(40),
            width: moderateScale(120),
            borderColor: '#545659',
            borderWidth: 0.5,
            borderRadius: moderateScale(5),
          }}>
          <ModalDropdown
            options={language}
            onDropdownWillShow={() => {
              setShowLanguage(true);
            }}
            onDropdownWillHide={() => {
              setShowLanguage(false);
            }}
            dropdownStyle={{
              width: moderateScale(120),
            }}
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingLeft: moderateScale(10),
                height: '100%',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontFamily: Theme.fontFamily.Poppins_Regular,
                  fontSize: moderateScale(16),
                }}>
                English
              </Text>
              <FontAwesome5
                name={showLanguage ? 'chevron-up' : 'chevron-down'}
                color="#545659"
                size={moderateScale(18)}
                style={{
                  height: '100%',
                  width: moderateScale(35),
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  borderLeftWidth: 0.5,
                  borderColor: '#545659',
                }}
              />
            </View>
          </ModalDropdown>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;
