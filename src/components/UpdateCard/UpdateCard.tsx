import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

import { Text } from '@lnreader/core';
import { useTheme } from '@hooks';
import { DatabaseChapter, Update } from '@database/types';

import { IMAGE_PLACEHOLDER_COLOR, Spacing } from '@theme/constants';
import DownloadButton from '@components/ChapterCard/DownloadButton';

type Props = {
  update: Update;
};

const UpdateCard: React.FC<Props> = ({ update }) => {
  const { theme } = useTheme();
  const { navigate } = useNavigation();

  const navigateToReader = () =>
    navigate('ReaderScreen', {
      chapter: {
        novelId: update.novelId,
        id: update.chapterId,
        url: update.chapterUrl,
        name: update.chapterName,
      },
      sourceId: update.sourceId,
      novelName: update.novelName,
    });

  const navigateToNovel = () =>
    navigate('NovelDetailsScreen', {
      id: update.novelId,
      sourceId: update.sourceId,
      name: update.novelName,
      coverUrl: update.coverUrl,
    });

  return (
    <Pressable
      android_ripple={{ color: theme.rippleColor }}
      onPress={navigateToReader}
      style={styles.cardCtn}
    >
      <Pressable onPress={navigateToNovel}>
        <FastImage source={{ uri: update.coverUrl }} style={styles.cover} />
      </Pressable>
      <View style={styles.detailsCtn}>
        <Text style={styles.title}>{update.novelName}</Text>
        <Text size={12} color={theme.onSurfaceVariant}>
          {update.chapterName}
        </Text>
      </View>
      <DownloadButton
        chapter={
          {
            id: update.chapterId,
            name: update.chapterName,
            url: update.chapterUrl,
            downloaded: update.downloaded,
          } as DatabaseChapter
        }
        sourceId={update.sourceId}
      />
    </Pressable>
  );
};

export default UpdateCard;

const styles = StyleSheet.create({
  cardCtn: {
    padding: Spacing.M,
    paddingVertical: Spacing.XM,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cover: {
    height: 40,
    width: 40,
    borderRadius: 4,
    backgroundColor: IMAGE_PLACEHOLDER_COLOR,
  },
  detailsCtn: {
    flex: 1,
    marginLeft: Spacing.M,
  },
  title: {
    marginBottom: 2,
  },
});
