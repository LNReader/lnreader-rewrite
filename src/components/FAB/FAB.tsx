import React from 'react';
import { StyleSheet } from 'react-native';
import { FAB as PaperFAB, FABProps as PaperFABProps } from 'react-native-paper';

import { useTheme } from '@hooks';

interface FABProps extends Omit<PaperFABProps, 'theme'> {}

const FAB: React.FC<FABProps> = props => {
  const { theme } = useTheme();

  return (
    <PaperFAB
      style={[styles.fab, { backgroundColor: theme.primary }]}
      color={theme.onPrimary}
      uppercase={false}
      {...props}
    />
  );
};

export default FAB;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 16,
  },
});
