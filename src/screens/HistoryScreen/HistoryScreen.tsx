import React from 'react';
import { SectionList, StyleSheet } from 'react-native';
import moment from 'moment';

import {
  EmptyView,
  ErrorScreen,
  LoadingScreen,
  Searchbar,
  Text,
} from '@lnreader/core';
import { useTheme, useHistory, useSearchText } from '@hooks';
import { groupHistoryByDate } from '@utils/HistoryUtils';

import HistoryCard from '@components/HistoryCard/HistoryCard';
import SettingBanners from '@components/SettingBanners/SettingBanners';

const HistoryScreen = () => {
  const { theme } = useTheme();
  const { searchText, setSearchText } = useSearchText();
  const { error, history, loading, removeHistory } = useHistory({
    searchText,
  });

  return (
    <>
      <SettingBanners />
      <Searchbar
        placeholder="Search history"
        value={searchText}
        onChangeText={setSearchText}
      />
      {loading ? (
        <LoadingScreen />
      ) : error ? (
        <ErrorScreen error={error} />
      ) : (
        <SectionList
          contentContainerStyle={styles.listCtn}
          sections={groupHistoryByDate(history)}
          renderSectionHeader={({ section: { date } }) => (
            <Text padding={{ horizontal: 16, vertical: 8 }}>
              {moment(new Date(date)).calendar()}
            </Text>
          )}
          renderItem={({ item }) => (
            <HistoryCard history={item} removeHistory={removeHistory} />
          )}
          ListEmptyComponent={<EmptyView />}
        />
      )}
    </>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  listCtn: {
    flexGrow: 1,
  },
});
