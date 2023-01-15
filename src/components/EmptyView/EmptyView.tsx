import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useTheme } from '@hooks';
import { Text } from '@lnreader/core';

type Props = {
  icon?: string;
  description?: string;
};

const EmptyView: React.FC<Props> = ({
  icon = '(˘･_･˘)',
  description = 'No results found',
}) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      {icon ? (
        <Text size={40} fontWeight="bold" color={theme.onSurfaceVariant}>
          {icon}
        </Text>
      ) : null}
      <Text style={styles.descCtn} padding={16} color={theme.onSurfaceVariant}>
        {description}
      </Text>
    </View>
  );
};

export default EmptyView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  descCtn: {
    textAlign: 'center',
  },
});
