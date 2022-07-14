import React, {useEffect, useState} from 'react';
import {
  Image,
  FlatList,
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Theme from '../../Theme/Theme';
import {moderateScale} from '../../Theme/Dimensions';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {ScalableImage} from './ScalableImage';
import {Header} from '../../assets/Components/Header';
import {useDispatch, useSelector} from 'react-redux';
import {handleCreateTicket} from '../../redux/actions/home';
import {useFocusEffect} from '@react-navigation/native';
import {callapi, stopapi} from '../../redux/actions/auth';
import * as types from '../../redux/actions/types';
import ShowSnackBar from '../../assets/Components/ShowSnackBar';

const {width, height} = Dimensions.get('window');

const ConversationScreen = ({navigation, route}) => {
  const {otheruid, profilePic, profileName} = route.params;
  const dispatch = useDispatch();
  const {uid, call, image} = useSelector(state => state.auth);
  const {conversations} = useSelector(state => state.home);

  const [inputField, setInputField] = useState('');

  const renderItem = ({item}) => {
    return (
      <View
        style={
          item.receiver_uid === uid
            ? styles.flatListLeftCard
            : styles.flatListRightCard
        }>
        <Image
          source={item.receiver_uid === uid ? {uri: profilePic} : {uri: image}}
          style={[
            styles.dp,
            {
              borderWidth: 1,
            },
          ]}
        />
        <View>
          {item.image ? (
            <ScalableImage
              source={item.image}
              width={(width / 100) * 55}
              style={{
                marginLeft: item.side === 1 ? moderateScale(10) : 0,
                marginRight: item.receiver_uid === uid ? 0 : moderateScale(10),
                borderRadius: moderateScale(20),
              }}
            />
          ) : (
            <View
              style={{
                borderTopRightRadius:
                  item.receiver_uid === uid ? moderateScale(8) : 0,
                borderBottomRightRadius:
                  item.receiver_uid === uid
                    ? moderateScale(8)
                    : moderateScale(20),
                borderBottomLeftRadius:
                  item.receiver_uid === uid
                    ? moderateScale(20)
                    : moderateScale(8),
                borderTopLeftRadius:
                  item.receiver_uid === uid ? 0 : moderateScale(8),
                backgroundColor:
                  item.receiver_uid === uid ? 'white' : '#2FC8B3',
                borderWidth: item.receiver_uid === uid ? 1 : 0,
                borderColor: '#979797',
                elevation: moderateScale(10),
                marginLeft: item.receiver_uid === uid ? moderateScale(10) : 0,
                marginRight: item.receiver_uid === uid ? 0 : moderateScale(10),
                paddingHorizontal: moderateScale(20),
                paddingVertical: moderateScale(10),
                justifyContent: 'center',
                maxWidth: (width / 100) * 55,
              }}>
              <Text
                style={{
                  fontFamily: Theme.fontFamily.Poppins_Medium,
                  fontSize: moderateScale(12),
                  color: item.receiver_uid === uid ? '#191B32' : 'white',
                  textAlign: 'left',
                }}>
                {item.message}
              </Text>
            </View>
          )}
          <Text
            style={{
              fontFamily: Theme.fontFamily.Poppins_Medium,
              fontSize: moderateScale(8),
              color: '#191B32',
              textAlign: item.receiver_uid === uid ? 'right' : 'left',

              marginTop: moderateScale(3),
              marginLeft: item.image ? moderateScale(20) : moderateScale(10),
              marginRight: item.image ? moderateScale(20) : moderateScale(10),
            }}>
            {item.time}
          </Text>
        </View>
      </View>
    );
  };

  const handleSendMessage = () => {
    var formdata = new FormData();
    formdata.append('__api_key__', 'secret key');
    formdata.append('sender_uid', uid);
    formdata.append('receiver_uid', otheruid);
    formdata.append('message', inputField);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    fetch(`${types.BASEURL}/send_message.php`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.state === 'OK') {
          setInputField('');
        } else {
          ShowSnackBar('Message could not be sent...', 'red');
        }
      })
      .catch(error => console.log('error', error));
  };

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
        Tag={profileName}
      />

      <FlatList
        data={conversations.filter(f => f.uid === otheruid)[0].conversations}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingBottom: moderateScale(110),
          paddingTop: moderateScale(70),
        }}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.bottomInputWrapper}>
        <View style={styles.innerShadow} />
        <View style={styles.textInputWrapper}>
          <TextInput
            placeholder="Type Here..."
            multiline
            style={styles.inputField}
            onChangeText={setInputField}
            value={inputField}
          />
          <FontAwesome5
            name="smile"
            color="#B6B6B4"
            size={moderateScale(22)}
            style={{
              bottom: moderateScale(3),
            }}
          />
        </View>
        <View style={styles.bottomSendButtonContainer}>
          {/* <Ionicons
            name="images-outline"
            size={moderateScale(28)}
            color="#B6B6B4"
            style={{
              marginRight: moderateScale(15),
              bottom: moderateScale(5),
            }}
          /> */}
          <Text
            onPress={() => {
              if (inputField.length !== 0) {
                handleSendMessage();
              }
            }}
            style={[
              styles.sendTag,
              {
                color: inputField.length !== 0 ? '#2FC8B3' : 'grey',
              },
            ]}>
            SEND
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
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
  bottomInputWrapper: {
    marginTop: 'auto',
    backgroundColor: 'white',
    elevation: moderateScale(20),
    flexDirection: 'row',
    paddingVertical: moderateScale(10),
    borderTopLeftRadius: moderateScale(10),
    borderTopRightRadius: moderateScale(10),
    overflow: 'hidden',
    paddingHorizontal: (width / 100) * 5,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  innerShadow: {
    position: 'absolute',
    elevation: moderateScale(10),
    overflow: 'visible',
    backgroundColor: 'transparent',
    left: 0,
    right: 0,
    height: 1,
    top: -1,
  },
  textInputWrapper: {
    width: (width / 100) * 90 - moderateScale(75),
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    backgroundColor: '#EDEDED',
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(10),
  },
  inputField: {
    width: (width / 100) * 90 - moderateScale(130),
    textAlign: 'left',
    textAlignVertical: 'top',
    padding: 0,
    paddingBottom: 0,
    margin: 0,
    marginBottom: 0,
    fontSize: moderateScale(12),
    color: '#2B2B2B',
    fontFamily: Theme.fontFamily.Poppins_Regular,
    top: moderateScale(2),
  },
  bottomSendButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendTag: {
    color: '#2FC8B3',
    fontSize: moderateScale(20),
    fontFamily: Theme.fontFamily.Poppins_Bold,
    // borderLeftWidth: 2,
    borderColor: '#2FC8B3',
    paddingLeft: moderateScale(10),
    textAlignVertical: 'center',
    bottom: moderateScale(2),
    width: moderateScale(70),
    textAlign: 'right',
  },
  flatListLeftCard: {
    flexDirection: 'row',
    marginLeft: (width / 100) * 5,
    marginBottom: moderateScale(10),
  },
  flatListRightCard: {
    flexDirection: 'row-reverse',
    marginLeft: (width / 100) * 5,
    marginBottom: moderateScale(10),
  },
  dp: {
    width: moderateScale(50),
    height: moderateScale(50),
    resizeMode: 'cover',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#2FC8B3',
  },
  msgContainer: {
    borderTopRightRadius: moderateScale(8),
    borderBottomRightRadius: moderateScale(8),
    borderBottomLeftRadius: moderateScale(20),
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#979797',
    elevation: moderateScale(10),
    marginLeft: moderateScale(20),
  },
});

export default ConversationScreen;
