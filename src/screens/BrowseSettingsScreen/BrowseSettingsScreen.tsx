import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { Appbar, List, Switch } from '@lnreader/core';
import SourceFactory from '@sources/SourceFactory';
import { useAppSettings } from '@hooks';
import { Setting } from 'types/Settings';
import { xor } from 'lodash-es';
import { Language } from '@sources/types';

const BrowseSettingsScreen = () => {
  const languages = SourceFactory.getLanguages();
  const {
    SOURCE_LANGUAGES = [Language.English],
    ONLY_INCLUDE_PINNED_SOURCES = true,
    setAppSetting,
    toggleSetting,
  } = useAppSettings();

  return (
    <>
      <Appbar title="Browse Settings" />
      <List.SubHeader>Global search</List.SubHeader>
      <Switch
        title="Only include pinned sources"
        value={ONLY_INCLUDE_PINNED_SOURCES}
        onPress={() => toggleSetting(Setting.ONLY_INCLUDE_PINNED_SOURCES)}
      />
      <List.Info message="Searching a large number of sources may freeze the app till searching is finished." />
      <List.SubHeader>Languages</List.SubHeader>
      <FlatList
        data={languages}
        extraData={SOURCE_LANGUAGES}
        renderItem={({ item }) => (
          <Switch
            value={SOURCE_LANGUAGES?.includes(item)}
            title={item}
            size="large"
            onPress={() =>
              setAppSetting(
                Setting.SOURCE_LANGUAGES,
                xor(SOURCE_LANGUAGES, [item]),
              )
            }
          />
        )}
      />
    </>
  );
};

export default BrowseSettingsScreen;

const styles = StyleSheet.create({});
