import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useTheme} from 'hooks/useTheme';

import {Text} from 'components/index';

type Props = {
  icon?: string;
  description?: string;
};

const EmptyView: React.FC<Props> = ({
  icon = '(˘･_･˘)',
  description = 'No results found',
}) => {
  const {theme} = useTheme();

  return (
    <View style={styles.container}>
      {icon ? (
        <Text size={40} fontWeight="bold" color={theme.onSurfaceVariant}>
          {icon}
        </Text>
      ) : null}
      <Text padding={16} color={theme.onSurfaceVariant}>
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
});
