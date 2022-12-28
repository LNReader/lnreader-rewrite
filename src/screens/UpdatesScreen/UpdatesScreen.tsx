import React from 'react';
import { StyleSheet } from 'react-native';

import { Searchbar } from '@lnreader/core';
import { useSearchText, useTheme } from '@hooks';

type Props = {};

const UpdatesScreen = (props: Props) => {
  const { theme } = useTheme();
  const { searchText, setSearchText } = useSearchText();
  return (
    <>
      <Searchbar
        placeholder="Search updates"
        value={searchText}
        onChangeText={setSearchText}
      />
    </>
  );
};

export default UpdatesScreen;

const styles = StyleSheet.create({});
