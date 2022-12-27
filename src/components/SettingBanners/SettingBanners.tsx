import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import Animated, { SlideInUp, SlideOutUp } from 'react-native-reanimated';
import { defaultTo } from 'lodash';

import { Text } from '@lnreader/core';
import { useAppSettings, useTheme } from '@hooks';

const SettingBanners = () => {
  const { theme } = useTheme();
  const { INCOGNITO_MODE, DOWNLOADED_ONLY_MODE } = useAppSettings();

  return (
    <>
      {DOWNLOADED_ONLY_MODE && (
        <Animated.View
          style={[styles.bannerCtn, { backgroundColor: theme.tertiary }]}
          entering={SlideInUp.duration(200)}
          exiting={SlideOutUp.duration(200)}
        >
          <Text size={12} color={theme.onTertiary} fontWeight="bold">
            Downloaded only
          </Text>
        </Animated.View>
      )}
      {INCOGNITO_MODE && (
        <Animated.View
          style={[
            styles.bannerCtn,
            { backgroundColor: theme.primary },
            DOWNLOADED_ONLY_MODE && styles.temp,
          ]}
          entering={SlideInUp.duration(200)}
          exiting={SlideOutUp.duration(200)}
        >
          <Text size={12} color={theme.onPrimary} fontWeight="bold">
            Incognito Mode
          </Text>
        </Animated.View>
      )}
    </>
  );
};

export default SettingBanners;

const styles = StyleSheet.create({
  bannerCtn: {
    paddingTop: defaultTo(StatusBar.currentHeight, 0) + 4,
    paddingBottom: 4,
    alignItems: 'center',
  },
  temp: {
    paddingTop: 4,
  },
});
