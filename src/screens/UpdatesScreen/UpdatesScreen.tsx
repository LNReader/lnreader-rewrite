import React from 'react';
import { RefreshControl, SectionList, StyleSheet } from 'react-native';
import moment from 'moment';

import {
  EmptyView,
  ErrorScreen,
  LoadingScreen,
  Searchbar,
  Text,
} from '@lnreader/core';
import { useLibraryUpdate, useSearchText, useTheme, useUpdates } from '@hooks';
import { groupUpdatesByDate } from '@utils/UpdateUtils';
import UpdateCard from '@components/UpdateCard/UpdateCard';

const UpdatesScreen = () => {
  const { theme } = useTheme();
  const { searchText, setSearchText } = useSearchText();
  const { updates, loading, error } = useUpdates({ searchText });
  const { updateLibrary } = useLibraryUpdate();

  return (
    <>
      <Searchbar
        placeholder="Search updates"
        value={searchText}
        onChangeText={setSearchText}
        actions={[{ icon: 'reload', onPress: () => updateLibrary({}) }]}
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
          renderItem={({ item }) => <UpdateCard update={item} />}
          ListEmptyComponent={<EmptyView />}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => updateLibrary({})}
              colors={[theme.onPrimary]}
              progressBackgroundColor={theme.primary}
            />
          }
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
