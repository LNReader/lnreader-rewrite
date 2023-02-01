import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import { useTheme } from '@hooks';

const LoadingMoreIndicator: React.FC = () => {
  const { theme } = useTheme();

  return (
    <ActivityIndicator color={theme.primary} style={styles.indicatorCtn} />
  );
};

export default LoadingMoreIndicator;

const styles = StyleSheet.create({
  indicatorCtn: {
    padding: 32,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
