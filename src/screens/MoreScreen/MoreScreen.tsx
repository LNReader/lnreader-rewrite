import React from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { List, IconAppbar, Switch, Text } from '@lnreader/core';
import { useAppSettings, useTheme } from '@hooks';
import { Setting } from 'types/SettingTypes';
import SettingBanners from '@components/SettingBanners/SettingBanners';

const MoreScreen = () => {
  const { navigate } = useNavigation();
  const {
    setDarkMode,
    isDarkMode,
    setAmoledBlack,
    isAmoledBlack,
    setAppTheme,
  } = useTheme();
  const { INCOGNITO_MODE, DOWNLOADED_ONLY_MODE, toggleSetting } =
    useAppSettings();

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
        size="large"
      />
      <Switch
        icon="incognito"
        value={INCOGNITO_MODE}
        title="Incognito mode"
        description="Pauses reading history"
        onPress={() => toggleSetting(Setting.INCOGNITO_MODE)}
        size="large"
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
      <List.Divider />
      <Switch
        value={isDarkMode}
        title="Dark mode"
        onPress={() => setDarkMode(!isDarkMode)}
        size="large"
      />

      <Text
        onPress={() => setAppTheme(Math.round(Math.random() * (3 - 1) + 1))}
      >
        Random Theme
      </Text>
      {isDarkMode && (
        <Switch
          value={isAmoledBlack}
          title="Pure black dark mode"
          onPress={() => setAmoledBlack(!isAmoledBlack)}
          size="large"
        />
      )}
    </>
  );
};

export default MoreScreen;

const styles = StyleSheet.create({});
