import React, {useEffect, useState} from 'react';
import {
  Image,
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Theme from '../../Theme/Theme';
import {moderateScale} from '../../Theme/Dimensions';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Header} from '../../assets/Components/Header';
import {useDispatch, useSelector} from 'react-redux';
import {getReviews} from '../../redux/actions/home';
import {CustomActivity} from '../../assets/Components/CustomActivity';

const {width, height} = Dimensions.get('window');

const ReviewScreen = ({navigation, route}) => {
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);
  const [data, setData] = useState([]);
  const {side} = route.params;
  const {uid} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.cardContaienr}>
        <Image
          source={require('../../assets/images/1.jpg')}
          resizeMode="cover"
          style={styles.img}
        />
        <View
          style={{
            marginLeft: moderateScale(10),
          }}>
          <Text style={styles.itemName}>Ladies Squirts</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <MaterialCommunityIcons
              name="star"
              size={moderateScale(20)}
              color={item.rating >= 1 ? '#FFFD54' : 'transparent'}
            />
            <MaterialCommunityIcons
              name="star"
              size={moderateScale(20)}
              color={item.rating >= 2 ? '#FFFD54' : 'transparent'}
              style={{
                marginLeft: moderateScale(5),
              }}
            />
            <MaterialCommunityIcons
              name="star"
              size={moderateScale(20)}
              color={item.rating >= 3 ? '#FFFD54' : 'transparent'}
              style={{
                marginLeft: moderateScale(5),
              }}
            />
            <MaterialCommunityIcons
              name="star"
              size={moderateScale(20)}
              color={item.rating >= 4 ? '#FFFD54' : 'transparent'}
              style={{
                marginLeft: moderateScale(5),
              }}
            />
            <MaterialCommunityIcons
              name="star"
              size={moderateScale(20)}
              color={item.rating >= 5 ? '#FFFD54' : 'transparent'}
              style={{
                marginLeft: moderateScale(5),
              }}
            />
          </View>
          <Text numberOfLines={2} style={styles.description}>
            {item.review}
          </Text>
        </View>
      </View>
    );
  };

  useEffect(() => {
    handleGetReviews();
  }, []);

  const handleGetReviews = () => {
    var formdata = new FormData();
    formdata.append('__api_key__', 'secret key');
    formdata.append('seller_uid', side === 'self' ? uid : side);
    setShowActivityIndicator(true);
    dispatch(getReviews(formdata, onSuccess, onError));
  };

  const onSuccess = res => {
    setData(res);
    setShowActivityIndicator(false);
  };

  const onError = err => {
    setShowActivityIndicator(false);
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
        Tag={'Reviews'}
      />

      <FlatList
        data={data}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingBottom: moderateScale(110),
          paddingTop: moderateScale(70),
        }}
        ListHeaderComponent={
          side === 'self'
            ? data.length === 0 && (
                <Text style={styles.noPost}>No reviews to show</Text>
              )
            : data.length === 0 && (
                <Text style={styles.noPost}>
                  No reviews yet be the first to leave a review
                </Text>
              )
        }
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListFooterComponent={() => {
          return side === 'self' ? null : (
            <Text
              onPress={() => navigation.navigate('LeaveReview')}
              style={styles.footer}>
              Leave a review
            </Text>
          );
        }}
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
  cardContaienr: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: width,
    paddingHorizontal: (width / 100) * 5,
  },
  img: {
    borderRadius: moderateScale(10),
    width: (width / 100) * 30,
    height: moderateScale(100),
  },
  itemName: {
    color: '#545659',
    fontFamily: Theme.fontFamily.Poppins_SemiBold,
    fontSize: moderateScale(16),
  },
  description: {
    fontFamily: Theme.fontFamily.Poppins_Regular,
    color: '#909294',
    fontSize: moderateScale(13),
    width: width - (width / 100) * 40 - moderateScale(15),
    marginTop: moderateScale(5),
  },
  separator: {
    width: (width / 100) * 90,
    height: moderateScale(1),
    backgroundColor: '#ACADAE',
    alignSelf: 'center',
    marginVertical: moderateScale(10),
  },
  footer: {
    width: (width / 100) * 70,
    height: moderateScale(55),
    backgroundColor: '#2FC8B3',
    borderRadius: 100,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    fontSize: moderateScale(16),
    fontFamily: Theme.fontFamily.Poppins_Medium,
    alignSelf: 'center',
    marginTop: moderateScale(30),
    elevation: moderateScale(10),
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

export default ReviewScreen;
