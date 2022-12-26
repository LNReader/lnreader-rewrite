import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';

interface WebViewReaderProps {
  html?: string | null;
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

const WebViewReader: React.FC<WebViewReaderProps> = ({html, onPress}) => {
  const {top: topInset} = useSafeAreaInsets();
  const paddingTop = topInset + 16;

  return (
    <WebView
      scalesPageToFit
      nestedScrollEnabled
      javaScriptEnabled
      showsVerticalScrollIndicator={false}
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
            ${html}
          </body>
        </html>`,
      }}
    />
  );
};

export default WebViewReader;

const styles = StyleSheet.create({});
