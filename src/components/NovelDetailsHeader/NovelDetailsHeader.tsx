import React, { useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import { NovelStatus } from '@database/types';
import { CoverImage, Description, SubHeader } from './Components';
import { Row, Text, IconButton } from '@lnreader/core';
import { IMAGE_PLACEHOLDER_COLOR, Spacing } from '@theme/constants';
import { useTheme } from '@hooks';
import SourceFactory from '@sources/SourceFactory';
import { useNovelDetailsContext } from 'contexts/NovelDetailsContext';
import { useNavigation } from '@react-navigation/native';
import Button from 'components/Button/Button';
import { useHistory } from 'hooks/useHistory';
import { BottomSheetType } from 'components/BottomSheet/BottomSheet';
import { sortBy } from 'lodash';

interface Props {
  bottomSheetRef: React.MutableRefObject<BottomSheetType>;
}

const NovelDetailsHeader: React.FC<Props> = ({ bottomSheetRef }) => {
  const { theme } = useTheme();
  const { goBack, navigate } = useNavigation();
  const { loading, novel, chapters } = useNovelDetailsContext();
  const { getLastReadNovelChapter } = useHistory({});
  const lastReadChapterId = getLastReadNovelChapter(novel.id);

  const sourceName = SourceFactory.getSourceName(novel.sourceId);
  const coverUrl = novel.coverUrl || undefined;

  const lastReadChapter = useMemo(() => {
    if (lastReadChapterId) {
      return chapters?.find(chapter => chapter.id === lastReadChapterId);
    } else {
      return sortBy(chapters, 'id')[0];
    }
  }, [novel.id, getLastReadNovelChapter]);

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
              padding={{ vertical: Spacing.TINY }}
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
      {!loading && lastReadChapter && (
        <Button
          mode="contained"
          title={`${lastReadChapterId ? 'Continue' : 'Start'} reading ${
            lastReadChapter?.name
          }`}
          style={styles.lastReadBtn}
          onPress={navigateToReader}
        />
      )}
      <Pressable
        style={styles.chaptersCtn}
        android_ripple={{ color: theme.rippleColor }}
        onPress={() => bottomSheetRef.current?.show()}
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
