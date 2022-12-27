import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { List, Appbar } from '@lnreader/core';
import { useTheme } from '@hooks';
import { Spacing } from '@theme/constants';

interface Props {
  showBackAction?: boolean;
  title?: string;
}

const IconAppbar: React.FC<Props> = ({ showBackAction, title }) => {
  const { theme } = useTheme();
  const { top: marginTop } = useSafeAreaInsets();

  return (
    <>
      {showBackAction && title ? <Appbar title={title} mode="small" /> : null}
      <View style={[styles.iconCtn, !showBackAction && { marginTop }]}>
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
