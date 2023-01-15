import React, { LegacyRef } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import {
  WebViewNavigation,
  WebViewScrollEvent,
} from 'react-native-webview/lib/WebViewTypes';

import { useAppSettings, useChapterStorage, useTheme } from '@hooks';
import { setChapterRead } from '@database/queries/ChapterQueries';
import { SourceChapter } from '@sources/types';
import { DEAULT_READER_THEME } from '@utils/ReaderUtils';
import { useChapterDetailsContext } from '@contexts/ChapterDetailsContext';

interface WebViewReaderProps {
  webViewRef: React.RefObject<WebView<{}>>;
  chapter?: SourceChapter;
  onPress: () => void;
  onNavigationStateChange: (event: WebViewNavigation) => void;
}

type WebViewPostEvent = {
  type: string;
  data?: { [key: string]: string };
};

const onClickWebViewPostMessage = (event: WebViewPostEvent) =>
  "onClick='window.ReactNativeWebView.postMessage(`" +
  JSON.stringify(event) +
  "`)'";

const isCloseToBottom = ({
  nativeEvent: { layoutMeasurement, contentOffset, contentSize },
}: WebViewScrollEvent) => {
  const paddingToBottom = 40;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

const WebViewReader: React.FC<WebViewReaderProps> = ({
  webViewRef,
  chapter,
  onPress,
  onNavigationStateChange,
}) => {
  const { theme } = useTheme();
  const { top: marginTop } = useSafeAreaInsets();
  const {
    INCOGNITO_MODE,
    READER_FONT_SIZE = 16,
    READER_TEXT_COLOR = DEAULT_READER_THEME.color,
    READER_BACKGROUND_COLOR = DEAULT_READER_THEME.backgroundColor,
    READER_TEXT_ALIGNMENT,
    READER_LINE_HEIGHT,
    READER_PADDING = 5,
    READER_CUSTOM_CSS,
  } = useAppSettings();
  const {
    chapter: { id: chapterId },
  } = useChapterDetailsContext();

  const { PROGRESS = 0, setChapterProgress } = useChapterStorage(chapterId);

  const onScroll = (e: WebViewScrollEvent) => {
    if (!INCOGNITO_MODE) {
      const {
        nativeEvent: { contentOffset, contentSize, layoutMeasurement },
      } = e;

      const offsetY = contentOffset.y;
      const position = offsetY + layoutMeasurement.height;
      const percentage = Math.round((position / contentSize.height) * 100);

      setChapterProgress(percentage);

      if (isCloseToBottom(e)) {
        setChapterRead(chapterId);
      }
    }
  };

  return (
    <>
      <WebView
        incognito={INCOGNITO_MODE}
        style={{ backgroundColor: theme.background }}
        ref={webViewRef}
        scalesPageToFit
        nestedScrollEnabled
        javaScriptEnabled
        showsVerticalScrollIndicator={false}
        onNavigationStateChange={onNavigationStateChange}
        injectedJavaScript={`
        const scrollPercentage = ${PROGRESS};
      
        if(scrollPercentage > 0 && scrollPercentage < 100){
          const scrollHeight = document.body.scrollHeight;
          const position = (scrollPercentage * scrollHeight) / 100;
          const readerHeight = ${Math.trunc(Dimensions.get('window').height)};
          const scrollOffsetY = position - readerHeight;
  
          window.scrollTo({
            top: scrollOffsetY, 
            left: 0, 
            behavior:'auto'
          });
        }
      `}
        onScroll={onScroll}
        onMessage={ev => {
          const event: WebViewPostEvent = JSON.parse(ev.nativeEvent.data);
          switch (event.type) {
            case 'hide':
              onPress();
              break;
          }
        }}
        source={{
          html: `
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');
              
              html {
                font-family: 'Nunito', sans-serif;
                font-size: ${READER_FONT_SIZE}px;
                text-align: ${READER_TEXT_ALIGNMENT};
                line-height: ${READER_LINE_HEIGHT};
              }

              body {
                margin-top: ${marginTop}px;
                background-color: ${READER_BACKGROUND_COLOR};
                color: ${READER_TEXT_COLOR};
                padding: ${READER_PADDING}%;
              }

              ${READER_CUSTOM_CSS}
            </style>
          </head>
          <body ${onClickWebViewPostMessage({ type: 'hide' })}>
            ${chapter?.text}
          </body>
        </html>`,
        }}
      />
    </>
  );
};

export default WebViewReader;

const styles = StyleSheet.create({});
