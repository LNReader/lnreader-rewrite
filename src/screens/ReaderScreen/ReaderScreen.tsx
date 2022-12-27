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

type ReaderScreenRouteProps = RouteProp<{
  params: {
    chapter: DatabaseChapter;
    sourceId: number;
    novelName: string;
  };
}>;

const ReaderScreen = () => {
  const { theme } = useTheme();
  const { params: readerParams } = useRoute<ReaderScreenRouteProps>();
  const { chapter, error, loading } = useChapter(readerParams);
  const [menuVisible, setMenuVisible] = useState(false);
  const { INCOGNITO_MODE } = useAppSettings();

  useEffect(() => {
    if (!INCOGNITO_MODE) {
      insertChapterInHistory(
        readerParams.chapter.novelId,
        readerParams.chapter.id,
      );
    }
  }, []);

  const handleShowMenu = () => setMenuVisible(prevVal => !prevVal);

  return loading ? (
    <LoadingScreen />
  ) : error ? (
    <ErrorScreen error={error} />
  ) : (
    <>
      <WebViewReader
        chapterId={readerParams.chapter.id}
        chapter={chapter}
        onPress={handleShowMenu}
      />
      <ReaderProgressBar chapterId={readerParams.chapter.id} />
      <ReaderAppbar
        visible={menuVisible}
        chapter={chapter}
        novelName={readerParams.novelName}
      />
      <ReaderFooter
        visible={menuVisible}
        chapter={chapter}
        novelName={readerParams.novelName}
      />
    </>
  );
};

export default ReaderScreen;

const styles = StyleSheet.create({});
