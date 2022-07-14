import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {moderateScale} from '../../Theme/Dimensions';
import Theme from '../../Theme/Theme';
import LinearGradient from 'react-native-linear-gradient';
import {Header} from '../../assets/Components/Header';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {callapi} from '../../redux/actions/auth';
import {CustomActivity} from '../../assets/Components/CustomActivity';
import * as types from '../../redux/actions/types';
import ShowSnackBar from '../../assets/Components/ShowSnackBar';
import {activeScreen} from '../../redux/actions/home';

const {width, height} = Dimensions.get('window');

const LiveStream = ({navigation}) => {
  const dispatch = useDispatch();
  const {call} = useSelector(state => state.auth);
  const {screenFocused} = useSelector(state => state.home);
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);

  const [data, setData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      setShowActivityIndicator(true);
      dispatch(activeScreen('LiveStream'));
      dispatch(callapi(false));
      return () => dispatch(callapi(true));
    }, []),
  );

  useEffect(() => {
    if (call === false && screenFocused === 'LiveStream') {
      handleGetData();
    }
  });

  const handleGetData = () => {
    var formdata = new FormData();
    formdata.append('__api_key__', 'secret key');

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    setTimeout(() => {
      fetch(`${types.BASEURL}/fetch_live_stream_details.php`, requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.state === 'OK') {
            setShowActivityIndicator(false);
            setData(result.data.live_streams);
          } else {
            setShowActivityIndicator(false);
            ShowSnackBar('There was some error...', 'red');
          }
        })
        .catch(error => console.log('error', error));
    }, 1500);
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate('WatchRoom', {item: item})}
        style={styles.cardContainer}>
        <View style={styles.image}>
          <Image
            source={{uri: item.seller_profile_picture}}
            resizeMode="cover"
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </View>
        <Text style={styles.name}>{item.full_name}</Text>
        {/* <View style={styles.cardRow}>
          <MaterialCommunityIcons
            name="eye"
            size={moderateScale(20)}
            color="#2FC8B3"
          />
          <Text style={styles.trend}>206</Text>
          <MaterialCommunityIcons
            name="star"
            size={moderateScale(20)}
            color="#FFFD54"
            style={{
              marginLeft: moderateScale(5),
            }}
          />
          <Text style={[styles.trend, {borderRightWidth: 0, paddingRight: 0}]}>
            206
          </Text>
        </View> */}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <Header
        LeftIcon={() => (
          <MaterialCommunityIcons
            name="magnify"
            color="transparent"
            size={moderateScale(28)}
          />
        )}
        RightIcon={() => (
          <MaterialCommunityIcons
            name="magnify"
            color="#2EC8B2"
            size={moderateScale(28)}
          />
        )}
        Tag={'Shopenlive'}
      />

      <FlatList
        numColumns={2}
        data={data}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingBottom: moderateScale(110),
          paddingTop: moderateScale(70),
        }}
        ListHeaderComponent={
          data.length === 0 && (
            <Text style={styles.noPost}>No Live streams at the mean time</Text>
          )
        }
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{
          justifyContent: 'space-evenly',
        }}
        ItemSeparatorComponent={() => (
          <View style={styles.cardSeparator}>
            <View style={styles.separator} />
            <View style={styles.separator} />
          </View>
        )}
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
  cardContainer: {
    width: ((width / 100) * 85) / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: ((width / 100) * 85) / 2,
    height: ((width / 100) * 85) / 2,
    borderRadius: moderateScale(25),
    borderWidth: moderateScale(1),
    borderColor: '#2FC8B3',
    backgroundColor: 'white',
    elevation: moderateScale(10),
    overflow: 'hidden',
  },
  name: {
    color: '#191B32',
    fontSize: moderateScale(14),
    fontFamily: Theme.fontFamily.Poppins_SemiBold,
    marginTop: moderateScale(5),
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moderateScale(5),
  },
  trend: {
    color: '#191B32',
    fontFamily: Theme.fontFamily.Poppins_Medium,
    fontSize: moderateScale(12),
    paddingHorizontal: moderateScale(10),
    borderRightWidth: moderateScale(1.5),
    borderColor: '#2FC8B3',
    paddingTop: moderateScale(2),
  },
  cardSeparator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginVertical: moderateScale(10),
  },
  separator: {
    width: ((width / 100) * 85) / 2,
    height: moderateScale(2),
    backgroundColor: '#2FC8B3',
  },
  noPost: {
    marginTop: moderateScale(120),
    fontFamily: Theme.fontFamily.Poppins_Regular,
    fontSize: moderateScale(16),
    color: '#2EC8B2',
    textAlign: 'center',
  },
});

export default LiveStream;
