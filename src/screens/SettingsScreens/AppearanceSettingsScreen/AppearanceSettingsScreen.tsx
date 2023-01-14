import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { Appbar, List, Switch } from '@lnreader/core';
import { useAppSettings, useTheme } from '@hooks';
import { ThemesMap } from '@hooks/useTheme';

import AppThemePickerCard from '@components/AppThemePickerCard/AppThemePickerCard';
import { Setting } from 'types/Settings';

const AppearanceSettingsScreen = () => {
  const { setDarkMode, isDarkMode, setAmoledBlack, isAmoledBlack } = useTheme();
  const {
    SHOW_HISTORY_TAB = true,
    SHOW_LABELS_IN_NAV = true,
    SHOW_UPDATES_TAB = true,
    toggleSetting,
  } = useAppSettings();

  return (
    <>
      <Appbar title="Appearance" />
      <List.SubHeader>App theme</List.SubHeader>
      <Switch
        value={isDarkMode}
        title="Dark mode"
        onPress={() => setDarkMode(!isDarkMode)}
      />
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listCtn}
          data={Object.values(ThemesMap)}
          renderItem={({ item }) => <AppThemePickerCard theme={item} />}
        />
      </View>
      {isDarkMode && (
        <Switch
          value={isAmoledBlack}
          title="Pure black dark mode"
          onPress={() => setAmoledBlack(!isAmoledBlack)}
        />
      )}
      <List.SubHeader>Navbar</List.SubHeader>
      <Switch
        value={SHOW_UPDATES_TAB}
        title="Show updates in the nav"
        onPress={() => toggleSetting(Setting.SHOW_UPDATES_TAB)}
      />
      <Switch
        value={SHOW_HISTORY_TAB}
        title="Show history in the nav"
        onPress={() => toggleSetting(Setting.SHOW_HISTORY_TAB)}
      />
      <Switch
        value={SHOW_LABELS_IN_NAV}
        title="Always show nav labels"
        onPress={() => toggleSetting(Setting.SHOW_LABELS_IN_NAV)}
      />
    </>
  );
};

export default AppearanceSettingsScreen;

const styles = StyleSheet.create({
  listCtn: {
    padding: 12,
  },
});
