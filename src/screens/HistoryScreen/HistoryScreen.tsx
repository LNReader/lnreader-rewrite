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
import { useTheme, useHistory, useSearchText, useBoolean } from '@hooks';
import { groupHistoryByDate } from '@utils/HistoryUtils';

import HistoryCard from '@components/HistoryCard/HistoryCard';
import ConfirmationModal from '@components/ConfirmationModal/ConfirmationModal';

const HistoryScreen = () => {
  // const { theme } = useTheme();
  const { searchText, setSearchText } = useSearchText();
  const { error, history, loading, removeHistory, clearAllHistory } =
    useHistory({
      searchText,
    });

  const clearAllHistoryModalState = useBoolean();

  return (
    <>
      <Searchbar
        placeholder="Search history"
        value={searchText}
        onChangeText={setSearchText}
        actions={[
          {
            icon: 'delete-sweep-outline',
            onPress: clearAllHistoryModalState.setTrue,
          },
        ]}
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
      {/* Modals */}
      <ConfirmationModal
        visible={clearAllHistoryModalState.value}
        onDismiss={clearAllHistoryModalState.setFalse}
        title="Remove everything"
        description="Are you sure? All history will be lost."
        onConfirm={clearAllHistory}
      />
    </>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  listCtn: {
    flexGrow: 1,
  },
});
