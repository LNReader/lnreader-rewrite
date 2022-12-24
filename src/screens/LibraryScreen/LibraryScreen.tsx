import {StyleSheet} from 'react-native';
import React from 'react';

import {useSearchText} from 'hooks/useSearchText';

import {ErrorScreen, LoadingScreen, Searchbar} from 'components/index';

const LibraryScreen = () => {
  const {searchText, setSearchText} = useSearchText();

  return (
    <>
      <Searchbar
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Search library"
      />
      {/* {loading ? (
        <LoadingScreen />
      ) : error ? (
        <ErrorScreen error={error} />
      ) : (
        <NovelList data={novels} onEndReached={fetchNextPage} />
      )} */}
    </>
  );
};

export default LibraryScreen;

const styles = StyleSheet.create({});
