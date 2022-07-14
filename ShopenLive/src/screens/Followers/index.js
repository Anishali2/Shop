import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import Theme from '../../Theme/Theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {moderateScale} from '../../Theme/Dimensions';
import {Header} from '../../assets/Components/Header';
import {useDispatch, useSelector} from 'react-redux';
import * as types from '../../redux/actions/types';
import {useFocusEffect} from '@react-navigation/native';
import {CustomActivity} from '../../assets/Components/CustomActivity';
import ShowSnackBar from '../../assets/Components/ShowSnackBar';

const {width, height} = Dimensions.get('window');

const Followers = ({navigation, route}) => {
  const {type, uid} = useSelector(state => state.auth);
  const [data, setData] = useState([]);
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      handleGetData();
    }, []),
  );

  const handleGetData = () => {
    var formdata = new FormData();
    formdata.append('__api_key__', 'secret key');
    if (type === 1) {
      formdata.append('buyer_uid', uid);
    } else {
      formdata.append('seller_uid', uid);
    }

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };
    setShowActivityIndicator(true);
    fetch(
      `${types.BASEURL}/${
        type === 2 ? 'get_followers' : 'get_buyer_followers'
      }.php`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        if (result.state === 'OK') {
          setShowActivityIndicator(false);
          setData(result.data.followers);
        } else {
          setShowActivityIndicator(false);
          ShowSnackBar('There was some error...', 'red');
        }
      })
      .catch(error => console.log('error', error));
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.flatlistCard}>
        <Image source={{uri: item.profile_picture}} style={styles.cardImage} />
        <Text style={styles.description}>
          {item.first_name} {item.last_name}
        </Text>
        {type === 1 && (
          <Text
            onPress={() => handleBlock(item.buyer_uid)}
            style={styles.unblockButton}>
            Unfollow
          </Text>
        )}
      </View>
    );
  };

  const handleBlock = buyer_uid => {
    var formdata = new FormData();
    formdata.append('__api_key__', 'secret key');
    formdata.append('buyer_uid', uid);
    formdata.append('seller_uid', buyer_uid);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };
    setShowActivityIndicator(true);

    fetch(`${types.BASEURL}/unfollow_seller.php`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.state === 'OK') {
          setShowActivityIndicator(false);
          handleGetData();
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
        Tag={type === 1 ? 'Following' : 'Followers'}
      />

      <FlatList
        data={data}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingBottom: moderateScale(110),
          paddingTop: moderateScale(70),
        }}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          data.length === 0 && (
            <Text style={styles.noPost}>No data to Show</Text>
          )
        }
      />
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
  flatlistCard: {
    width: (width / 100) * 90,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(15),
    borderWidth: moderateScale(1),
    borderColor: '#2EC8B2',
    borderRadius: moderateScale(10),
    marginTop: moderateScale(10),
  },
  cardImage: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: 100,
    borderWidth: 1,
    resizeMode: 'contain',
    borderColor: '#2EC8B2',
  },
  description: {
    marginLeft: moderateScale(20),
    fontSize: moderateScale(14),
    fontFamily: Theme.fontFamily.Poppins_Bold,
    color: '#191B32',
  },
  unblockButton: {
    position: 'absolute',
    right: moderateScale(10),
    backgroundColor: '#2EC8B2',
    color: 'white',
    borderRadius: 100,
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(3),
    fontFamily: Theme.fontFamily.Poppins_Regular,
    fontSize: moderateScale(12),
  },
  noPost: {
    fontFamily: Theme.fontFamily.Poppins_Regular,
    fontSize: moderateScale(16),
    color: '#2EC8B2',
    textAlign: 'center',
    width: (width / 100) * 70,
    alignSelf: 'center',
    marginTop: moderateScale(20),
  },
});

export default Followers;
