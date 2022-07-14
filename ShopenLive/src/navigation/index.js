import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import AuthStack from './AuthStack';
import BottomTab from './BottomTab';
import ConversationScreen from '../screens/MessageScreen/ConversationScreen';
import Followers from '../screens/Followers';
import BecomeSeller from '../screens/BecomeSeller';
import WelcomeSeller from '../screens/WelcomeSeller';
import OtherProfile from '../screens/OtherProfile';
import ReviewScreen from '../screens/ReviewScreen';
import LeaveReview from '../screens/LeaveReview';
import EditProfile from '../screens/ProfileScreen/EditProfile';
import SettingsScreen from '../screens/SettingScreen';
import ManageMyStore from '../screens/ManageMyStore';
import CreateProduct from '../screens/ManageMyStore/CreateProduct';
import ModifyProduct from '../screens/ManageMyStore/ModifyProduct';

import {useSelector, useDispatch} from 'react-redux';
import {
  handleGetMessagesTicket,
  handleGetNotifications,
  saveMsg,
  saveNotification,
} from '../redux/actions/home';
import LiveRoom from '../screens/LiveRoom';
import PurchaseSummary from '../screens/PurchaseSummary';
import PaymentScreen from '../screens/BecomeSeller/PaymentScreen';
import WatchRoom from '../screens/LiveRoom/WatchRoom';
import BlockedScreen from '../screens/BlockedScreen';

const Stack = createNativeStackNavigator();

const MainNav = () => {
  const {loggedIn, uid, call, type} = useSelector(state => state.auth);
  const {screenFocused} = useSelector(state => state.home);
  const {conversations} = useSelector(state => state.home);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      loggedIn === true &&
      call === true &&
      screenFocused !== 'WatchRoom' &&
      screenFocused !== 'LiveRoom'
    ) {
      handleCallApi();
    }
  });

  const handleCallApi = () => {
    setTimeout(() => {
      var formdata = new FormData();
      formdata.append('__api_key__', 'secret key');
      if (type === 1) {
        formdata.append('buyer_uid', uid);
      } else {
        formdata.append('seller_uid', uid);
      }
      dispatch(handleGetMessagesTicket(formdata, onSuccess, onError, type));
    }, 3000);
  };

  const onSuccess = res => {
    dispatch(saveMsg(res));
    var formdata = new FormData();
    formdata.append('__api_key__', 'secret key');
    if (type === 1) {
      formdata.append('buyer_uid', uid);
    } else {
      formdata.append('seller_uid', uid);
    }
    dispatch(
      handleGetNotifications(
        formdata,
        onSuccessNotification,
        onErrorNotification,
        type,
      ),
    );
  };

  const onSuccessNotification = res => {
    dispatch(saveNotification(res));
  };

  const onErrorNotification = err => {
    console.log(err);
  };

  const onError = err => {
    console.log(err);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="BottomTab" component={BottomTab} />
        <Stack.Screen
          name="ConversationScreen"
          component={ConversationScreen}
        />
        <Stack.Screen name="Followers" component={Followers} />
        <Stack.Screen name="BecomeSeller" component={BecomeSeller} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
        <Stack.Screen name="WelcomeSeller" component={WelcomeSeller} />
        <Stack.Screen name="OtherProfile" component={OtherProfile} />
        <Stack.Screen name="ReviewScreen" component={ReviewScreen} />
        <Stack.Screen name="LeaveReview" component={LeaveReview} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="ManageMyStore" component={ManageMyStore} />
        <Stack.Screen name="CreateProduct" component={CreateProduct} />
        <Stack.Screen name="ModifyProduct" component={ModifyProduct} />
        <Stack.Screen name="LiveRoom" component={LiveRoom} />
        <Stack.Screen name="PurchaseSummary" component={PurchaseSummary} />
        <Stack.Screen name="WatchRoom" component={WatchRoom} />
        <Stack.Screen name="BlockedScreen" component={BlockedScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNav;
