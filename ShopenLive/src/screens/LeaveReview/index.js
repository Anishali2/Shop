import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import Theme from '../../Theme/Theme';
import {moderateScale} from '../../Theme/Dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Header} from '../../assets/Components/Header';

const {width, height} = Dimensions.get('window');

const LeaveReview = ({navigation}) => {
  const [star, setStar] = useState(0);
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

      <ScrollView
        contentContainerStyle={{
          paddingTop: moderateScale(70),
        }}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {[1, 2, 3, 4, 5].map((k, index) => {
            return (
              <AntDesign
                onPress={() => setStar(k)}
                name={star < k ? 'staro' : 'star'}
                size={width / 7}
                color="#FFFD54"
              />
            );
          })}
        </View>
        <TextInput
          placeholder="Have by leave...."
          multiline
          style={styles.inputField}
        />
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-forward"
          color="white"
          size={moderateScale(33)}
          style={{
            width: moderateScale(65),
            height: moderateScale(65),
            borderRadius: 100,
            backgroundColor: '#2FC8B3',
            alignSelf: 'center',
            textAlign: 'center',
            textAlignVertical: 'center',
            marginTop: height - moderateScale(500),
          }}
        />
      </ScrollView>
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
  inputField: {
    width: (width / 100) * 90,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: moderateScale(12),
    borderWidth: moderateScale(1),
    borderColor: '#9295A3',
    minHeight: moderateScale(200),
    marginTop: moderateScale(30),
    textAlignVertical: 'top',
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(15),
    color: 'black',
    fontFamily: Theme.fontFamily.Poppins_Regular,
    fontSize: moderateScale(12),
  },
});

export default LeaveReview;
