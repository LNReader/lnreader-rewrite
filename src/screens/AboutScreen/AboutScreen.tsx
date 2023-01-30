import React from 'react';
import { Linking, StyleSheet } from 'react-native';

import { IconAppbar, List } from '@lnreader/core';

const AboutScreen = () => {
  return (
    <>
      <IconAppbar showBackAction title="About" />
      <List.Item title="Version" description="Preview 0.1" />
      <List.Divider />
      <List.Item
        title="Discord"
        description="https://discord.gg/QdcWN4MD63"
        onPress={() => Linking.openURL('https://discord.gg/QdcWN4MD63')}
      />
      <List.Item
        title="Github"
        description="https://github.com/LNReader/lnreader"
        onPress={() => Linking.openURL('https://github.com/LNReader/lnreader')}
      />
      <List.Item
        title="Sources"
        description="https://github.com/LNReader/lnreader-sources"
        onPress={() =>
          Linking.openURL('https://github.com/LNReader/lnreader-sources')
        }
      />
    </>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({});
