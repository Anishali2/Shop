import React, {useState, useRef} from 'react';
import Image from 'react-native-scalable-image';
import {View, Dimensions} from 'react-native';
import {moderateScale} from '../../Theme/Dimensions';
import SwiperFlatList from 'react-native-swiper-flatlist';
import Entypo from 'react-native-vector-icons/Entypo';

const {width, height} = Dimensions.get('window');

const ScalableImage = ({source, close}) => {
  const [currentIndex, setCurrentIndex] = useState({index: 0});
  const swipe = useRef();

  return (
    <View
      style={{
        flex: 1,
      }}>
      <Entypo
        onPress={() => {
          if (currentIndex.index !== 0) {
            swipe.current.scrollToIndex({
              index: currentIndex.index - 1,
              animated: true,
            });
          }
        }}
        style={{
          width: moderateScale(60),
          height: moderateScale(50),
          backgroundColor: currentIndex.index === 0 ? 'transparent' : '#2EC8B2',
          textAlignVertical: 'center',
          paddingLeft: moderateScale(10),
          position: 'absolute',
          top: height / 2 - moderateScale(25),
          left: 0,
          zIndex: 1,
        }}
        name="chevron-left"
        color={currentIndex.index === 0 ? 'transparent' : 'white'}
        size={moderateScale(28)}
      />
      <Entypo
        onPress={() => {
          if (currentIndex.index + 1 !== source.length) {
            swipe.current.scrollToIndex({
              index: currentIndex.index + 1,
              animated: true,
            });
          }
        }}
        style={{
          width: moderateScale(60),
          height: moderateScale(50),
          backgroundColor:
            currentIndex.index + 1 === source.length
              ? 'transparent'
              : '#2EC8B2',
          textAlignVertical: 'center',
          paddingRight: moderateScale(10),
          textAlign: 'right',
          paddingLeft: moderateScale(10),
          position: 'absolute',
          top: height / 2 - moderateScale(25),
          right: 0,
          zIndex: 1,
        }}
        name="chevron-right"
        color={
          currentIndex.index + 1 === source.length ? 'transparent' : 'white'
        }
        size={moderateScale(28)}
      />

      <Entypo
        name="squared-cross"
        color={'white'}
        size={moderateScale(22)}
        onPress={() => close.current.close()}
        style={{
          position: 'absolute',
          zIndex: 1,
          backgroundColor: '#2EC8B2',
          padding: moderateScale(5),
          borderRadius: moderateScale(10),
          right: (width / 100) * 5,
          top: (width / 100) * 5,
          width: moderateScale(40),
          height: moderateScale(40),
          textAlign: 'center',
          textAlignVertical: 'center',
        }}
      />

      <SwiperFlatList
        ref={swipe}
        data={source}
        showPagination={true}
        paginationActiveColor={'#2EC8B2'}
        paginationDefaultColor={'grey'}
        onChangeIndex={setCurrentIndex}
        paginationStyle={{
          marginBottom: moderateScale(50),
        }}
        renderItem={item => {
          return (
            <View
              style={{
                width: width,
                alignItems: 'center',
                height: height,
                justifyContent: 'center',
              }}>
              <Image source={{uri: item.item}} width={width} height={height} />
            </View>
          );
        }}
      />
    </View>
  );
};

export {ScalableImage};
