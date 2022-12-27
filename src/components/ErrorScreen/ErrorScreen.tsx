import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@hooks';

import { Text } from '@lnreader/core';
import { Spacing } from '@theme/constants';

interface ErrorScreenProps {
  error?: Error;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ error, showErrorStack }) => {
  const { theme } = useTheme();

  return (
    <View style={styles.errorCtn}>
      <Text color={theme.onSurfaceVariant} size={44}>
        ಥ_ಥ
      </Text>
      <Text color={theme.onSurfaceVariant} style={styles.errorMsg}>
        {error?.message}
      </Text>
      {showErrorStack && error?.stack && (
        <View
          style={[styles.errorStackCtn, { backgroundColor: theme.surface2 }]}
        >
          <Text numberOfLines={10} color={theme.onSurfaceVariant}>
            {error.stack}
          </Text>
        </View>
      )}
    </View>
  );
};

export default ErrorScreen;

const styles = StyleSheet.create({
  errorCtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMsg: {
    marginTop: Spacing.M,
    paddingHorizontal: Spacing.M,
    textAlign: 'center',
  },
  errorStackCtn: {
    borderRadius: 8,
    lineHeight: 20,
    margin: 16,
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
});
