import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { Text } from '@lnreader/core';

import { useTheme, useNovelStorage, useChapterStorage } from '@hooks';
import { useNovelDetailsContext } from '@contexts/NovelDetailsContext';
import { DatabaseChapter } from '@database/types';

import { Spacing } from '@theme/constants';
import { xor } from 'lodash';

interface ChapterCardProps {
  chapter: DatabaseChapter;
  sourceId: number;
  selectedChapterIds: number[];
  setSelectedChapterIds: React.Dispatch<React.SetStateAction<number[]>>;
}

const ChapterCard: React.FC<ChapterCardProps> = ({
  chapter,
  sourceId,
  selectedChapterIds,
  setSelectedChapterIds,
}) => {
  const { theme } = useTheme();
  const { navigate } = useNavigation();
  const { novel } = useNovelDetailsContext();
  const { SHOW_CHAPTER_NUMBERS = false } = useNovelStorage(novel.id);
  const { PROGRESS = 0 } = useChapterStorage(chapter.id);

  const isSelected = selectedChapterIds.includes(chapter.id);

  const handleSelectChapter = () =>
    setSelectedChapterIds(prevVal => xor(prevVal, [chapter.id]));

  const onPress = () => {
    if (selectedChapterIds.length) {
      handleSelectChapter();
    } else {
      navigate('ReaderScreen', {
        chapter,
        sourceId,
        novelName: novel.title,
      });
    }
  };

  const showChapterProgress = !chapter.read && PROGRESS > 0 && PROGRESS < 100;

  const onLongPress = () => handleSelectChapter();

  return (
    <Pressable
      android_ripple={{ color: theme.rippleColor }}
      style={[
        styles.cardCtn,
        isSelected && { backgroundColor: theme.rippleColor },
      ]}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <Text
        numberOfLines={1}
        color={!chapter.read ? theme.onSurface : theme.outline}
      >
        {SHOW_CHAPTER_NUMBERS
          ? `Chapter ${chapter.chapterNumber}`
          : chapter.name}
      </Text>
      {chapter.dateUpload ? (
        <Text
          color={!chapter.read ? theme.onSurfaceVariant : theme.outline}
          numberOfLines={1}
          size={12}
          style={styles.dateCtn}
        >
          {moment.unix(chapter.dateUpload).format('Do MMM, YYYY')}
          {showChapterProgress && (
            <Text color={theme.outline}>{`  •  Progress ${PROGRESS}%`}</Text>
          )}
        </Text>
      ) : null}
    </Pressable>
  );
};

export default ChapterCard;

const styles = StyleSheet.create({
  cardCtn: {
    paddingHorizontal: Spacing.M,
    paddingVertical: Spacing.XM,
  },
  dateCtn: {
    marginTop: Spacing.TINY,
  },
});
