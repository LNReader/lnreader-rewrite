import React from 'react';
import { StyleSheet } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';

import {
  ErrorScreen,
  LoadingMoreIndicator,
  LoadingScreen,
  ScreenContainer,
  Searchbar,
} from '@lnreader/core';
import { useSearchText, useSource } from '@hooks';

import NovelList from '@components/NovelList/NovelList';

type SourceScreenRouteProps = RouteProp<{
  params: {
    sourceId: number;
    searchText?: string;
  };
}>;

const SourceScreen: React.FC = () => {
  const {
    params: { sourceId, searchText: defaultSearchText },
  } = useRoute<SourceScreenRouteProps>();
  const { navigate } = useNavigation();
  const { searchText, setSearchText } = useSearchText(defaultSearchText);
  const {
    loading,
    source,
    novels,
    error,
    fetchNextPage,
    searchNovels,
    onClearSearch,
    hasNextPage,
  } = useSource({
    searchText,
    sourceId,
  });

  return (
    <ScreenContainer>
      <Searchbar
        useBackAction
        placeholder={`Search ${source?.name}`}
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={searchNovels}
        onClearSearchbar={onClearSearch}
        actions={[
          {
            icon: 'earth',
            onPress: () =>
              navigate('WebviewScreen', {
                sourceId,
                name: source?.name,
                url: source?.baseUrl,
              }),
          },
        ]}
      />
      {loading ? (
        <LoadingScreen />
      ) : error ? (
        <ErrorScreen error={error} />
      ) : (
        <NovelList
          data={novels}
          onEndReached={fetchNextPage}
          ListFooterComponent={
            hasNextPage ? <LoadingMoreIndicator /> : undefined
          }
        />
      )}
    </ScreenContainer>
  );
};

export default SourceScreen;

const styles = StyleSheet.create({});
