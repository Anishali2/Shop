import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Theme from '../../Theme/Theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {moderateScale} from '../../Theme/Dimensions';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Header} from '../../assets/Components/Header';
import {useDispatch, useSelector} from 'react-redux';

const {width, height} = Dimensions.get('window');

const Notification = () => {
  const {notifications} = useSelector(state => state.home);

  const call = () => {
    const [head, ...tail] = notifications.map(k => {
      return {title: k.created_at.split(' ')[0]};
    });
    let test = tail.reduce(
      (acc, b) => {
        if (acc.map(o => o.title) === b.title) {
          acc.push(b);
        }
        return acc;
      },
      [head],
    );
    return test;
  };

  const renderItem = ({item, index}) => {
    return (
      <View>
        <Text style={styles.date}>{item?.title}</Text>
        <FlatList
          data={notifications.filter(
            f => f.created_at.split(' ')[0] === item?.title,
          )}
          renderItem={childRenderItem}
          style={{
            paddingBottom: moderateScale(40),
          }}
        />
      </View>
    );
  };

  const childRenderItem = ({item, index}) => {
    return (
      <View style={styles.flatlistCard}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../assets/images/profile.jpeg')}
            style={styles.cardImage}
          />
          <View
            style={{
              marginLeft: moderateScale(20),
            }}>
            <Text style={styles.description}>{item.notification}</Text>
            <Text style={styles.time}>{item.created_at.split(' ')[1]}</Text>
          </View>
        </View>
        <FontAwesome5
          name="chevron-right"
          color="#191B32"
          size={moderateScale(18)}
        />
      </View>
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
            color="transparent"
            size={moderateScale(28)}
          />
        )}
        Tag={'Notification'}
      />

      <FlatList
        data={call()}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingBottom: moderateScale(110),
          paddingTop: moderateScale(70),
        }}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          notifications.length === 0 && (
            <Text style={styles.noPost}>No notification to Show</Text>
          )
        }
      />
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
  date: {
    fontSize: moderateScale(15),
    fontFamily: Theme.fontFamily.Poppins_Bold,
    color: '#979797',
    marginLeft: (width / 100) * 5,
    // marginBottom: moderateScale(5),
  },
  flatlistCard: {
    width: (width / 100) * 90,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // height: moderateScale(85),
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
    fontSize: moderateScale(12),
    color: '#191B32',
    fontFamily: Theme.fontFamily.Poppins_Medium,
  },
  time: {
    fontSize: moderateScale(8),
    color: '#191B32',
    fontFamily: Theme.fontFamily.Poppins_Regular,
  },
  noPost: {
    marginTop: moderateScale(120),
    fontFamily: Theme.fontFamily.Poppins_Regular,
    fontSize: moderateScale(16),
    color: '#2EC8B2',
    textAlign: 'center',
  },
});

export default Notification;
