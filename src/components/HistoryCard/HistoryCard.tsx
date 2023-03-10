import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import moment from 'moment';

import { Text, IconButton } from '@lnreader/core';
import { useTheme } from '@hooks';
import { History } from '@database/types';

import { IMAGE_PLACEHOLDER_COLOR, Spacing } from '@theme/constants';

type Props = {
  history: History;
  clearHistoryById: (id: number) => Promise<void>;
};

const HistoryCard: React.FC<Props> = ({ history, clearHistoryById }) => {
  const { theme } = useTheme();
  const { navigate } = useNavigation();

  const navigateToReader = () =>
    navigate('ReaderScreen', {
      chapter: {
        novelId: history.novelId,
        id: history.chapterId,
        url: history.chapterUrl,
        name: history.chapterName,
      },
      sourceId: history.sourceId,
      novelName: history.novelName,
    });

  const navigateToNovel = () =>
    navigate('NovelDetailsScreen', {
      id: history.novelId,
      sourceId: history.sourceId,
      title: history.novelName,
      coverUrl: history.coverUrl,
    });

  return (
    <Pressable
      android_ripple={{ color: theme.rippleColor }}
      onPress={navigateToReader}
      style={styles.cardCtn}
    >
      <Pressable onPress={navigateToNovel}>
        <FastImage source={{ uri: history.coverUrl }} style={styles.cover} />
      </Pressable>
      <View style={styles.detailsCtn}>
        <Text numberOfLines={2} style={styles.title}>
          {history.novelName}
        </Text>
        <Text numberOfLines={1} color={theme.onSurfaceVariant}>{`${
          history.chapterName
        } • ${moment(history.lastRead).format('h:mm a')}`}</Text>
      </View>
      <IconButton
        name="delete-outline"
        onPress={() => clearHistoryById(history.id)}
      />
    </Pressable>
  );
};

export default HistoryCard;

const styles = StyleSheet.create({
  cardCtn: {
    padding: Spacing.M,
    paddingVertical: Spacing.S,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cover: {
    height: 80,
    width: 56,
    borderRadius: 4,
    backgroundColor: IMAGE_PLACEHOLDER_COLOR,
  },
  detailsCtn: {
    flex: 1,
    marginLeft: Spacing.M,
  },
  title: {
    marginBottom: 4,
  },
});
