import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import BottomNavigator from 'navigators/BottomNavigator/BottomNavigator';
import SourceScreen from 'screens/SourceScreen/SourceScreen';
import NovelDetailsScreen from 'screens/NovelDetailsScreen/NovelDetailsScreen';

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
      <Stack.Screen name="SourceScreen" component={SourceScreen} />
      <Stack.Screen name="NovelDetailsScreen" component={NovelDetailsScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
