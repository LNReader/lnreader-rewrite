import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import WebView from 'react-native-webview';
import CookieManager from '@react-native-cookies/cookies';

import { Appbar } from '@lnreader/core';
import { useAppSettings, useSourceStorage } from '@hooks';
import { Source } from '@sources/types';
import { defaultUserAgentString } from '@utils/SettingsUtils';

type ReaderScreenRouteProps = RouteProp<{
  params: {
    source: Source;
  };
}>;

const SourceWebviewScreen = () => {
  const {
    params: {
      source: { name, id, baseUrl },
    },
  } = useRoute<ReaderScreenRouteProps>();
  const { DEFAULT_USER_AGENT_STRING = defaultUserAgentString } =
    useAppSettings();
  const { setSourceStorage } = useSourceStorage({ sourceId: id });

  useEffect(() => {
    CookieManager.get(baseUrl, true).then(cookies => {
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
        userAgent={DEFAULT_USER_AGENT_STRING}
        source={{ uri: baseUrl }}
      />
    </>
  );
};

export default SourceWebviewScreen;

const styles = StyleSheet.create({});
