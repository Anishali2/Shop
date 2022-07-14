import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import Theme from '../../Theme/Theme';
import {moderateScale} from '../../Theme/Dimensions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Header} from '../../assets/Components/Header';
import {useSelector, useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {callapi} from '../../redux/actions/auth';

const {width} = Dimensions.get('window');

const MessageScreen = ({navigation}) => {
  const {conversations} = useSelector(state => state.home);
  const {email} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      dispatch(callapi(true));
    }, []),
  );

  const renderItem = ({item, index}) => {
    // var isoDateTime = new Date(item.updated_at);
    // let useData = item.seller.email === email ? item.buyer : item.seller;
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() =>
          navigation.navigate('ConversationScreen', {
            otheruid: item.uid,
            profilePic: item.avatar,
            profileName: item.name,
          })
        }
        style={styles.flatlistCard}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image source={{uri: item.avatar}} style={styles.cardImage} />
          <View
            style={{
              marginLeft: moderateScale(20),
            }}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.descMessage}>
              {item.conversations[0].message}
            </Text>
          </View>
        </View>
        <Text style={styles.time}>{item.conversations[0].time}</Text>
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
            color="transparent"
            size={moderateScale(28)}
          />
        )}
        Tag={'Messages'}
      />

      <FlatList
        data={conversations}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingBottom: moderateScale(110),
          paddingTop: moderateScale(70),
        }}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          conversations.length === 0 && (
            <Text style={styles.noPost}>No Converstaion to Show</Text>
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
  userName: {
    fontSize: moderateScale(12),
    color: '#191B32',
    fontFamily: Theme.fontFamily.Poppins_Medium,
  },
  descMessage: {
    fontSize: moderateScale(8),
    color: '#191B32',
    fontFamily: Theme.fontFamily.Poppins_Regular,
  },
  time: {
    fontFamily: Theme.fontFamily.Poppins_Regular,
    fontSize: moderateScale(10),
    color: '#191B32',
  },
  noPost: {
    marginTop: moderateScale(120),
    fontFamily: Theme.fontFamily.Poppins_Regular,
    fontSize: moderateScale(16),
    color: '#2EC8B2',
    textAlign: 'center',
  },
});

export default MessageScreen;
