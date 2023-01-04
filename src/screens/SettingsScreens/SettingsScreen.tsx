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
        title="Appearance"
        icon="palette-outline"
        onPress={() =>
          navigate('SettingsStack', {
            screen: 'AppearanceSettingsScreen',
          })
        }
      />
    </>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});
