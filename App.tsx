import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import MainNavigator from 'navigators/MainNavigator/MainNavigator';
import AppErrorBoundary from 'components/AppErrorBoundary/AppErrorBoundary';
import {useTheme} from 'hooks/useTheme';
import useDatabase from 'hooks/useDatabase';

const App = () => {
  const {isDarkMode} = useTheme();

  useDatabase();

  useEffect(() => {
    StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content');
  }, [isDarkMode]);

  return (
    <AppErrorBoundary>
      <NavigationContainer>
        <StatusBar translucent backgroundColor="transparent" />
        <MainNavigator />
      </NavigationContainer>
    </AppErrorBoundary>
  );
};

export default App;
