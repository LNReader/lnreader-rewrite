import { StyleSheet } from 'react-native';
import React from 'react';
import { Appbar, List } from '@lnreader/core';
import { useAppSettings, useBoolean, useSourceStorage } from '@hooks';
import DefaultUserAgentStringModal from '@components/DefaultUserAgentStringModal/DefaultUserAgentStringModal';
import { defaultUserAgentString } from '@utils/SettingsUtils';

const AdvancedSettingsScreen = () => {
  const { clearCookies } = useSourceStorage({});
  const { DEFAULT_USER_AGENT_STRING = defaultUserAgentString } =
    useAppSettings();

  const defaultUserAgentStringModalState = useBoolean();

  return (
    <>
      <Appbar title="Advanced" />
      <List.SubHeader>Network</List.SubHeader>
      <List.Item title="Clear cookies" onPress={clearCookies} />
      <List.Item
        title="Default user agent string"
        description={DEFAULT_USER_AGENT_STRING}
        onPress={defaultUserAgentStringModalState.setTrue}
      />
      {/* Modals */}
      <DefaultUserAgentStringModal
        visible={defaultUserAgentStringModalState.value}
        onDismiss={defaultUserAgentStringModalState.setFalse}
      />
    </>
  );
};

export default AdvancedSettingsScreen;

const styles = StyleSheet.create({});
