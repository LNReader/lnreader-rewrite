import React from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { List, IconAppbar, Switch } from '@lnreader/core';
import { useTheme } from '@hooks';

const MoreScreen = () => {
  const { navigate } = useNavigation();
  const { setDarkMode, isDarkMode, setAmoledBlack, isAmoledBlack } = useTheme();

  return (
    <>
      <IconAppbar />
      <Switch
        value={isDarkMode}
        label="Dark mode"
        onPress={() => setDarkMode(!isDarkMode)}
        textSize={16}
      />
      {isDarkMode && (
        <Switch
          value={isAmoledBlack}
          label="Pure black dark mode"
          onPress={() => setAmoledBlack(!isAmoledBlack)}
          textSize={16}
        />
      )}
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
