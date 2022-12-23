import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import MainNavigator from 'navigators/MainNavigator/MainNavigator';
import AppErrorBoundary from 'components/AppErrorBoundary/AppErrorBoundary';

const App = () => {
  return (
    <AppErrorBoundary>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </AppErrorBoundary>
  );
};

export default App;
