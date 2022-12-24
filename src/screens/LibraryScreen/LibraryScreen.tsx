import {StyleSheet} from 'react-native';
import React from 'react';

import {useSearchText} from 'hooks/useSearchText';

import {Searchbar} from 'components/index';

const LibraryScreen = () => {
  const {searchText, setSearchText} = useSearchText();

  return (
    <>
      <Searchbar
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Search library"
      />
    </>
  );
};

export default LibraryScreen;

const styles = StyleSheet.create({});
