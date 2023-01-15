import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

import { ErrorScreen, LoadingScreen } from '@lnreader/core';
import { useAppSettings, useChapter } from '@hooks';
import { DatabaseChapter } from '@database/types';
import { insertChapterInHistory } from '@database/queries/HistoryQueries';

import ReaderAppbar from '@components/ReaderAppbar/ReaderAppbar';
import WebViewReader from '@components/WebViewReader/WebViewReader';
import ReaderFooter from '@components/ReaderFooter/ReaderFooter';
import ReaderProgressBar from '@components/ReaderProgressBar/ReaderProgressBar';
import { ChapterDetailsContext } from '@contexts/ChapterDetailsContext';
import { DEAULT_READER_THEME } from '@utils/ReaderUtils';
import WebView from 'react-native-webview';
import ReaderSeekbar from '@components/ReaderSeekbar/ReaderSeekbar';
import {
  activateKeepAwake,
  deactivateKeepAwake,
  useKeepAwake,
} from 'expo-keep-awake';

type ReaderScreenRouteProps = RouteProp<{
  params: {
    chapter: DatabaseChapter;
    sourceId: number;
    novelName: string;
  };
}>;

const KeepAwake = () => {
  useKeepAwake();

  return null;
};

const ReaderScreen = () => {
  const { params: readerParams } = useRoute<ReaderScreenRouteProps>();
  const { chapter, error, loading, getChapterFromCustomUrl } =
    useChapter(readerParams);
  const {
    INCOGNITO_MODE,
    READER_BACKGROUND_COLOR = DEAULT_READER_THEME.backgroundColor,
    KEEP_SCREEN_ON,
  } = useAppSettings();
  const webViewRef = useRef<WebView>(null);

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
      {KEEP_SCREEN_ON ? <KeepAwake /> : null}
      <View
        style={[{ backgroundColor: READER_BACKGROUND_COLOR }, styles.readerCtn]}
      >
        <WebViewReader
          webViewRef={webViewRef}
          chapter={chapter}
          onPress={handleShowMenu}
          onNavigationStateChange={({ url }) => getChapterFromCustomUrl(url)}
        />
      </View>
      <ReaderProgressBar />
      <ReaderAppbar visible={menuVisible} chapter={chapter} />
      <ReaderFooter visible={menuVisible} chapter={chapter} />
      <ReaderSeekbar visible={menuVisible} webViewRef={webViewRef} />
    </ChapterDetailsContext.Provider>
  );
};

export default ReaderScreen;

const styles = StyleSheet.create({
  readerCtn: {
    flex: 1,
  },
});
