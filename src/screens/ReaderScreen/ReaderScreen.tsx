import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';
import useChapter from 'hooks/useChapter';
import {RouteProp, useRoute} from '@react-navigation/native';
import {DatabaseChapter} from 'database/types';

type ReaderScreenRouteProps = RouteProp<{
  params: {
    chapter: DatabaseChapter;
    sourceId: number;
  };
}>;

const ReaderScreen = () => {
  const {params: readerParams} = useRoute<ReaderScreenRouteProps>();
  const {chapter, error, loading} = useChapter(readerParams);

  return (
    <WebView
      source={{
        html: `
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
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
