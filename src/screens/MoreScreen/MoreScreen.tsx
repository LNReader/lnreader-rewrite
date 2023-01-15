import React from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { List, IconAppbar, Switch } from '@lnreader/core';
import { useAppSettings, useDownloader } from '@hooks';
import { Setting } from 'types/Settings';
import SettingBanners from '@components/SettingBanners/SettingBanners';

const MoreScreen = () => {
  const { navigate } = useNavigation();
  const { INCOGNITO_MODE, DOWNLOADED_ONLY_MODE, toggleSetting } =
    useAppSettings();

  const { downloadQueue } = useDownloader();

  return (
    <>
      <SettingBanners />
      <IconAppbar />
      <Switch
        icon="cloud-off-outline"
        value={DOWNLOADED_ONLY_MODE}
        title="Downloaded only"
        description="Filters all novels in your library"
        onPress={() => toggleSetting(Setting.DOWNLOADED_ONLY_MODE)}
      />
      <Switch
        icon="incognito"
        value={INCOGNITO_MODE}
        title="Incognito mode"
        description="Pauses reading history"
        onPress={() => toggleSetting(Setting.INCOGNITO_MODE)}
      />
      <List.Divider />
      <List.Item
        title="Download queue"
        icon="download-outline"
        description={
          downloadQueue.length ? `${downloadQueue.length} novels` : undefined
        }
        onPress={() =>
          navigate('MoreStack', {
            screen: 'DownloadQueueScreen',
          })
        }
      />
      <List.Item
        title="Downloads"
        icon="folder-download-outline"
        onPress={() =>
          navigate('MoreStack', {
            screen: 'DownloadsScreen',
          })
        }
      />
      <List.Item
        title="Categories"
        icon="label-outline"
        onPress={() =>
          navigate('MoreStack', {
            screen: 'CategoriesScreen',
          })
        }
      />
      <List.Divider />
      <List.Item
        title="Settings"
        icon="cog-outline"
        onPress={() =>
          navigate('MoreStack', {
            screen: 'SettingsStack',
          })
        }
      />
      <List.Item
        title="About"
        icon="information-outline"
        onPress={() =>
          navigate('MoreStack', {
            screen: 'AboutScreen',
          })
        }
      />
    </>
  );
};

export default MoreScreen;

const styles = StyleSheet.create({});
