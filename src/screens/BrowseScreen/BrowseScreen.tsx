import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SourceFactory from 'sources/index';

const BrowseScreen = () => {
  return (
    <View>
      <Text>BrowseScreen</Text>
      <Text>{JSON.stringify(SourceFactory.getSources())}</Text>
    </View>
  );
};

export default BrowseScreen;

const styles = StyleSheet.create({});
