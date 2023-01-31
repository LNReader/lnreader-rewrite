import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { xor } from 'lodash-es';

import { Text, Row } from '@lnreader/core';
import { useTheme, useNovelStorage, useChapterStorage } from '@hooks';
import { useNovelDetailsContext } from '@contexts/NovelDetailsContext';
import { DatabaseChapter } from '@database/types';

import { Spacing } from '@theme/constants';
import DownloadButton from './DownloadButton';

interface ChapterCardProps {
  chapter: DatabaseChapter;
  sourceId: number;
  selectedChapterIds?: number[];
  setSelectedChapterIds?: React.Dispatch<React.SetStateAction<number[]>>;
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

  const isSelected = selectedChapterIds?.includes(chapter.id);

  const handleSelectChapter = () =>
    setSelectedChapterIds?.(prevVal => xor(prevVal, [chapter.id]));

  const onPress = () => {
    if (selectedChapterIds?.length) {
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
      <View style={styles.infoCtn}>
        <Text
          numberOfLines={1}
          color={!chapter.read ? theme.onSurface : theme.outline}
        >
          {SHOW_CHAPTER_NUMBERS
            ? `Chapter ${chapter.chapterNumber}`
            : chapter.name}
        </Text>
        <Row style={styles.dateCtn}>
          {chapter.dateUpload ? (
            <Text
              color={!chapter.read ? theme.onSurfaceVariant : theme.outline}
              size={12}
            >
              {moment.unix(chapter.dateUpload).format('Do MMM, YYYY')}
            </Text>
          ) : null}
          {showChapterProgress && (
            <Text size={12} color={theme.outline}>{`${
              chapter.dateUpload ? '  •  ' : ''
            }Progress ${PROGRESS}%`}</Text>
          )}
        </Row>
      </View>
      <DownloadButton chapter={chapter} />
    </Pressable>
  );
};

export default ChapterCard;

const styles = StyleSheet.create({
  cardCtn: {
    height: 64,
    paddingHorizontal: Spacing.M,
    paddingVertical: Spacing.XM,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateCtn: {
    marginTop: Spacing.TINY,
  },
  infoCtn: {
    flex: 1,
  },
});
