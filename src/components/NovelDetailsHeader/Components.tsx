import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image';
import { LinearGradient } from 'expo-linear-gradient';
import { easeGradient } from 'react-native-easing-gradient';
import * as WebBrowser from 'expo-web-browser';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Text, Row, IconButton, Chip } from '@lnreader/core';
import { useBoolean, useTheme } from '@hooks';
import Color from 'color';
import { Spacing } from '@theme/constants';
import { useNovelDetailsContext } from '@contexts/NovelDetailsContext';
import { defaultTo } from 'lodash';
import { useLibraryContext } from '@contexts/LibraryContext';
import { useNavigation } from '@react-navigation/native';
import SetCategoriesModal from '@components/SetCategoriesModal/SetCategoriesModal';
import { DEFAULT_CATEGORIES } from '@database/constants';

export const CoverImage: React.FC<FastImageProps> = props => {
  const { theme } = useTheme();

  const { colors, locations } = easeGradient({
    colorStops: {
      0: { color: 'rgba(0,0,0,0)' },
      1: { color: theme.background },
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
        ]}
      >
        <LinearGradient
          colors={colors}
          locations={locations}
          style={styles.linearGradient}
        >
          {props.children}
        </LinearGradient>
      </View>
    </FastImage>
  );
};

export const SubHeader: React.FC = () => {
  const { theme } = useTheme();
  const { navigate } = useNavigation();
  const { novel, handleSetNovelFavorite, loading } = useNovelDetailsContext();
  const { refetch: refetchLibrary } = useLibraryContext();

  const setCategoriesModalState = useBoolean();

  const followBtnColor = loading
    ? theme.onSurfaceDisabled
    : novel.favorite
    ? theme.primary
    : theme.onSurfaceVariant;

  return (
    <>
      <Row style={styles.subHeaderCtn}>
        <View style={styles.buttonWrapper}>
          <Pressable
            android_ripple={{ color: theme.rippleColor }}
            style={styles.buttonCtn}
            onPress={() => {
              handleSetNovelFavorite(!novel.favorite);
              refetchLibrary();
            }}
            onLongPress={setCategoriesModalState.setTrue}
            disabled={loading}
          >
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
            android_ripple={{ color: theme.rippleColor }}
            style={styles.buttonCtn}
            onPress={() =>
              navigate('WebviewScreen', {
                sourceId: novel.sourceId,
                name: novel.title,
                url: novel.url,
              })
            }
          >
            <Icon name="earth" color={theme.outline} size={24} />
            <Text size={12} style={styles.label} color={theme.outline}>
              {'WebView'}
            </Text>
          </Pressable>
        </View>
      </Row>
      {/* Modals */}
      <SetCategoriesModal
        visible={setCategoriesModalState.value}
        onDismiss={setCategoriesModalState.setFalse}
        selectedCategories={
          novel.categoryIds ? JSON.parse(novel.categoryIds) : DEFAULT_CATEGORIES
        }
        novelIds={[novel.id]}
      />
    </>
  );
};

export const Description = () => {
  const { theme } = useTheme();
  const {
    novel: { description, genre, favorite },
  } = useNovelDetailsContext();

  const [expanded, setExpanded] = useState(!favorite);
  const isExpanded = defaultTo(expanded, !favorite);

  const handleOnPress = () => setExpanded(prevVal => !prevVal);

  const genreArr = genre?.split(/\s*,\s*/);

  return (
    <>
      <Pressable
        style={styles.descriptionCtn}
        onPress={description ? handleOnPress : undefined}
      >
        <Text
          color={theme.onSurfaceVariant}
          numberOfLines={isExpanded ? Number.MAX_SAFE_INTEGER : 3}
          style={[styles.descText, isExpanded && { marginBottom: Spacing.XL }]}
        >
          {description || 'No summary'}
        </Text>
        {description ? (
          <View
            style={[
              styles.iconCtn,
              { backgroundColor: Color(theme.background).alpha(0.8).string() },
            ]}
          >
            <IconButton
              name={isExpanded ? 'chevron-up' : 'chevron-down'}
              onPress={handleOnPress}
            />
          </View>
        ) : null}
      </Pressable>
      {genreArr?.length ? (
        <FlatList
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.genreCtn}
          data={genreArr}
          horizontal
          renderItem={({ item }) => (
            <View style={styles.chipCtn}>
              <Chip textSize={12}>{item}</Chip>
            </View>
          )}
        />
      ) : null}
    </>
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
    paddingTop: 105,
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
  descriptionCtn: {
    padding: Spacing.M,
    paddingTop: Spacing.S,
  },
  iconCtn: {
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -Spacing.XS,
  },
  descText: {
    lineHeight: 20,
  },
  chipCtn: {
    marginRight: Spacing.S,
    marginBottom: Spacing.S,
  },
  genreCtn: {
    paddingHorizontal: Spacing.M,
    marginVertical: Spacing.XS,
  },
});
