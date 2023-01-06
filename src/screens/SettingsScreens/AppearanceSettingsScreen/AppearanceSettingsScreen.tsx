import React from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Appbar, List, Switch, Text } from '@lnreader/core';
import { useTheme } from '@hooks';

const AppearanceSettingsScreen = () => {
  const { navigate } = useNavigation();
  const {
    setDarkMode,
    isDarkMode,
    setAmoledBlack,
    isAmoledBlack,
    setAppTheme,
  } = useTheme();

  return (
    <>
      <Appbar title="Appearance" />
      <Switch
        value={isDarkMode}
        title="Dark mode"
        onPress={() => setDarkMode(!isDarkMode)}
        size="large"
      />

      <Text
        onPress={() => setAppTheme(Math.round(Math.random() * (4 - 1) + 1))}
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

export default AppearanceSettingsScreen;

const styles = StyleSheet.create({});
