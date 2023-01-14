import React from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Appbar, List } from '@lnreader/core';

const SettingsScreen = () => {
  const { navigate } = useNavigation();

  return (
    <>
      <Appbar title="Settings" />
      <List.Item
        title="General"
        icon="tune"
        onPress={() =>
          navigate('SettingsStack', {
            screen: 'GeneralSettingsScreen',
          })
        }
      />
      <List.Item
        title="Appearance"
        icon="palette-outline"
        onPress={() =>
          navigate('SettingsStack', {
            screen: 'AppearanceSettingsScreen',
          })
        }
      />
      <List.Item
        title="Library"
        icon="book-variant-multiple"
        onPress={() =>
          navigate('SettingsStack', {
            screen: 'LibrarySettingsScreen',
          })
        }
      />
      <List.Item
        title="Reader"
        icon="book-open-outline"
        onPress={() =>
          navigate('SettingsStack', {
            screen: 'ReaderSettingsScreen',
          })
        }
      />
      <List.Item
        title="Downloads"
        icon="download-outline"
        onPress={() =>
          navigate('SettingsStack', {
            screen: 'DownloadsSettingsScreen',
          })
        }
      />
    </>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});
