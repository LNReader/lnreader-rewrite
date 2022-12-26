import React, {useRef} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import {WebViewScrollEvent} from 'react-native-webview/lib/WebViewTypes';

import useChapterStorage from 'hooks/useChapterStorage';
import {SourceChapter} from 'sources/types';

interface WebViewReaderProps {
  chapterId: number;
  chapter?: SourceChapter;
  onPress: () => void;
}

type WebViewPostEvent = {
  type: string;
  data?: {[key: string]: string};
};

const onClickWebViewPostMessage = (event: WebViewPostEvent) =>
  "onClick='window.ReactNativeWebView.postMessage(`" +
  JSON.stringify(event) +
  "`)'";

const WebViewReader: React.FC<WebViewReaderProps> = ({
  chapter,
  onPress,
  chapterId,
}) => {
  const {top: topInset} = useSafeAreaInsets();
  const paddingTop = topInset + 16;

  const webViewRef = useRef<WebView>(null);

  const {PROGRESS = 0, setChapterProgress} = useChapterStorage(chapterId);

  const onScroll = ({
    nativeEvent: {contentOffset, contentSize, layoutMeasurement},
  }: WebViewScrollEvent) => {
    const offsetY = contentOffset.y;
    const position = offsetY + layoutMeasurement.height;
    const percentage = Math.round((position / contentSize.height) * 100);

    setChapterProgress(percentage);
  };

  return (
    <WebView
      ref={webViewRef}
      scalesPageToFit
      nestedScrollEnabled
      javaScriptEnabled
      showsVerticalScrollIndicator={false}
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
            behavior:'smooth'
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
                padding-top: ${paddingTop}px;
                padding-left: 8;
                padding-right: 8;
                font-family: 'Nunito', sans-serif;
              }

            </style>
          </head>
          <body ${onClickWebViewPostMessage({type: 'hide'})}>
            ${chapter?.text}

            <div>
            </div>
          </body>
        </html>`,
      }}
    />
  );
};

export default WebViewReader;

const styles = StyleSheet.create({});
