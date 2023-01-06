import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

import { ErrorScreen, LoadingScreen } from '@lnreader/core';
import { useAppSettings, useChapter, useTheme } from '@hooks';
import { DatabaseChapter } from '@database/types';
import { insertChapterInHistory } from '@database/queries/HistoryQueries';

import ReaderAppbar from '@components/ReaderAppbar/ReaderAppbar';
import WebViewReader from '@components/WebViewReader/WebViewReader';
import ReaderFooter from '@components/ReaderFooter/ReaderFooter';
import ReaderProgressBar from '@components/ReaderProgressBar/ReaderProgressBar';
import { ChapterDetailsContext } from '@contexts/ChapterDetailsContext';

type ReaderScreenRouteProps = RouteProp<{
  params: {
    chapter: DatabaseChapter;
    sourceId: number;
    novelName: string;
  };
}>;

const ReaderScreen = () => {
  // const { theme } = useTheme();
  const { params: readerParams } = useRoute<ReaderScreenRouteProps>();
  const { chapter, error, loading } = useChapter(readerParams);
  const [menuVisible, setMenuVisible] = useState(false);
  const { INCOGNITO_MODE } = useAppSettings();

  useEffect(() => {
    if (!INCOGNITO_MODE) {
      insertChapterInHistory(readerParams.chapter.id);
    }
  }, []);

  const handleShowMenu = () => setMenuVisible(prevVal => !prevVal);

  return loading ? (
    <LoadingScreen />
  ) : error ? (
    <ErrorScreen error={error} />
  ) : (
    <ChapterDetailsContext.Provider value={readerParams}>
      <WebViewReader chapter={chapter} onPress={handleShowMenu} />
      <ReaderProgressBar chapterId={readerParams.chapter.id} />
      <ReaderAppbar visible={menuVisible} chapter={chapter} />
      <ReaderFooter visible={menuVisible} chapter={chapter} />
    </ChapterDetailsContext.Provider>
  );
};

export default ReaderScreen;

// const styles = StyleSheet.create({});
