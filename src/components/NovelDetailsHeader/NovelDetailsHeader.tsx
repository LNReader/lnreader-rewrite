import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { sortBy } from 'lodash';

import { Row, Text, IconButton, BottomSheetRef, Button } from '@lnreader/core';
import { useTheme } from '@hooks';
import { useNovelDetailsContext } from '@contexts/NovelDetailsContext';
import { DatabaseChapter, NovelStatus } from '@database/types';
import SourceFactory from '@sources/SourceFactory';

import { CoverImage, Description, SubHeader } from './Components';

import { IMAGE_PLACEHOLDER_COLOR, Spacing } from '@theme/constants';
import { getLastReadChapterByNovelId } from '@database/queries/HistoryQueries';

interface Props {
  bottomSheetRef: BottomSheetRef;
}

const NovelDetailsHeader: React.FC<Props> = ({ bottomSheetRef }) => {
  const { theme } = useTheme();
  const { goBack, navigate } = useNavigation();
  const { novel, chapters } = useNovelDetailsContext();

  const sourceName = SourceFactory.getSourceName(novel.sourceId);
  const coverUrl = novel.coverUrl || undefined;

  const [lastReadChapter, setLastReadChapter] = useState<DatabaseChapter>();

  const getLastReadChapter = async () => {
    if (novel.id) {
      const lastReadChapterFromDb = await getLastReadChapterByNovelId(novel.id);

      if (lastReadChapterFromDb) {
        setLastReadChapter(lastReadChapterFromDb);
      } else {
        setLastReadChapter(sortBy(chapters, 'id')[0]);
      }
    } else {
      setLastReadChapter(sortBy(chapters, 'id')[0]);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getLastReadChapter();
    }, [novel.id]),
  );

  const navigateToReader = () =>
    navigate('ReaderScreen', {
      chapter: lastReadChapter,
      sourceId: novel.sourceId,
      novelName: novel.title,
    });

  return (
    <>
      <CoverImage source={{ uri: coverUrl }}>
        <IconButton
          name="arrow-left"
          containerStyle={styles.backHandler}
          onPress={goBack}
        />
        <Row style={styles.headerCtn}>
          <FastImage source={{ uri: coverUrl }} style={styles.coverCtn} />
          <View style={styles.detailsCtn}>
            <Text size={20} color={theme.onSurface}>
              {novel.title}
            </Text>
            <Text
              numberOfLines={1}
              color={theme.onSurfaceVariant}
              padding={{ vertical: Spacing.XS }}
            >
              {novel.author}
            </Text>
            <Text numberOfLines={1} color={theme.onSurfaceVariant}>{`${
              novel.status || NovelStatus.UNKNOWN
            } • ${sourceName}`}</Text>
          </View>
        </Row>
      </CoverImage>
      <SubHeader />
      <Description />
      {chapters && chapters.length > 0 && lastReadChapter && (
        <Button
          mode="contained"
          title={`${lastReadChapter ? 'Continue' : 'Start'} reading ${
            lastReadChapter?.name
          }`}
          style={styles.lastReadBtn}
          onPress={navigateToReader}
        />
      )}
      <Pressable
        style={styles.chaptersCtn}
        android_ripple={{ color: theme.rippleColor }}
        onPress={() => bottomSheetRef.current?.expand()}
      >
        <Text fontWeight="bold">{`${chapters?.length} Chapters`}</Text>
      </Pressable>
    </>
  );
};

export default NovelDetailsHeader;

const styles = StyleSheet.create({
  coverCtn: {
    height: 150,
    width: 100,
    borderRadius: 6,
    backgroundColor: IMAGE_PLACEHOLDER_COLOR,
  },
  headerCtn: {
    flex: 1,
    padding: Spacing.M,
    paddingBottom: Spacing.S,
  },
  detailsCtn: {
    flex: 1,
    padding: Spacing.M,
  },
  chaptersCtn: {
    paddingHorizontal: Spacing.M,
    paddingVertical: Spacing.XM,
  },
  backHandler: {
    position: 'absolute',
    top: Spacing.HUGE,
    left: Spacing.XS,
  },
  lastReadBtn: {
    margin: Spacing.M,
  },
});
