import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import RoleScreen from '../screens/RoleSelection';
import Login from '../screens/login';
import Signup from '../screens/Signup';
import CreateProfile from '../screens/CreateProfile';
import Success from '../screens/Signup/Success';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="RoleScreen" component={RoleScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="CreateProfile" component={CreateProfile} />
      <Stack.Screen name="Success" component={Success} />
    </Stack.Navigator>
  );
};

export default AuthStack;
