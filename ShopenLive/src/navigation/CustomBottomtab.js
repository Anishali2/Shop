import React from 'react';
import {View, Text, TouchableOpacity, Dimensions, Image} from 'react-native';
import {moderateScale} from '../Theme/Dimensions';
import {Svg, Defs, Circle, ClipPath, G, Rect} from 'react-native-svg';

const {width} = Dimensions.get('window');

const TabBar = props => {
  const {index, routes} = props.state;

  const data = [
    {
      no: 0,
      selected: require('../assets/images/homeU.png'),
      unselected: require('../assets/images/home.png'),
    },
    {
      no: 1,
      selected: require('../assets/images/AlarmU.png'),
      unselected: require('../assets/images/Alarm.png'),
    },
    {
      no: 4,
    },
    {
      no: 2,
      selected: require('../assets/images/letter.png'),
      unselected: require('../assets/images/letterU.png'),
    },
    {
      no: 3,
      selected: require('../assets/images/Person.png'),
      unselected: require('../assets/images/personU.png'),
    },
  ];

  return (
    <>
      <View
        background={true}
        style={{
          width: width,
          height: moderateScale(65),
          alignSelf: 'center',
          position: 'absolute',
          bottom: moderateScale(10),
          borderRadius: moderateScale(20),
          justifyContent: 'flex-end',
          alignItems: 'center',
          backgroundColor: 'tranparent',
          paddingLeft: moderateScale(1),
        }}>
        <Svg
          height={`${moderateScale(60)}`}
          width={`${(width / 100) * 96}`}
          style={{
            borderRadius: moderateScale(16),
            elevation: moderateScale(25),
          }}>
          <Defs>
            <ClipPath id="clip">
              <G scale="1" x="0">
                <Circle
                  cx={`${(width / 100) * 50 - width / 46}`}
                  cy={`${moderateScale(5)}`}
                  r={`${moderateScale(38)}`}
                />
                <Rect
                  x="0"
                  y="0"
                  width={`${(width / 100) * 96}`}
                  height={`${moderateScale(60)}`}
                />
              </G>
            </ClipPath>
          </Defs>
          <Rect
            width={`${(width / 100) * 95.5}`}
            rx={`${moderateScale(16)}`}
            height={`${moderateScale(60)}`}
            fill="white"
            clipPath="url(#clip)"></Rect>
        </Svg>
      </View>
      <View
        style={{
          width: (width / 100) * 97,
          height: moderateScale(65),
          alignSelf: 'center',
          position: 'absolute',
          bottom: moderateScale(10),
          borderRadius: moderateScale(20),
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'tranparent',
          flexDirection: 'row',
        }}>
        {routes.map((route, routeIndex) => {
          return (
            <TouchableOpacity
              key={routeIndex}
              activeOpacity={1}
              disabled={routeIndex !== 2 ? false : true}
              onPress={() => {
                props.navigation.navigate(route);
              }}
              style={{
                width: '20%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {routeIndex !== 2 && (
                <Image
                  style={{
                    width: '50%',
                    height: '50%',
                    resizeMode: 'contain',
                  }}
                  source={
                    routeIndex === index
                      ? data[routeIndex].selected
                      : data[routeIndex].unselected
                  }
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          props.navigation.navigate(routes[2]);
        }}
        style={{
          width: moderateScale(67),
          height: moderateScale(67),
          borderRadius: 100,
          backgroundColor: '#2FC8B3',
          position: 'absolute',
          overflow: 'hidden',
          bottom: moderateScale(31),
          alignSelf: 'center',
          borderWidth: 2,
          borderColor: 'white',
          elevation: moderateScale(10),
          zIndex: 2,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../assets/images/liveU.png')}
          style={{
            width: moderateScale(50),
            height: moderateScale(25),
            resizeMode: 'contain',
          }}
        />
        <Text
          style={{
            color: 'white',
            fontFamily: Theme.fontFamily.Poppins_SemiBold,
            fontSize: width / 40,
          }}>
          LIVE
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default TabBar;
