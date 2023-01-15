import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

import { Appbar, ScreenContainer, Searchbar, Switch } from '@lnreader/core';
import { useGlobalSearch, useSearchText } from '@hooks';
import GlobalSearchNovelList from '@components/GlobalSearchNovelList/GlobalSearchNovelList';

type GlobalSearchScreenRouteProps = RouteProp<{
  params: {
    searchText?: string;
  };
}>;

const GlobalSearchScreen = () => {
  const { params } = useRoute<GlobalSearchScreenRouteProps>();
  const { searchText, setSearchText } = useSearchText(params?.searchText);
  const { data, globalSearch } = useGlobalSearch(searchText);

  return (
    <ScreenContainer>
      <Searchbar
        useBackAction
        placeholder="Global Search"
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={() => globalSearch(searchText)}
      />
      <GlobalSearchNovelList data={data} searchText={searchText} />
    </ScreenContainer>
  );
};

export default GlobalSearchScreen;

const styles = StyleSheet.create({});
