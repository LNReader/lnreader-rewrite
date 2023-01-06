import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { Appbar, Switch } from '@lnreader/core';
import SourceFactory from '@sources/SourceFactory';
import { useAppSettings } from '@hooks';
import { Setting } from 'types/SettingTypes';
import { xor } from 'lodash';
import { Language } from '@sources/types';

const BrowseSettingsScreen = () => {
  const languages = SourceFactory.getLanguages();
  const { SOURCE_LANGUAGES = [Language.English], setAppSettings } =
    useAppSettings();

  return (
    <>
      <Appbar title="Browse Settings" />
      <FlatList
        data={languages}
        extraData={SOURCE_LANGUAGES}
        renderItem={({ item }) => (
          <Switch
            value={SOURCE_LANGUAGES?.includes(item)}
            title={item}
            size="large"
            onPress={() =>
              setAppSettings(
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
