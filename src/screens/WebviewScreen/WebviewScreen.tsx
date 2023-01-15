import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import WebView from 'react-native-webview';
import CookieManager from '@react-native-cookies/cookies';

import { Appbar } from '@lnreader/core';
import { useAppSettings, useSourceStorage } from '@hooks';
import { defaultUserAgentString } from '@utils/SettingsUtils';

type ReaderScreenRouteProps = RouteProp<{
  params: {
    name: string;
    sourceId: number;
    url: string;
  };
}>;

const WebviewScreen = () => {
  const {
    params: { name, sourceId, url },
  } = useRoute<ReaderScreenRouteProps>();
  const { DEFAULT_USER_AGENT_STRING = defaultUserAgentString } =
    useAppSettings();
  const { setSourceStorage } = useSourceStorage({ sourceId });

  useEffect(() => {
    CookieManager.get(url, true).then(cookies => {
      const cloudflareCookie = cookies?.cf_clearance;
      if (cloudflareCookie) {
        const cloudflareCookieString = `${cloudflareCookie.name}=${cloudflareCookie.value}`;
        setSourceStorage('cookies', cloudflareCookieString);
      }
    });
  }, []);

  return (
    <>
      <Appbar mode="small" title={name} />
      <WebView
        startInLoadingState
        userAgent={DEFAULT_USER_AGENT_STRING}
        source={{ uri: url }}
      />
    </>
  );
};

export default WebviewScreen;

const styles = StyleSheet.create({});
