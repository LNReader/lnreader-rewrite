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
import { DEAULT_READER_THEME } from '@utils/ReaderUtils';

type ReaderScreenRouteProps = RouteProp<{
  params: {
    chapter: DatabaseChapter;
    sourceId: number;
    novelName: string;
  };
}>;

const ReaderScreen = () => {
  const { params: readerParams } = useRoute<ReaderScreenRouteProps>();
  const { chapter, error, loading, getChapterFromCustomUrl } =
    useChapter(readerParams);
  const {
    INCOGNITO_MODE,
    READER_BACKGROUND_COLOR = DEAULT_READER_THEME.backgroundColor,
  } = useAppSettings();

  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    if (!INCOGNITO_MODE) {
      insertChapterInHistory(readerParams.chapter.id);
    }
  }, []);

  const handleShowMenu = () => setMenuVisible(prevVal => !prevVal);

  return loading ? (
    <LoadingScreen backgroundColor={READER_BACKGROUND_COLOR} />
  ) : error ? (
    <ErrorScreen error={error} />
  ) : (
    <ChapterDetailsContext.Provider value={readerParams}>
      <WebViewReader
        chapter={chapter}
        onPress={handleShowMenu}
        onNavigationStateChange={({ url }) => getChapterFromCustomUrl(url)}
      />
      <ReaderProgressBar />
      <ReaderAppbar visible={menuVisible} chapter={chapter} />
      <ReaderFooter visible={menuVisible} chapter={chapter} />
    </ChapterDetailsContext.Provider>
  );
};

export default ReaderScreen;

// const styles = StyleSheet.create({});
