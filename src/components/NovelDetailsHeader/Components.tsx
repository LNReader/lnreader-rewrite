import React, {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import FastImage, {FastImageProps} from 'react-native-fast-image';
import {LinearGradient} from 'expo-linear-gradient';
import {easeGradient} from 'react-native-easing-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Text, Row} from 'components/index';
import {useTheme} from 'hooks/useTheme';
import Color from 'color';
import {DatabaseNovel} from 'database/types';
import {Spacing} from 'theme/constants';
import {useNovelDetailsContext} from 'contexts/NovelDetailsContext';

export const CoverImage: React.FC<FastImageProps> = props => {
  const {theme} = useTheme();

  const {colors, locations} = easeGradient({
    colorStops: {
      0: {color: 'rgba(0,0,0,0)'},
      1: {color: theme.background},
    },
  });

  return (
    <FastImage {...props}>
      <View
        style={[
          styles.coverCtn,
          {
            backgroundColor: Color(theme.background).alpha(0.7).toString(),
          },
        ]}>
        <LinearGradient
          colors={colors}
          locations={locations}
          style={styles.linearGradient}>
          {props.children}
        </LinearGradient>
      </View>
    </FastImage>
  );
};

export const SubHeader: React.FC = () => {
  const {theme} = useTheme();
  const {novel, handleSetNovelFavorite} = useNovelDetailsContext();

  const followBtnColor = novel.favorite
    ? theme.primary
    : theme.onSurfaceVariant;

  return (
    <Row style={styles.subHeaderCtn}>
      <View style={styles.buttonWrapper}>
        <Pressable
          android_ripple={{color: theme.rippleColor}}
          style={styles.buttonCtn}
          onPress={() => {
            handleSetNovelFavorite(!novel.favorite);
          }}>
          <Icon
            name={novel.favorite ? 'heart' : 'heart-outline'}
            color={followBtnColor}
            size={24}
          />
          <Text size={12} style={styles.label} color={followBtnColor}>
            {novel.favorite ? 'In library' : 'Add to library'}
          </Text>
        </Pressable>
      </View>
      <View style={styles.buttonWrapper}>
        <Pressable
          android_ripple={{color: theme.rippleColor}}
          style={styles.buttonCtn}>
          <Icon name="earth" color={theme.outline} size={24} />
          <Text size={12} style={styles.label} color={theme.outline}>
            {'WebView'}
          </Text>
        </Pressable>
      </View>
    </Row>
  );
};

const styles = StyleSheet.create({
  subHeaderCtn: {
    justifyContent: 'space-around',
    paddingHorizontal: Spacing.M,
  },
  coverCtn: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
    paddingTop: 72,
  },
  buttonCtn: {
    paddingHorizontal: Spacing.M,
    paddingVertical: Spacing.S,
    alignItems: 'center',
  },
  buttonWrapper: {
    flex: 1,
    borderRadius: 50,
    overflow: 'hidden',
  },
  label: {
    marginTop: Spacing.XS,
  },
});
