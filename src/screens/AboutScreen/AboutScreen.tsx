import { StyleSheet } from 'react-native';
import React from 'react';

import { IconAppbar, List } from '@lnreader/core';

const AboutScreen = () => {
  return (
    <>
      <IconAppbar />
      <List.Item title="Version" description="Preview 0.1" />
    </>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({});
