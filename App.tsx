import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer, Theme } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';

import { useTheme, useDatabase } from '@hooks';
import MainNavigator from '@navigators/MainNavigator/MainNavigator';
import AppErrorBoundary from '@components/AppErrorBoundary/AppErrorBoundary';
import { LibraryProvider } from '@contexts/LibraryContext';

const App = () => {
  const { isDarkMode, theme } = useTheme();

  useDatabase();

  useEffect(() => {
    StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content');
  }, [isDarkMode]);

  return (
    <AppErrorBoundary>
      <PaperProvider>
        <NavigationContainer theme={{ colors: theme } as unknown as Theme}>
          <LibraryProvider>
            <StatusBar translucent backgroundColor="transparent" />
            <MainNavigator />
          </LibraryProvider>
        </NavigationContainer>
      </PaperProvider>
    </AppErrorBoundary>
  );
};

export default App;
