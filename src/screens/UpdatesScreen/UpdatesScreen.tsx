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
import {
  useAppSettings,
  useLibraryUpdate,
  useSearchText,
  useTheme,
  useUpdates,
} from '@hooks';
import { groupUpdatesByDate } from '@utils/UpdateUtils';
import UpdateCard from '@components/UpdateCard/UpdateCard';

const UpdatesScreen = () => {
  const { theme } = useTheme();
  const { LAST_UPDATE_TIME } = useAppSettings();
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
          ListHeaderComponent={
            LAST_UPDATE_TIME ? (
              <Text style={styles.lastUpdatedCtn}>
                {`Library last updated: ${moment(LAST_UPDATE_TIME).fromNow()}`}
              </Text>
            ) : null
          }
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
  lastUpdatedCtn: {
    paddingHorizontal: 16,
    vertical: 8,
    fontSize: 12,
    fontStyle: 'italic',
  },
});
