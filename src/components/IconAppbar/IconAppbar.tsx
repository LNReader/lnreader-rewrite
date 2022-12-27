import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { List } from '@lnreader/core';
import { useTheme } from '@hooks';
import { Spacing } from '@theme/constants';

const IconAppbar: React.FC = () => {
  const { theme } = useTheme();
  const { top: marginTop } = useSafeAreaInsets();

  return (
    <>
      <View style={[styles.iconCtn, { marginTop }]}>
        <Image
          source={require('../../../assets/logo.png')}
          style={[styles.logo, { tintColor: theme.onSurface }]}
        />
      </View>
      <List.Divider />
    </>
  );
};

export default IconAppbar;

const styles = StyleSheet.create({
  iconCtn: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.HUGE,
  },
  logo: {
    height: 80,
    width: 80,
  },
});
