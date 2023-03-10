import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import { useTheme } from '@hooks';

interface LoadingScreenProps {
  backgroundColor?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ backgroundColor }) => {
  const { theme } = useTheme();

  return (
    <ActivityIndicator
      size={50}
      color={theme.primary}
      style={[styles.spinner, { backgroundColor }]}
    />
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
