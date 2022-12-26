import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {useTheme} from 'hooks/useTheme';
import {SourceChapter} from 'sources/types';

import {IconButton, Text, Row} from 'components/index';
import {Spacing} from 'theme/constants';

type Props = {
  visible: boolean;
  chapter?: SourceChapter;
  novelName: string;
};

const ReaderFooter = (props: Props) => {
  const {theme} = useTheme();
  const {bottom: paddingBottom} = useSafeAreaInsets();

  if (!props.visible) {
    return null;
  }

  return (
    <Animated.View
      entering={FadeIn.duration(500)}
      exiting={FadeOut.duration(500)}
      style={[
        styles.appbarCtn,
        {backgroundColor: theme.surface2, paddingBottom},
      ]}>
      <View style={styles.contentCtn}>
        <Pressable
          style={styles.iconCtn}
          android_ripple={{
            color: theme.rippleColor,
            borderless: true,
            radius: 50,
          }}>
          <Icon name="chevron-left" size={24} color={theme.onSurface} />
        </Pressable>
        <Pressable
          style={styles.iconCtn}
          android_ripple={{
            color: theme.rippleColor,
            borderless: true,
            radius: 50,
          }}>
          <Icon name="chevron-right" size={24} color={theme.onSurface} />
        </Pressable>
      </View>
    </Animated.View>
  );
};

export default ReaderFooter;

const styles = StyleSheet.create({
  appbarCtn: {
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 4,
  },
  contentCtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  iconCtn: {
    padding: 32,
    paddingVertical: 16,
  },
});
