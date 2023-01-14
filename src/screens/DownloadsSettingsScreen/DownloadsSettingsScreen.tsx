import { StyleSheet } from 'react-native';
import React from 'react';
import { Appbar, List } from '@lnreader/core';

const DownloadsSettingsScreen = () => {
  return (
    <>
      <Appbar title="Downloads" />
      <List.Info message="Downloads are saved in a SQLite Database." />
    </>
  );
};

export default DownloadsSettingsScreen;

const styles = StyleSheet.create({});
