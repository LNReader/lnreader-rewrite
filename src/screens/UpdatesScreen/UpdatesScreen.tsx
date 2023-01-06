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
import { useSearchText, useTheme, useUpdates } from '@hooks';
import { groupUpdatesByDate } from '@utils/updateUtils';

const UpdatesScreen = () => {
  const { theme } = useTheme();
  const { searchText, setSearchText } = useSearchText();
  const { updates, loading, error } = useUpdates({ searchText });

  return (
    <>
      <Searchbar
        placeholder="Search updates"
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
          sections={groupUpdatesByDate(updates)}
          renderSectionHeader={({ section: { date } }) => (
            <Text padding={{ horizontal: 16, vertical: 8 }}>
              {moment(new Date(date)).calendar()}
            </Text>
          )}
          renderItem={({ item }) => <Text>{item.id}</Text>}
          ListEmptyComponent={<EmptyView />}
        />
      )}
    </>
  );
};

export default UpdatesScreen;

const styles = StyleSheet.create({
  listCtn: {
    flexGrow: 1,
  },
});
