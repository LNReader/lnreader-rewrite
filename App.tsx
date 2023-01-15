import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer, Theme } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import moment from 'moment';

import { useTheme, useDatabase } from '@hooks';
import MainNavigator from '@navigators/MainNavigator/MainNavigator';
import AppErrorBoundary from '@components/AppErrorBoundary/AppErrorBoundary';
import { LibraryProvider } from '@contexts/LibraryContext';
import { LoadingScreen } from '@lnreader/core';

moment.updateLocale('en', {
  calendar: {
    lastDay: '[Yesterday]',
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    lastWeek: '[Last] dddd',
    nextWeek: '[Next] dddd',
    sameElse: 'L',
  },
});

const App = () => {
  const { isDarkMode, theme } = useTheme();

  const { isDbCreated } = useDatabase();

  useEffect(() => {
    StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content');
  }, [isDarkMode]);

  if (!isDbCreated) {
    return <LoadingScreen />;
  }

  return (
    <GestureHandlerRootView style={styles.mainCtn}>
      <AppErrorBoundary>
        <NavigationContainer theme={{ colors: theme } as unknown as Theme}>
          <PaperProvider>
            <LibraryProvider>
              <StatusBar translucent backgroundColor="transparent" />
              <MainNavigator />
            </LibraryProvider>
          </PaperProvider>
        </NavigationContainer>
      </AppErrorBoundary>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  mainCtn: {
    flex: 1,
  },
});
