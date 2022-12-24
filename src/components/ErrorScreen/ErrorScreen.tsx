import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from 'hooks/useTheme';

import {Text} from 'components/index';
import {Spacing} from 'theme/constants';

interface ErrorScreenProps {
  error?: string;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({error}) => {
  const {theme} = useTheme();

  return (
    <View style={styles.errorCtn}>
      <Text color={theme.onSurfaceVariant} size={44}>
        ಥ_ಥ
      </Text>
      <Text color={theme.onSurfaceVariant} style={styles.errorMsg}>
        {error}
      </Text>
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
});
