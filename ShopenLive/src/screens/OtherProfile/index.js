import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TextInput,
} from 'react-native';
import Theme from '../../Theme/Theme';
import {moderateScale} from '../../Theme/Dimensions';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Header} from '../../assets/Components/Header';
import {useSelector, useDispatch} from 'react-redux';
import ShowSnackBar from '../../assets/Components/ShowSnackBar';
import RBSheet from 'react-native-raw-bottom-sheet';
import {handleCreateTicket} from '../../redux/actions/home';
import * as types from '../../redux/actions/types';
import {CustomActivity} from '../../assets/Components/CustomActivity';

const {width, height} = Dimensions.get('window');

const OtherScreen = ({navigation, route}) => {
  const {item} = route.params;
  const {uid, type} = useSelector(state => state.auth);
  const {conversations} = useSelector(state => state.home);
  const dispatch = useDispatch();
  const [inputField, setInputField] = useState('');
  const bottomSheet = useRef();
  const [following, setFollowing] = useState(false);
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);
  const [totalFollowers, setTotalFollowers] = useState(0);
  const [blocked, setBlocked] = useState(false);

  const handleSendMessage = () => {
    if (inputField.length !== 0) {
      var formdata = new FormData();
      formdata.append('__api_key__', 'secret key');
      formdata.append('sender_uid', uid);
      formdata.append('receiver_uid', item.seller_uid);
      formdata.append('message', inputField);

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      setShowActivityIndicator(true);

      fetch(`${types.BASEURL}/send_message.php`, requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.state === 'OK') {
            setShowActivityIndicator(false);
            setInputField('');
            bottomSheet.current.close();
          } else {
            setShowActivityIndicator(false);
            ShowSnackBar('Message could not be sent...', 'red');
          }
        })
        .catch(error => console.log('error', error));
    }
  };

  useEffect(() => {
    checkFollow();
  }, []);

  const checkFollow = () => {
    var formdata = new FormData();
    formdata.append('__api_key__', 'secret key');
    formdata.append('buyer_uid', uid);
    formdata.append('seller_uid', item.seller_uid);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    setShowActivityIndicator(true);

    fetch(`${types.BASEURL}/check_follow.php`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.state === 'OK') {
          setFollowing(
            result?.data?.seller_not_followed === true ? false : true,
          );
          checkFollowers();
        } else {
          setShowActivityIndicator(false);
          ShowSnackBar('There was some error', 'red');
        }
      })
      .catch(error => console.log('error', error));
  };

  const checkFollowers = () => {
    var formdata = new FormData();
    formdata.append('__api_key__', 'secret key');
    formdata.append('seller_uid', item.seller_uid);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    fetch(`${types.BASEURL}/get_total_followers.php`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.state === 'OK') {
          // setShowActivityIndicator(false);
          setTotalFollowers(result.data.total_followers);
          checkBlock();
        } else {
          setShowActivityIndicator(false);
          ShowSnackBar('There was some error', 'red');
        }
      })
      .catch(error => console.log('error', error));
  };

  const checkBlock = () => {
    var formdata = new FormData();
    formdata.append('__api_key__', 'secret key');
    formdata.append('blocker', uid);
    formdata.append('blocking', item.seller_uid);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    fetch(`${types.BASEURL}/block_status.php`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.state === 'OK') {
          setShowActivityIndicator(false);
          setBlocked(result.data.blocked);
        }
      })
      .catch(error => console.log('error', error));
  };

  const onSuccess = res => {
    setInputField('');
    bottomSheet.current.close();
    navigation.navigate('BottomTab', {
      screen: 'Message',
    });
  };

  const onError = err => {
    ShowSnackBar('There was some error', 'red');
    console.log(err);
  };

  const handleFollow = () => {
    if (blocked === true) {
      ShowSnackBar('You have blocked this profile...', 'red');
      return;
    }
    var formdata = new FormData();
    formdata.append('__api_key__', 'secret key');
    formdata.append('buyer_uid', uid);
    formdata.append('seller_uid', item.seller_uid);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    setShowActivityIndicator(true);

    fetch(
      `${types.BASEURL}/${following ? 'unfollow_seller' : 'follow_seller'}.php`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        if (result.state === 'OK') {
          setShowActivityIndicator(false);
          if (result?.data?.Followed_Seller_Successfully === true) {
            checkFollow();
          } else if (result?.data?.Unfollowed_Seller_Successfully === true) {
            checkFollow();
          }
        } else {
          setShowActivityIndicator(false);
          ShowSnackBar('There was some error', 'red');
        }
      })
      .catch(error => console.log('error', error));
  };

  const handle = () => {
    let check = true;
    for (var i = 0; i < conversations.length; i++) {
      if (conversations[i].conversations[0].sender_uid === item.seller_uid) {
        check = false;
      } else if (
        conversations[i].conversations[0].receiver_uid === item.seller_uid
      ) {
        check = false;
      }
    }
    console.log(check);
    if (check === true) {
      bottomSheet.current.open();
    } else {
      ShowSnackBar('You already have ongoing chat...', 'green');
      navigation.navigate('Message');
    }
  };

  const handleBlock = () => {
    var formdata = new FormData();
    formdata.append('__api_key__', 'secret key');
    formdata.append('blocker', uid);
    formdata.append(
      blocked === false ? 'blocking' : 'blocked',
      item.seller_uid,
    );

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };
    setShowActivityIndicator(true);

    fetch(
      `${types.BASEURL}/${
        blocked === false ? 'block_person' : 'unblock_person'
      }.php`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        if (result.state === 'OK') {
          if (following === true) {
            handleFollow();
          } else {
            setShowActivityIndicator(false);
            checkFollow();
          }
        } else {
          setShowActivityIndicator(false);
          ShowSnackBar('There was some error...', 'red');
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
        Tag={'Seller Profile'}
      />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: moderateScale(110),
          paddingTop: moderateScale(70),
        }}>
        <View style={styles.container}>
          <View style={styles.topProfileSideButton}>
            <MaterialCommunityIcons
              onPress={() => {
                if (blocked !== true) handle();
              }}
              name="message-text-outline"
              color={blocked ? 'grey' : '#2EC8B2'}
              size={moderateScale(22)}
            />
            <Text
              style={[
                styles.profileSideTag,
                blocked === true && {
                  color: 'grey',
                },
              ]}>
              Send Message
            </Text>
          </View>
          <Image
            resizeMode="cover"
            source={{uri: item.profile_picture}}
            style={styles.dp}
          />
          <View style={styles.topProfileSideButton}>
            <MaterialCommunityIcons
              name="block-helper"
              color={'#2EC8B2'}
              size={moderateScale(22)}
              onPress={() => handleBlock()}
            />
            <Text style={styles.profileSideTag}>
              {blocked ? 'Unblock' : 'Block'}
            </Text>
          </View>
        </View>
        <Text style={styles.userName}>
          {item?.first_name
            ? `${item.first_name} ${item.last_name}`
            : item?.full_name}
        </Text>
        <Text style={styles.followingNumbers}>{totalFollowers}</Text>
        <Text style={styles.following}>Followers</Text>
        <View style={[styles.container, {marginTop: moderateScale(10)}]}>
          <Text
            onPress={() =>
              navigation.navigate('ReviewScreen', {side: item.seller_uid})
            }
            style={styles.rowButton}>
            Reviews
          </Text>
          <Text onPress={() => handleFollow()} style={styles.rowButton}>
            {following ? 'Unfollow' : 'Follow'}
          </Text>
        </View>
        <Text style={styles.headingTag}>Bio</Text>
        <Text style={styles.bio}>
          Hi my name is john lorem ipsum is simply dummy text of the printing
          and type setting industry.
        </Text>
      </ScrollView>
      <RBSheet
        customStyles={{
          container: {
            borderTopLeftRadius: moderateScale(30),
            borderTopRightRadius: moderateScale(30),
          },
        }}
        ref={bottomSheet}
        height={moderateScale(300)}>
        <Text style={styles.bottomRequestText}>Request to Chat</Text>
        <TextInput
          value={inputField}
          onChangeText={setInputField}
          style={{
            width: (width / 100) * 90,
            height: moderateScale(45),
            alignSelf: 'center',
            borderWidth: 0.5,
            borderRadius: 100,
            marginTop: moderateScale(10),
            paddingHorizontal: moderateScale(20),
            backgroundColor: 'white',
            color: 'black',
            fontFamily: Theme.fontFamily.Poppins_Regular,
            fontSize: moderateScale(14),
          }}
        />
        <Text
          onPress={() => setInputField('Hi, How are you doing?')}
          style={styles.bottomTemplates}>
          Hi, How are you doing?
        </Text>
        <Text
          onPress={() => setInputField('Can we have a conversation?')}
          style={styles.bottomTemplates}>
          Can we have a conversation?
        </Text>
        <Text
          onPress={() => setInputField('Are you still open?')}
          style={styles.bottomTemplates}>
          Are you still open?
        </Text>
        <Text
          onPress={() => handleSendMessage()}
          style={{
            width: (width / 100) * 90,
            alignSelf: 'center',
            marginTop: moderateScale(10),
            textAlign: 'center',
            textAlignVertical: 'center',
            color: 'white',
            backgroundColor: '#2FC8B3',
            height: moderateScale(40),
            borderRadius: 100,
            elevation: moderateScale(5),
          }}>
          CONTINUE
        </Text>
      </RBSheet>
      {showActivityIndicator && <CustomActivity />}
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
  dp: {
    width: (width / 100) * 30,
    height: (width / 100) * 30,
    borderRadius: 100,
    borderWidth: moderateScale(5),
    borderColor: '#2EC8B2',
    alignSelf: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: (width / 100) * 5,
    marginTop: moderateScale(20),
  },
  topProfileSideButton: {
    alignItems: 'center',
    width: '30%',
  },
  profileSideTag: {
    textAlign: 'center',
    color: 'black',
    fontFamily: Theme.fontFamily.Poppins_Regular,
    fontSize: moderateScale(12),
  },
  userName: {
    color: '#191B32',
    fontSize: moderateScale(20),
    fontFamily: Theme.fontFamily.Poppins_Medium,
    textAlign: 'center',
    marginTop: moderateScale(10),
  },
  followingNumbers: {
    color: '#2FC8B3',
    fontFamily: Theme.fontFamily.Poppins_Bold,
    fontSize: moderateScale(20),
    marginTop: moderateScale(10),
    textAlign: 'center',
  },
  following: {
    color: 'black',
    fontFamily: Theme.fontFamily.Poppins_Regular,
    fontSize: moderateScale(16),
    textAlign: 'center',
  },
  rowButton: {
    height: moderateScale(50),
    backgroundColor: '#2FC8B3',
    fontFamily: Theme.fontFamily.Poppins_Regular,
    fontSize: moderateScale(15),
    borderRadius: 100,
    textAlign: 'center',
    textAlignVertical: 'center',
    width: (width / 100) * 42.5,
    color: 'white',
    elevation: moderateScale(5),
  },
  headingTag: {
    fontFamily: Theme.fontFamily.Poppins_Bold,
    color: '#191B32',
    fontSize: moderateScale(15),
    marginLeft: (width / 100) * 5,
    marginTop: moderateScale(20),
  },
  bio: {
    width: (width / 100) * 90,
    alignSelf: 'center',
    textAlign: 'left',
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(15),
    backgroundColor: 'white',
    borderWidth: moderateScale(1),
    borderColor: '#2FC8B3',
    borderRadius: moderateScale(12),
    elevation: moderateScale(5),
    fontFamily: Theme.fontFamily.Poppins_Regular,
    fontSize: moderateScale(13),
    color: '#979797',
  },
  bottomRequestText: {
    fontFamily: Theme.fontFamily.Poppins_Medium,
    textAlign: 'center',
    marginTop: moderateScale(15),
    color: '#2FC8B3',
  },
  bottomTemplates: {
    textAlign: 'right',
    marginRight: (width / 100) * 5,
    marginTop: moderateScale(10),
    height: moderateScale(30),
    textAlignVertical: 'center',
    fontFamily: Theme.fontFamily.Poppins_Medium,
    color: '#2FC8B3',
  },
});

export default OtherScreen;
