import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import ErrorBoundary from 'react-native-error-boundary';

import { Text, Button, List } from '@lnreader/core';
import { useTheme } from '@hooks';

interface ErrorFallbackProps {
  error: Error;
  resetError: () => void;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetError,
}) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.mainCtn, { backgroundColor: theme.background }]}>
      <StatusBar backgroundColor={theme.background} />
      <View style={styles.errorInfoCtn}>
        <Text size={20} style={styles.errorTitle}>
          An Unexpected Error Ocurred
        </Text>
        <Text style={styles.errorDesc}>
          The application ran into an unexpected error. We suggest you
          screenshot this message and then share it in our support channel on
          Discord.
        </Text>
        <Text
          color={theme.onSurfaceVariant}
          style={[styles.errorCtn, { backgroundColor: theme.surface2 }]}
          numberOfLines={20}
        >
          {`${error.message}\n\n${error.stack}`}
        </Text>
      </View>
      <List.Divider />
      <Button
        mode="contained"
        onPress={resetError}
        title={'Restart the application'}
        style={[styles.buttonCtn]}
      />
    </View>
  );
};

interface AppErrorBoundaryProps {
  children: React.ReactNode | React.ReactElement;
}

const AppErrorBoundary: React.FC<AppErrorBoundaryProps> = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
  );
};

export default AppErrorBoundary;

const styles = StyleSheet.create({
  mainCtn: {
    flex: 1,
  },
  errorInfoCtn: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  buttonCtn: {
    margin: 16,
    marginBottom: 32,
  },
  errorTitle: {
    marginBottom: 8,
    textAlign: 'center',
  },
  errorDesc: {
    lineHeight: 20,
    marginVertical: 8,
  },
  errorCtn: {
    borderRadius: 8,
    lineHeight: 20,
    marginVertical: 16,
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
});
