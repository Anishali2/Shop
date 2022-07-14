import React, {useState, useEffect, useId} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Theme from '../../Theme/Theme';
import {moderateScale} from '../../Theme/Dimensions';
import {Header} from '../../assets/Components/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import {getProducts} from '../../redux/actions/home';
import {CustomActivity} from '../../assets/Components/CustomActivity';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useFocusEffect} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const ManageMyStore = ({navigation}) => {
  const {uid} = useSelector(state => state.auth);
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      handleGetProducts();
    }, []),
  );

  const handleGetProducts = () => {
    var formdata = new FormData();
    formdata.append('__api_key__', 'secret key');
    formdata.append('seller_uid', uid);
    setShowActivityIndicator(true);
    dispatch(getProducts(formdata, onSuccess, onError));
  };

  const onSuccess = res => {
    setData(res);
    setShowActivityIndicator(false);
  };

  const onError = err => {
    setShowActivityIndicator(false);
  };

  const renderItem = ({item, index}) => {
    let tempQunatity = JSON.parse(item.quantity);
    let tempQuant = 0;
    for (let i = 0; i < tempQunatity.length; i++) {
      tempQuant = tempQuant + parseInt(tempQunatity[i]);
    }
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => navigation.navigate('ModifyProduct', {item: item})}
        style={[
          styles.itemWrapper,
          {
            backgroundColor:
              tempQuant !== 0
                ? index % 2 === 0
                  ? 'white'
                  : '#EEF2F1'
                : '#FF5A5F',
          },
        ]}>
        <Text
          style={[
            styles.itemSideContainer,
            styles.itemColor,
            tempQuant === 0 && {
              color: 'white',
            },
          ]}>
          {item.number}
        </Text>
        <Text
          style={[
            styles.itemSideContainer,
            styles.itemMiddleContainer,
            styles.itemColor,
            tempQuant === 0 && {
              color: 'white',
            },
          ]}>
          {item.name}
        </Text>
        <Text
          style={[
            styles.itemSideContainer,
            styles.itemColor,
            tempQuant === 0 && {
              color: 'white',
            },
          ]}>
          {tempQuant}
        </Text>
      </TouchableOpacity>
    );
  };

  const getSortedData = () => {
    let tempData = data
      .map(k => {
        return k.number;
      })
      .sort(function (a, b) {
        return a - b;
      })
      .map(k => {
        let m = data.filter(f => f.number === k);
        return m[0];
      });

    return tempData;
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
        Tag={'Manage My Store'}
      />
      <View
        style={[
          styles.itemWrapper,
          {
            marginTop: moderateScale(70),
          },
        ]}>
        <Text style={[styles.itemSideContainer, styles.itemHeaderStyle]}>
          Number
        </Text>
        <Text
          style={[
            styles.itemSideContainer,
            styles.itemHeaderStyle,
            styles.itemMiddleContainer,
          ]}>
          Name
        </Text>
        <Text style={[styles.itemSideContainer, styles.itemHeaderStyle]}>
          Stock
        </Text>
      </View>
      <FlatList
        data={getSortedData()}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingBottom: moderateScale(110),
        }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          data.length === 0 && (
            <Text style={styles.noPost}>No products to show</Text>
          )
        }
      />
      <AntDesign
        onPress={() => {
          navigation.navigate('CreateProduct');
        }}
        name="pluscircle"
        color="#2EC8B2"
        size={moderateScale(60)}
        style={styles.addProduct}
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
  itemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: moderateScale(50),
    backgroundColor: '#2EC8B2',
  },
  itemSideContainer: {
    color: 'white',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: moderateScale(16),
    width: (width / 100) * 25,
    fontFamily: Theme.fontFamily.Poppins_Regular,
  },
  itemMiddleContainer: {
    width: (width / 100) * 50,
    paddingLeft: moderateScale(20),
    textAlign: 'left',
  },
  itemHeaderStyle: {
    fontFamily: Theme.fontFamily.Poppins_SemiBold,
  },
  itemColor: {
    color: '#545659',
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
  addProduct: {
    bottom: moderateScale(40),
    position: 'absolute',
    right: (width / 100) * 5,
    backgroundColor: 'white',
    borderRadius: 100,
    elevation: moderateScale(5),
  },
});

export default ManageMyStore;
