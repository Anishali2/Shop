import React from 'react';
import {View, Text, FlatList, Dimensions, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Theme from '../../Theme/Theme';
import {moderateScale} from '../../Theme/Dimensions';
import {Header} from '../../assets/Components/Header';

const {width, height} = Dimensions.get('window');

const data = [
  {
    title: 'FAZ Sam',
    item: [
      {
        name: 'ladies shirts',
        size: 'M',
        qty: '3',
        color: 'C4C4C4',
        price: '30',
      },
      {
        name: 'ladies summer collection',
        size: 'M',
        qty: '3',
        color: 'F83C3B',
        price: '30',
      },
      {
        name: 'ladies summer',
        size: 'M',
        qty: '3',
        color: 'F83C3B',
        price: '300',
      },
    ],
  },
  {
    title: 'Haroon Store',
    item: [
      {
        name: 'ladies shirts',
        size: 'M',
        qty: '3',
        color: 'C4C4C4',
        price: '30',
      },
      {
        name: 'ladies summer collection',
        size: 'M',
        qty: '3',
        color: 'F83C3B',
        price: '30',
      },
    ],
  },
];

const salesSummaryData = [
  {
    date: '6/19/2022',
    item: [
      {
        title: 'FAZ Sam',
        item: [
          {
            name: 'ladies shirts',
            size: 'M',
            qty: '3',
            color: 'C4C4C4',
            price: '30',
          },
          {
            name: 'ladies summer collection',
            size: 'M',
            qty: '3',
            color: 'F83C3B',
            price: '30',
          },
          {
            name: 'ladies summer',
            size: 'M',
            qty: '3',
            color: 'F83C3B',
            price: '300',
          },
        ],
      },
      {
        title: 'FAZ Sam',
        item: [
          {
            name: 'ladies shirts',
            size: 'M',
            qty: '3',
            color: 'C4C4C4',
            price: '30',
          },
          {
            name: 'ladies summer collection',
            size: 'M',
            qty: '3',
            color: 'F83C3B',
            price: '30',
          },
          {
            name: 'ladies summer',
            size: 'M',
            qty: '3',
            color: 'F83C3B',
            price: '300',
          },
        ],
      },
      {
        title: 'Haroon Store',
        item: [
          {
            name: 'ladies shirts',
            size: 'M',
            qty: '3',
            color: 'C4C4C4',
            price: '30',
          },
          {
            name: 'ladies summer collection',
            size: 'M',
            qty: '3',
            color: 'F83C3B',
            price: '30',
          },
        ],
      },
    ],
  },
  {
    date: '6/19/2022',
    item: [
      {
        title: 'FAZ Sam',
        item: [
          {
            name: 'ladies shirts',
            size: 'M',
            qty: '3',
            color: 'C4C4C4',
            price: '30',
          },
          {
            name: 'ladies summer collection',
            size: 'M',
            qty: '3',
            color: 'F83C3B',
            price: '30',
          },
          {
            name: 'ladies summer',
            size: 'M',
            qty: '3',
            color: 'F83C3B',
            price: '300',
          },
        ],
      },
      {
        title: 'Haroon Store',
        item: [
          {
            name: 'ladies shirts',
            size: 'M',
            qty: '3',
            color: 'C4C4C4',
            price: '30',
          },
          {
            name: 'ladies summer collection',
            size: 'M',
            qty: '3',
            color: 'F83C3B',
            price: '30',
          },
        ],
      },
    ],
  },
];

const totaLive = () => {
  let grandTotal = 0;
  for (let i = 0; i < salesSummaryData.length; i++) {
    for (let k = 0; k < salesSummaryData[i].item.length; k++) {
      grandTotal = grandTotal + totalPrice(salesSummaryData[i].item[k].item);
    }
  }
  return grandTotal;
};

const totalPrice = item => {
  let totalPrice = 0;
  for (let i = 0; i < item.length; i++) {
    totalPrice = totalPrice + parseInt(item[i].price);
  }
  return totalPrice;
};

const subRenderItem = ({item, index}) => {
  return (
    <View style={styles.subContainer}>
      <Text
        style={[
          styles.itemSideContainer,
          styles.sideContainer,
          {
            color: 'black',
            width: (width / 100) * 30 - moderateScale(10),
            textAlign: 'left',
          },
        ]}>
        {item.name}
      </Text>
      <Text style={[styles.itemSideContainer, styles.subItemTextStyle]}>
        {item.size}
      </Text>
      <Text style={[styles.itemSideContainer, styles.subItemTextStyle]}>
        {item.qty}
      </Text>
      <View
        style={{
          width: (width / 100) * 15,
          alignItems: 'center',
        }}>
        <View
          style={[
            styles.subItemColor,
            {
              backgroundColor: `#${item.color}`,
            },
          ]}
        />
      </View>
      <Text
        style={[
          styles.itemSideContainer,
          styles.subItemTextStyle,
          {
            width: (width / 100) * 15 - moderateScale(10),
          },
        ]}>
        {item.price}$
      </Text>
    </View>
  );
};

const renderItem = ({item, index}) => {
  return (
    <View
      style={{
        width: width,
      }}>
      <Text style={styles.storeName}>{item.title}</Text>
      <View style={styles.cardContaier}>
        <FlatList
          data={item.item}
          renderItem={subRenderItem}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: moderateScale(5),
              }}
            />
          )}
        />
        <View
          style={{
            height: moderateScale(1),
            backgroundColor: '#2FC8B3',
            width: (width / 100) * 90 - moderateScale(20),
            alignSelf: 'center',
            marginTop: moderateScale(5),
          }}
        />
        <Text style={styles.totalAmount}>
          Total{'\t\t\t\t'}
          {totalPrice(item.item)}$
        </Text>
      </View>
    </View>
  );
};

const salesRenderItem = ({item, index}) => {
  return (
    <View
      style={{
        width: width,
      }}>
      <Text
        style={{
          fontSize: moderateScale(16),
          fontFamily: Theme.fontFamily.Poppins_Medium,
          color: 'black',
          marginLeft: (width / 100) * 5,
        }}>
        {item.date}
      </Text>
      <FlatList
        data={item.item}
        renderItem={renderItem}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: moderateScale(20),
            }}
          />
        )}
      />
    </View>
  );
};

const PurchaseSummary = ({navigation, route}) => {
  const {path} = route.params;
  return (
    <View style={styles.mainContainer}>
      <Header
        Tag={`${path} Summary`}
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
      />
      <View
        style={[
          styles.itemWrapper,
          {
            marginTop: moderateScale(70),
          },
        ]}>
        <Text
          style={[
            styles.itemSideContainer,
            styles.itemHeaderStyle,
            styles.sideContainer,
          ]}>
          Product
        </Text>
        <Text style={[styles.itemSideContainer, styles.itemHeaderStyle]}>
          Size
        </Text>
        <Text style={[styles.itemSideContainer, styles.itemHeaderStyle]}>
          Qty.
        </Text>
        <Text style={[styles.itemSideContainer, styles.itemHeaderStyle]}>
          Color
        </Text>
        <Text style={[styles.itemSideContainer, styles.itemHeaderStyle]}>
          Price
        </Text>
      </View>
      <FlatList
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: moderateScale(20),
            }}
          />
        )}
        data={path === 'Purchase' ? data : salesSummaryData}
        renderItem={path === 'Purchase' ? renderItem : salesRenderItem}
        contentContainerStyle={{
          paddingBottom: moderateScale(100),
          paddingTop: moderateScale(20),
        }}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => {
          return path === 'Sales' ? (
            <Text
              style={[
                styles.totalAmount,
                {
                  marginRight: (width / 100) * 5,
                },
              ]}>
              Total Live{'\t\t\t\t'}
              {totaLive()}$
            </Text>
          ) : null;
        }}
      />
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
    justifyContent: 'center',
    height: moderateScale(50),
    backgroundColor: '#2EC8B2',
  },
  itemHeaderStyle: {
    fontFamily: Theme.fontFamily.Poppins_Medium,
  },
  itemColor: {
    color: '#545659',
  },
  itemSideContainer: {
    color: 'white',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: moderateScale(14),
    width: (width / 100) * 15,
    fontFamily: Theme.fontFamily.Poppins_Regular,
  },
  sideContainer: {
    width: (width / 100) * 30,
  },
  storeName: {
    color: 'white',
    fontSize: moderateScale(12),
    fontFamily: Theme.fontFamily.Poppins_SemiBold,
    backgroundColor: '#2FC8B3',
    borderTopRightRadius: moderateScale(10),
    borderBottomRightRadius: moderateScale(10),
    alignSelf: 'flex-start',
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(3),
    position: 'absolute',
    zIndex: 100,
  },
  cardContaier: {
    borderRadius: moderateScale(20),
    borderColor: '#9295A3',
    borderWidth: moderateScale(1),
    width: (width / 100) * 90,
    alignSelf: 'center',
    paddingTop: moderateScale(50),
    backgroundColor: 'white',
    elevation: moderateScale(5),
    paddingBottom: moderateScale(15),
    marginTop: moderateScale(12),
  },
  totalAmount: {
    color: 'black',
    fontSize: moderateScale(16),
    fontFamily: Theme.fontFamily.Poppins_SemiBold,
    textAlign: 'right',
    paddingRight: moderateScale(10),
    marginTop: moderateScale(15),
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: moderateScale(10),
  },
  subItemTextStyle: {
    color: 'black',
    fontFamily: Theme.fontFamily.Poppins_SemiBold,
  },
  subItemColor: {
    borderRadius: 100,
    width: moderateScale(20),
    height: moderateScale(20),
    borderWidth: moderateScale(1),
    borderColor: 'white',
    elevation: moderateScale(2),
  },
});

export default PurchaseSummary;
