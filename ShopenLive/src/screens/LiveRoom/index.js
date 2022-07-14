import React, {useState, useRef, createRef, useEffect} from 'react';
import {
  Button,
  TextInput,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
  findNodeHandle,
  Image,
  TouchableOpacity,
  AccessibilityInfo,
  BackHandler,
  Dimensions,
  FlatList,
} from 'react-native';
import ZegoExpressEngine, {
  ZegoTextureView,
  ZegoScenario,
  ZegoUpdateType,
  ZegoViewMode,
} from 'zego-express-engine-reactnative';
import {useSelector, useDispatch} from 'react-redux';
import * as types from '../../redux/actions/types';
import {useFocusEffect} from '@react-navigation/native';
import {CustomActivity} from '../../assets/Components/CustomActivity';
import ShowSnackBar from '../../assets/Components/ShowSnackBar';
import {callapi} from '../../redux/actions/auth';
import {activeScreen} from '../../redux/actions/home';
import {moderateScale} from '../../Theme/Dimensions';
import {BallIndicator} from 'react-native-indicators';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Theme from '../../Theme/Theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('window');

const LiveRoom = ({navigation}) => {
  const dispatch = useDispatch();
  const {first, last, uid} = useSelector(state => state.auth);
  const zego_preview_view = useRef();
  const appID = 1269965695;
  const [roomID, setRoomID] = useState('');
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);
  const [speakerEnabled, setSpeakerEnabled] = useState(true);
  const [showPreview, setShowPreview] = useState(true);
  const [comments, setComments] = useState([]);
  const down = useRef();
  const [viewers, setViewers] = useState(0);
  const [comment, setComment] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      dispatch(callapi(false));
      dispatch(activeScreen('LiveRoom'));
      return () => dispatch(callapi(true));
    }, []),
  );

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', leaveRoom);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', leaveRoom);
      };
    }, []),
  );

  useEffect(() => {
    // handleGetToken();
  }, []);

  const handleGetToken = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      `${types.BASEURL}/stream/token/token.php?userid=${uid}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        const channel =
          Math.random().toString(36).slice(2, 7) +
          Math.random().toString(36).slice(2, 7) +
          '-' +
          Math.random().toString(36).slice(2, 7);
        const token = result.token;
        setRoomID(channel);
        handleCreateLiveStream(channel);
        handleCreateRoom(token, channel);
      })
      .catch(error => console.log('error', error));
  };

  const handleCreateLiveStream = channel => {
    var formdata = new FormData();
    formdata.append('__api_key__', 'secret key');
    formdata.append('seller_uid', uid);
    formdata.append('channel_name', channel);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    fetch(`${types.BASEURL}/create_live_stream.php`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.state === 'OK') {
        } else {
          leaveRoom();
          ShowSnackBar('There was some error');
        }
      })
      .catch(error => console.log('error', error));
  };

  const handleCreateRoom = (token, channel) => {
    const profile = {
      appID: appID,
      scenario: ZegoScenario.General,
    };
    ZegoExpressEngine.createEngineWithProfile(profile).then(async () => {
      console.warn('ZegoExpressEngine created!');
      // Clear previously registered callbacks
      unRegisterCallback();
      // Register callback
      registerCallback();

      // Join room and wait...
      joinRoom(token, channel);
    });
  };

  const registerCallback = () => {
    ZegoExpressEngine.instance().on(
      'roomStateUpdate',
      (roomID, state, errorCode, extendedData) => {
        console.log('roomStateUpdated');
        setShowPreview(true);
        console.log(roomID);
        console.log(state);
        console.log(errorCode);
        console.log(extendedData);

        // Callback for updates on the current user's room connection status.
        // When the current user's room connection status changes (for example, when the current user is disconnected from the room or login authentication fails), the SDK sends out the event notification through this callback.
      },
    );

    ZegoExpressEngine.instance().on(
      'roomUserUpdate',
      (roomID, updateType, userList) => {
        console.log('roomUserUpdate');
        console.log(roomID);
        console.log(updateType);
        console.log(userList);

        // Callback for updates on the status of other users in the room.
        // When other users join or leave the room, the SDK sends out the event notification through this callback.
      },
    );

    ZegoExpressEngine.instance().on(
      'roomStreamUpdate',
      (roomID, updateType, streamList) => {
        console.log('roomStreamUpdate');

        // Callback for updates on the status of the streams in the room.
        // When new streams are published to the room or existing streams in the room stop, the SDK sends out the event notification through this callback.
      },
    );

    ZegoExpressEngine.instance().on(
      'IMRecvBroadcastMessage',
      (roomID, messageList) => {
        console.log('Barrage message received.');
        // console.log(messageList.fromUser.userName);
        let tempData = comments.push({
          name: messageList[0].fromUser.userName,
          message: messageList[0].fromUser.message,
        });

        setComments(tempData);
        // down.current.scrollToEnd({
        //   animated: true,
        // });
      },
    );
  };
  const unRegisterCallback = () => {
    // If the parameter is null, the previously registered callback is cleared
  };

  const joinRoom = async (token, channel) => {
    try {
      let roomConfig = {
        token: token,
      };
      ZegoExpressEngine.instance()
        .loginRoom(
          channel,
          {userID: uid, userName: `${first} ${last}`},
          roomConfig,
        )
        .then(() => {
          ZegoExpressEngine.instance().startPublishingStream(
            channel.split('-')[0],
          );
        });

      // ZegoExpressEngine.instance().startPlayingStream(roomID, {
      //   reactTag: findNodeHandle(zego_preview_view.current),
      //   viewMode: 0,
      //   backgroundColor: 0,
      // });

      if (zego_preview_view && zego_preview_view.current) {
        const localVIewRef = findNodeHandle(zego_preview_view.current);
        console.log(' i was called');
        ZegoExpressEngine.instance().startPreview({
          viewMode: ZegoViewMode.ScaleToFill,
          backgroundColor: 0,
          reactTag: localVIewRef,
        });
        console.log(' i reached called');

        if (localVIewRef) {
          AccessibilityInfo.setAccessibilityFocus(localVIewRef);
        }
        console.log(' i reached here');
      }
    } catch (error) {
      console.log('error--------------------');
      console.log(error);
    }
  };

  const leaveRoom = () => {
    console.log('i was logged out');
    ZegoExpressEngine.instance().stopPlayingStream(roomID);
    ZegoExpressEngine.instance().stopPublishingStream();
    ZegoExpressEngine.instance().stopPreview();
    ZegoExpressEngine.instance().logoutRoom(roomID);
    ZegoExpressEngine.destroyEngine();
    handleDeleteLiveStream();
    navigation.goBack();
    return true;
  };

  const handleDeleteLiveStream = () => {
    var formdata = new FormData();
    formdata.append('__api_key__', 'secret key');
    formdata.append('seller_uid', uid);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    fetch(`${types.BASEURL}/delete_live_stream.php`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.state === 'OK') {
        } else {
        }
      })
      .catch(error => console.log('error', error));
  };

  const toggleCamera = () => {
    ZegoExpressEngine.instance()
      .enableCamera(!cameraEnabled)
      .then(() => {
        setCameraEnabled(false);
      });
  };

  const changeFront = () => {
    ZegoExpressEngine.instance()
      .useFrontCamera()
      .then(() => setCameraEnabled(!cameraEnabled));
  };

  const toggleMic = () => {
    ZegoExpressManager.instance()
      .enableMic(!micEnabled)
      .then(() => {
        setMicEnabled(!micEnabled);
      });
  };

  const toggleSpeaker = () => {
    ZegoExpressManager.instance()
      .enableSpeaker(!speakerEnabled)
      .then(() => {
        setSpeakerEnabled(!speakerEnabled);
      });
  };

  const handleSendComment = () => {
    if (comment.length === 0) {
      return;
    }
    // Send a Broadcast Message to all users in the same room. Every user in the room can receive this message through the `IMRecvBroadcastMessage` callback.
    ZegoExpressEngine.instance()
      .sendBroadcastMessage(roomID, comment)
      .then(result => {
        // Handle the message delivery result.
      });
  };

  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          paddingLeft: moderateScale(10),
        }}>
        <Text
          style={{
            color: '#2FC8B3',
            fontFamily: Theme.fontFamily.Poppins_Medium,
            fontSize: moderateScale(14),
          }}>
          {item.name}
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: moderateScale(16),
            fontFamily: Theme.fontFamily.Poppins_Regular,
            top: moderateScale(-9),
          }}>
          {item.message}
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.callPage, styles.showPage]}>
      <ZegoTextureView
        ref={zego_preview_view}
        // @ts-ignore
        style={styles.previewView}
      />

      {showPreview ? (
        <View style={styles.WrapperContainer}>
          <View
            style={{
              width: (width / 100) * 90,
              alignSelf: 'center',
              paddingTop: moderateScale(20),
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                marginLeft: moderateScale(10),
              }}>
              <Text
                style={{
                  backgroundColor: '#FF0606',
                  color: 'white',
                  alignSelf: 'flex-start',
                  fontSize: moderateScale(12),
                  fontFamily: Theme.fontFamily.Poppins_Bold,
                  paddingHorizontal: moderateScale(5),
                  marginTop: moderateScale(5),
                  borderRadius: moderateScale(5),
                  paddingRight: moderateScale(10),
                }}>
                Live
              </Text>
              <View
                style={{
                  height: moderateScale(40),
                  backgroundColor: 'white',
                  borderRadius: moderateScale(10),
                  borderWidth: moderateScale(1),
                  borderColor: '#2FC8B3',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: moderateScale(10),
                }}>
                <MaterialCommunityIcons
                  name="eye"
                  size={moderateScale(20)}
                  color="#2FC8B3"
                />
                <Text
                  style={{
                    color: 'black',
                    fontFamily: Theme.fontFamily.Poppins_Regular,
                    fontSize: moderateScale(12),
                    marginLeft: moderateScale(10),
                  }}>
                  250
                </Text>
              </View>
            </View>
            <View>
              
              </View>
          </View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: moderateScale(150),
              height: moderateScale(50),
              borderRadius: moderateScale(10),
              borderWidth: moderateScale(1),
              backgroundColor: 'white',
              paddingHorizontal: moderateScale(10),
              borderColor: '#2FC8B3',
              alignSelf: 'center',
              marginTop: 'auto',
              marginBottom: moderateScale(10),
            }}>
            <Text
              style={{
                fontFamily: Theme.fontFamily.Poppins_Medium,
                color: 'black',
                fontSize: moderateScale(12),
              }}>
              View Products
            </Text>
            <Octicons
              name="chevron-right"
              color="black"
              size={moderateScale(20)}
            />
          </TouchableOpacity>
          <View style={styles.commentWrapper}>
            <View
              style={{
                backgroundColor: 'black',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0.5,
              }}
            />
            <FlatList
              ref={down}
              data={comments}
              renderItem={renderItem}
              contentContainerStyle={{
                paddingBottom: moderateScale(60),
              }}
            />
          </View>
          <View
            style={{
              // marginTop: 'auto',
              marginBottom: moderateScale(10),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: (width / 100) * 5,
              position: 'absolute',
              bottom: 0,
              width: width,
            }}>
            <View
              style={{
                width: (width / 100) * 90 - moderateScale(45),
                height: moderateScale(50),
                borderRadius: 100,
                overflow: 'hidden',
              }}>
              <View
                style={{
                  backgroundColor: 'black',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: 0.7,
                }}
              />
              <TextInput
                placeholder="Comment Here..."
                placeholderTextColor={'white'}
                style={{
                  width: '100%',
                  height: '100%',
                  paddingHorizontal: moderateScale(20),
                  color: 'white',
                }}
                value={comment}
                onChangeText={setComment}
              />
            </View>
            <Ionicons
              onPress={() => handleSendComment()}
              name="send"
              color="white"
              size={moderateScale(30)}
            />
          </View>
        </View>
      ) : (
        <BallIndicator
          color="#2FC8B3"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // ZegoEasyExample
  callPage: {
    flex: 1,
  },
  showPage: {
    display: 'flex',
  },
  showPreviewView: {
    display: 'flex',
    opacity: 1,
  },
  showPlayView: {
    display: 'flex',
    opacity: 1,
  },
  preview: {
    width: '100%',
    height: '100%',
  },
  previewView: {
    width: '100%',
    height: '100%',
  },
  play: {
    height: '25%',
    width: '40%',
    position: 'absolute',
    top: 80,
    right: 20,
    zIndex: 2,
  },
  playView: {
    width: '100%',
    height: '100%',
  },
  btnCon: {
    width: '100%',
    position: 'absolute',
    display: 'flex',
    bottom: 40,
    zIndex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  phoneCon: {
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: 'red',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 10,
  },
  cameraCon: {
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: 'gainsboro',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 10,
  },
  micCon: {
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: 'gainsboro',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 10,
  },
  image: {
    width: '50%',
    height: '50%',
  },
  phoneImage: {
    width: 35,
    height: 35,
  },
  WrapperContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  commentWrapper: {
    height: moderateScale(250),
    // marginTop: 'auto',
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    overflow: 'hidden',
    borderColor: '#2FC8B3',
    borderTopWidth: moderateScale(1),
    borderLeftWidth: moderateScale(1),
    borderRightWidth: moderateScale(1),
  },
});

export default LiveRoom;
