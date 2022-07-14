import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {moderateScale} from '../../Theme/Dimensions';
import Theme from '../../Theme/Theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Header} from '../../assets/Components/Header';
import {useSelector, useDispatch} from 'react-redux';
import {logoutSuccess} from '../../redux/actions/auth';
import * as types from '../../redux/actions/types';
import {CustomActivity} from '../../assets/Components/CustomActivity';
import ShowSnackBar from '../../assets/Components/ShowSnackBar';
import {useFocusEffect} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const ProfileScreen = ({navigation}) => {
  const bottomSheet = useRef();
  const dispatch = useDispatch();
  const {type, image, first, last, uid} = useSelector(state => state.auth);
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);
  const [totalFollowers, setTotalFollowers] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      checkFollowers();
    }, []),
  );

  const handleLogOut = () => {
    dispatch(logoutSuccess());
    bottomSheet.current.close();
    navigation.replace('SplashScreen');
  };

  const checkFollowers = () => {
    var formdata = new FormData();
    formdata.append('__api_key__', 'secret key');
    formdata.append(type === 1 ? 'buyer_uid' : 'seller_uid', uid);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };
    setShowActivityIndicator(true);

    fetch(
      `${types.BASEURL}/${
        type === 1 ? 'get_buyer_followers' : 'get_total_followers'
      }.php`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        if (result.state === 'OK') {
          if (result.data.followers) {
            setTotalFollowers(result?.data?.followers);
          } else {
            setTotalFollowers(result?.data?.total_followers);
          }
          if (type === 2) {
            fetch(`${types.BASEURL}/get_total_reviews.php`, requestOptions)
              .then(response1 => response1.json())
              .then(result1 => {
                if (result1.state === 'OK') {
                  setShowActivityIndicator(false);
                  setTotalReviews(result1.data.total_reviews);
                } else {
                  setShowActivityIndicator(false);
                  ShowSnackBar('There was some error...', 'red');
                  console.log(result1);
                }
              });
          } else {
            setShowActivityIndicator(false);
          }
        } else {
          setShowActivityIndicator(false);
          ShowSnackBar('There was some error...', 'red');
        }
      })
      .catch(error => console.log('error', error));
  };

  const handleGoLive = () => {
    const granted = PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.RECORD_AUDIO,
    );
    granted
      .then(data => {
        if (!data) {
          const permissions = [
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            PermissionsAndroid.PERMISSIONS.CAMERA,
          ];
          PermissionsAndroid.requestMultiple(permissions);
        } else {
          navigation.navigate('LiveRoom');
        }
      })
      .catch(err => {
        console.log(err.toString());
      });
  };

  // const handleGetToken = () => {
  //   return fetch(
  //     `https://github.com/ZEGOCLOUD/dynamic_token_server_nodejs/access_token?uid=${id}`,
  //     {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json; charset=utf-8',
  //       },
  //     },
  //   ).then(data => data.json());
  // };

  return (
    <View style={styles.mainContainer}>
      <Header
        LeftIcon={() => (
          <MaterialCommunityIcons
            onPress={() => navigation.goBack()}
            name="pencil-circle-outline"
            color="transparent"
            size={moderateScale(28)}
          />
        )}
        RightIcon={() => (
          <MaterialCommunityIcons
            onPress={() => navigation.navigate('EditProfile')}
            name="pencil-circle-outline"
            size={moderateScale(28)}
            color="#2EC8B2"
          />
        )}
        Tag={'Your Profile'}
      />

      <ScrollView
        contentContainerStyle={{
          paddingBottom: moderateScale(110),
          paddingTop: moderateScale(70),
        }}>
        <Image resizeMode="cover" source={{uri: image}} style={styles.dp} />
        <Text style={styles.userName}>
          {first} {last}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            marginTop: moderateScale(30),
            marginBottom: moderateScale(20),
          }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('Followers')}>
            <Text style={styles.followingNumbers}>
              {type === 1 ? totalFollowers.length : totalFollowers}
            </Text>
            <Text style={styles.following}>
              {type === 2 ? 'Followers' : 'Following'}
            </Text>
          </TouchableOpacity>
          {type === 2 && (
            <View
              style={{
                width: moderateScale(2),
                height: '100%',
                backgroundColor: '#2FC8B3',
              }}
            />
          )}
          {type === 2 && (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() =>
                navigation.navigate('ReviewScreen', {side: 'self'})
              }>
              <Text style={styles.followingNumbers}>{totalReviews}</Text>
              <Text style={styles.following}>Reviews</Text>
            </TouchableOpacity>
          )}
        </View>
        {type === 2 && (
          <View
            style={{
              width: moderateScale(160),
              alignSelf: 'center',
              overflow: 'visible',
              justifyContent: 'center',
            }}>
            <Text
              onPress={() => handleGoLive()}
              style={{
                width: '100%',
                height: moderateScale(50),
                borderRadius: 100,
                textAlign: 'left',
                textAlignVertical: 'center',
                color: 'white',
                fontFamily: Theme.fontFamily.Poppins_Medium,
                backgroundColor: '#2FC8B3',
                paddingLeft: moderateScale(20),
              }}>
              Start Live
            </Text>
            <AntDesign
              onPress={() => handleGoLive()}
              name="play"
              color="white"
              size={moderateScale(40)}
              style={{
                position: 'absolute',
                alignSelf: 'flex-end',
                backgroundColor: '#2FC8B3',
                width: moderateScale(55),
                height: moderateScale(55),
                textAlign: 'center',
                textAlignVertical: 'center',
                borderRadius: 100,
                elevation: moderateScale(5),
              }}
            />
          </View>
        )}

        <TouchableOpacity
          activeOpacity={1}
          onPress={() =>
            navigation.navigate('PurchaseSummary', {
              path: 'Purchase',
            })
          }
          style={[styles.rowButtons, {marginTop: moderateScale(30)}]}>
          <Text style={styles.following}>Purchase Summary</Text>
          <AntDesign name="right" size={moderateScale(18)} color="#191B32" />
        </TouchableOpacity>
        {type === 2 && (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() =>
              navigation.navigate('PurchaseSummary', {
                path: 'Sales',
              })
            }
            style={[styles.rowButtons, {marginTop: moderateScale(30)}]}>
            <Text style={styles.following}>Sales Summary</Text>
            <AntDesign name="right" size={moderateScale(18)} color="#191B32" />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => navigation.navigate('BlockedScreen')}
          activeOpacity={1}
          style={[styles.rowButtons, {marginTop: moderateScale(30)}]}>
          <Text style={styles.following}>Blocked</Text>
          <AntDesign name="right" size={moderateScale(18)} color="#191B32" />
        </TouchableOpacity>
        {type === 2 && (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('ManageMyStore')}
            style={[styles.rowButtons, {marginTop: moderateScale(30)}]}>
            <Text style={styles.following}>Manage My Store</Text>
            <AntDesign name="right" size={moderateScale(18)} color="#191B32" />
          </TouchableOpacity>
        )}

        {type === 1 && (
          <TouchableOpacity
            onPress={() => navigation.navigate('BecomeSeller')}
            activeOpacity={1}
            style={[styles.rowButtons, {marginTop: moderateScale(30)}]}>
            <Text style={styles.following}>Become a Seller</Text>
            <AntDesign name="right" size={moderateScale(18)} color="#191B32" />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.navigate('SettingsScreen')}
          style={[styles.rowButtons, {marginTop: moderateScale(30)}]}>
          <Text style={styles.following}>Settings</Text>
          <AntDesign name="right" size={moderateScale(18)} color="#191B32" />
        </TouchableOpacity>
        <Text onPress={() => bottomSheet.current.open()} style={styles.logout}>
          Log out
        </Text>
      </ScrollView>
      <RBSheet
        ref={bottomSheet}
        height={height}
        customStyles={{
          container: {
            backgroundColor: 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}>
        <View style={styles.popUpContainer}>
          <Text style={styles.msg}>Do you want to{'\n'}Log out?</Text>
          <Text onPress={() => handleLogOut()} style={styles.RBButton}>
            Yes
          </Text>
          <Text
            onPress={() => bottomSheet.current.close()}
            style={[styles.RBButton, styles.noButton]}>
            No
          </Text>
        </View>
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
    width: (width / 100) * 36,
    height: (width / 100) * 36,
    borderRadius: 100,
    borderWidth: moderateScale(5),
    borderColor: '#2EC8B2',
    alignSelf: 'center',
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
    textAlign: 'center',
  },
  following: {
    color: 'black',
    fontFamily: Theme.fontFamily.Poppins_Regular,
    fontSize: moderateScale(16),
    textAlign: 'center',
  },
  rowButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: (width / 100) * 90,
    borderBottomWidth: moderateScale(1),
    borderColor: '#2FC8B3',
    paddingBottom: moderateScale(5),
    alignSelf: 'center',
  },
  logout: {
    backgroundColor: '#2FC8B3',
    height: moderateScale(55),
    textAlignVertical: 'center',
    marginLeft: (width / 100) * 5,
    borderTopRightRadius: moderateScale(20),
    borderBottomLeftRadius: moderateScale(20),
    width: moderateScale(150),
    fontFamily: Theme.fontFamily.Poppins_SemiBold,
    color: 'white',
    fontSize: moderateScale(16),
    textAlign: 'center',
    marginTop: moderateScale(30),
    elevation: moderateScale(10),
  },
  popUpContainer: {
    width: (width / 100) * 90,
    backgroundColor: 'white',
    borderRadius: moderateScale(20),
    paddingVertical: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#2FC8B3',
    borderWidth: moderateScale(2),
  },
  msg: {
    color: '#191B32',
    fontFamily: Theme.fontFamily.Poppins_Medium,
    fontSize: moderateScale(20),
    textAlign: 'center',
  },
  RBButton: {
    height: moderateScale(50),
    width: '60%',
    backgroundColor: '#2FC8B3',
    color: 'white',
    borderRadius: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: moderateScale(30),
  },
  noButton: {
    borderWidth: moderateScale(1),
    borderColor: '#2FC8B3',
    color: '#2FC8B3',
    backgroundColor: 'white',
  },
});

export default ProfileScreen;
