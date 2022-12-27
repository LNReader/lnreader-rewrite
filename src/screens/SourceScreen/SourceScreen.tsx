import React from 'react';
import { StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';

import {
  ErrorScreen,
  LoadingScreen,
  ScreenContainer,
  Searchbar,
} from '@lnreader/core';
import { useSearchText, useSource } from '@hooks';

import NovelList from '@components/NovelList/NovelList';

type SourceScreenRouteProps = RouteProp<{
  params: {
    sourceId: number;
  };
}>;

const SourceScreen: React.FC = () => {
  const {
    params: { sourceId },
  } = useRoute<SourceScreenRouteProps>();
  const { searchText, setSearchText } = useSearchText();
  const {
    loading,
    source,
    novels,
    error,
    fetchNextPage,
    searchNovels,
    onClearSearch,
  } = useSource({
    searchText,
    sourceId,
  });

  return (
    <ScreenContainer>
      <Searchbar
        placeholder={`Search ${source?.name}`}
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={searchNovels}
        onClearSearchbar={onClearSearch}
        useBackAction
      />
      {loading ? (
        <LoadingScreen />
      ) : error ? (
        <ErrorScreen error={error} />
      ) : (
        <NovelList data={novels} onEndReached={fetchNextPage} />
      )}
    </ScreenContainer>
  );
};

export default SourceScreen;

const styles = StyleSheet.create({});
