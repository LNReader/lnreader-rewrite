import React, { useMemo } from 'react';
import { Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Image from 'react-native-fast-image';
import { LinearGradient } from 'expo-linear-gradient';

import { Text, Row, TextProps } from '@lnreader/core';
import { useTheme, useAppSettings, useSourceStorage } from '@hooks';
import { LibraryNovel } from '@database/types';
import { SourceNovel } from '@sources/types';

import { IMAGE_PLACEHOLDER_COLOR, Spacing, WHITE_HEX } from '@theme/constants';
import { LibraryDisplayModes } from '@utils/LibraryUtils';
import { useLibraryContext } from '@contexts/LibraryContext';
import { defaultUserAgentString } from '@utils/SettingsUtils';

interface NovelItemProps {
  novel: SourceNovel | LibraryNovel;
}

const titleProps: TextProps = {
  numberOfLines: 2,
  fontWeight: 'bold',
  padding: Spacing.XS,
  size: 12,
};

const NovelItem: React.FC<NovelItemProps> = ({ novel }) => {
  const { theme } = useTheme();
  const { navigate } = useNavigation();
  const route = useRoute();
  const isSourceScreen = route.name === 'SourceScreen';

  const { novels: libraryNovels } = useLibraryContext();

  const window = useWindowDimensions();

  const isLibraryNovel =
    isSourceScreen &&
    libraryNovels.some(libraryNovel => libraryNovel.url === novel.url);

  const {
    LIBRARY_SHOW_UNREAD_BADGE = true,
    LIBRARY_SHOW_DOWNLOADS_BADGE = true,
    LIBRARY_DISPLAY_MODE = LibraryDisplayModes.Comfortable,
    DEFAULT_USER_AGENT_STRING = defaultUserAgentString,
  } = useAppSettings();

  const { cookies } = useSourceStorage({ sourceId: novel.sourceId });

  const headers = useMemo(
    () => ({
      'User-Agent': DEFAULT_USER_AGENT_STRING,
      cookie: cookies,
    }),

    [],
  );

  const coverHeight = useMemo(() => (window.width / 3) * (4 / 3), []);

  const handleOnPress = () => {
    navigate('NovelDetailsScreen', novel);
  };

  const isDbNovel = 'id' in novel;
  const showDownloadsBadge =
    isDbNovel && LIBRARY_SHOW_DOWNLOADS_BADGE && !!novel.chaptersDownloaded;
  const showUnreadBadge =
    isDbNovel && LIBRARY_SHOW_UNREAD_BADGE && !!novel.chaptersUnread;

  if (LIBRARY_DISPLAY_MODE === LibraryDisplayModes.List) {
    return <NovelListItem novel={novel} handleOnPress={handleOnPress} />;
  }

  return (
    <View style={styles.novelCtn}>
      <Pressable
        style={styles.pressable}
        onPress={handleOnPress}
        android_ripple={{ color: theme.rippleColor }}
      >
        <Row style={styles.badgeCtn}>
          {isLibraryNovel && (
            <Text
              size={12}
              color={theme.onPrimary}
              style={[
                { backgroundColor: theme.primary },
                styles.isInLibraryBadge,
              ]}
            >
              {'In Library'}
            </Text>
          )}
          {showDownloadsBadge ? (
            <Text
              size={12}
              color={theme.onTertiary}
              style={[
                styles.unread,
                { backgroundColor: theme.tertiary },
                showUnreadBadge && styles.borderRightNone,
              ]}
            >
              {novel.chaptersDownloaded}
            </Text>
          ) : null}
          {showUnreadBadge ? (
            <Text
              size={12}
              color={theme.onPrimary}
              style={[
                styles.unread,
                { backgroundColor: theme.primary },
                showDownloadsBadge && styles.borderLefttNone,
              ]}
            >
              {novel.chaptersUnread}
            </Text>
          ) : null}
        </Row>
        <Image
          source={{ uri: novel.coverUrl || undefined, headers }}
          style={[
            styles.cover,
            { height: coverHeight },
            isLibraryNovel && styles.libraryNovelCover,
          ]}
        >
          {LIBRARY_DISPLAY_MODE === LibraryDisplayModes.Compact && (
            <View style={styles.compactTitleCtn}>
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.7)']}
                style={styles.linearGradient}
              >
                <Text
                  {...titleProps}
                  color={WHITE_HEX}
                  style={styles.compactTitle}
                >
                  {novel.title}
                </Text>
              </LinearGradient>
            </View>
          )}
        </Image>
        {LIBRARY_DISPLAY_MODE === LibraryDisplayModes.Comfortable && (
          <Text {...titleProps}>{novel.title}</Text>
        )}
      </Pressable>
    </View>
  );
};

const NovelListItem: React.FC<{
  novel: NovelItemProps['novel'];
  handleOnPress: () => void;
}> = ({ novel, handleOnPress }) => {
  const { theme } = useTheme();

  return (
    <Pressable
      style={styles.listItemCtn}
      onPress={handleOnPress}
      android_ripple={{ color: theme.rippleColor }}
    >
      <Image
        source={{ uri: novel.coverUrl || undefined }}
        style={[styles.smallIcon]}
      />
      <Text
        padding={{ horizontal: 8 }}
        style={[{ color: theme.primary }]}
        numberOfLines={1}
      >
        {novel.title}
      </Text>
    </Pressable>
  );
};

export default NovelItem;

const styles = StyleSheet.create({
  novelCtn: {
    flex: 1 / 3,
    borderRadius: 6,
    overflow: 'hidden',
  },
  pressable: {
    flex: 1,
    padding: Spacing.S,
    paddingBottom: Spacing.XS,
  },
  cover: {
    borderRadius: 4,
    backgroundColor: IMAGE_PLACEHOLDER_COLOR,
  },
  badgeCtn: {
    zIndex: 1,
    position: 'absolute',
    top: Spacing.M,
    left: Spacing.M,
  },
  unread: {
    borderRadius: 4,
    paddingHorizontal: Spacing.XS,
  },
  borderRightNone: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  borderLefttNone: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  linearGradient: {
    borderRadius: 4,
    padding: 4,
  },
  compactTitleCtn: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  compactTitle: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  smallIcon: {
    width: 40,
    height: 40,
    borderRadius: 4,
    backgroundColor: IMAGE_PLACEHOLDER_COLOR,
  },
  listItemCtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  libraryNovelCover: {
    opacity: 0.5,
  },
  isInLibraryBadge: {
    borderRadius: 4,
  },
});
