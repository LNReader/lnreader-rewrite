import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import BottomNavigator from 'navigators/BottomNavigator/BottomNavigator';

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
