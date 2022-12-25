import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import WebView from 'react-native-webview';
import useChapter from 'hooks/useChapter';
import {RouteProp, useRoute} from '@react-navigation/native';
import {DatabaseChapter} from 'database/types';
import {ErrorScreen, LoadingScreen} from 'components/index';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from 'hooks/useTheme';
import {insertChapterInHistory} from 'database/queries/HistoryQueries';

type ReaderScreenRouteProps = RouteProp<{
  params: {
    chapter: DatabaseChapter;
    sourceId: number;
  };
}>;

const ReaderScreen = () => {
  const {theme} = useTheme();
  const {params: readerParams} = useRoute<ReaderScreenRouteProps>();
  const {chapter, error, loading} = useChapter(readerParams);

  useEffect(() => {
    insertChapterInHistory(
      readerParams.chapter.novelId,
      readerParams.chapter.id,
    );
  }, []);

  const {top: topInset} = useSafeAreaInsets();
  const paddingTop = topInset + 16;

  return loading ? (
    <LoadingScreen />
  ) : error ? (
    <ErrorScreen error={error} />
  ) : (
    <WebView
      source={{
        html: `
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');
              
              html {
                padding-top: ${paddingTop}px;
                padding-left: 8;
                padding-right: 8;
                font-family: 'Nunito', sans-serif;
              }
            </style>
          </head>
          <body>
          ${chapter?.text}
          </body>
        </html>`,
      }}
    />
  );
};

export default ReaderScreen;

const styles = StyleSheet.create({});
