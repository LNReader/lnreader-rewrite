import React from 'react';
import {StyleSheet} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';

import {useSearchText} from 'hooks/useSearchText';
import useSource from 'hooks/useSource';

import {
  ErrorScreen,
  LoadingScreen,
  NovelList,
  ScreenContainer,
  Searchbar,
} from 'components/index';

type SourceScreenRouteProps = RouteProp<{
  params: {
    sourceId: number;
  };
}>;

const SourceScreen: React.FC = () => {
  const {
    params: {sourceId},
  } = useRoute<SourceScreenRouteProps>();
  const {searchText, setSearchText} = useSearchText();
  const {loading, source, novels, error, resetPage, fetchNextPage} = useSource({
    searchText,
    sourceId,
  });

  const onChangeText = (text: string) => {
    setSearchText(text);
    resetPage();
  };

  return (
    <ScreenContainer>
      <Searchbar
        placeholder={`Search ${source?.name}`}
        value={searchText}
        onChangeText={onChangeText}
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
