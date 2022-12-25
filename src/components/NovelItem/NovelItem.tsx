import React, {useMemo} from 'react';
import {Pressable, StyleSheet, useWindowDimensions, View} from 'react-native';

import Image from 'react-native-fast-image';

import {LibraryNovel} from 'database/types';
import {SourceNovel} from 'sources/types';

import {Text, Row} from 'components/index';

import {IMAGE_PLACEHOLDER_COLOR, Spacing} from 'theme/constants';
import {useTheme} from 'hooks/useTheme';
import {useNavigation} from '@react-navigation/native';
import useAppSettings from 'hooks/useAppSettings';

interface NovelItemProps {
  novel: SourceNovel | LibraryNovel;
}

const NovelItem: React.FC<NovelItemProps> = ({novel}) => {
  const {theme} = useTheme();
  const {navigate} = useNavigation();
  const window = useWindowDimensions();

  const {
    LIBRARY_SHOW_UNREAD_BADGE = true,
    LIBRARY_SHOW_DOWNLOADS_BADGE = true,
  } = useAppSettings();

  const coverHeight = useMemo(() => (window.width / 3) * (4 / 3), []);

  const handleOnPress = () => {
    navigate('NovelDetailsScreen', novel);
  };

  const isDbNovel = 'id' in novel;
  const showDownloadsBadge =
    isDbNovel && LIBRARY_SHOW_DOWNLOADS_BADGE && !!novel.chaptersDownloaded;
  const showUnreadBadge =
    isDbNovel && LIBRARY_SHOW_UNREAD_BADGE && !!novel.chaptersUnread;

  return (
    <View style={styles.novelCtn}>
      <Pressable
        style={styles.pressable}
        onPress={handleOnPress}
        android_ripple={{color: theme.rippleColor}}>
        <Row style={styles.badgeCtn}>
          {showDownloadsBadge ? (
            <Text
              size={12}
              color={theme.onTertiary}
              style={[
                styles.unread,
                {backgroundColor: theme.tertiary},
                showUnreadBadge && styles.borderRightNone,
              ]}>
              {novel.chaptersDownloaded}
            </Text>
          ) : null}
          {showUnreadBadge ? (
            <Text
              size={12}
              color={theme.onPrimary}
              style={[
                styles.unread,
                {backgroundColor: theme.primary},
                showDownloadsBadge && styles.borderLefttNone,
              ]}>
              {novel.chaptersUnread}
            </Text>
          ) : null}
        </Row>
        <Image
          source={{uri: novel.coverUrl || undefined}}
          style={[styles.cover, {height: coverHeight}]}
        />
        <Text
          numberOfLines={2}
          fontWeight="bold"
          color={theme.onSurface}
          padding={Spacing.XS}
          size={12}>
          {novel.title}
        </Text>
      </Pressable>
    </View>
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
    right: Spacing.M,
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
});
