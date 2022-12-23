import React from 'react';
import {Button, Text, View} from 'react-native';
import ErrorBoundary from 'react-native-error-boundary';

interface ErrorFallbackProps {
  error: Error;
  resetError: () => void;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetError,
}) => {
  return (
    <View>
      <Text>An Unexpected Error Happened</Text>
      <Text>
        The application ran into an unexpected error. We suggest you screenshot
        this message and then share it in our support channel on Discord.
      </Text>
      <Text>{error.message}</Text>
      <Button onPress={resetError} title={'Restart the application'} />
    </View>
  );
};

interface AppErrorBoundaryProps {
  children: React.ReactNode | React.ReactElement;
}

const AppErrorBoundary: React.FC<AppErrorBoundaryProps> = ({children}) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
  );
};

export default AppErrorBoundary;
