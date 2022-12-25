import React from 'react';
import {SectionList, StyleSheet} from 'react-native';

import {useHistory} from 'hooks/useHistory';
import {useTheme} from 'hooks/useTheme';

import {
  EmptyView,
  ErrorScreen,
  LoadingScreen,
  Searchbar,
  Text,
} from 'components/index';
import {useSearchText} from 'hooks/useSearchText';
import {groupHistoryByDate} from 'utils/historyUtils';
import HistoryCard from 'components/HistoryCard/HistoryCard';
import moment from 'moment';

const HistoryScreen = () => {
  const {theme} = useTheme();
  const {searchText, setSearchText} = useSearchText();
  const {error, history, loading, removeHistory} = useHistory({
    searchText,
  });

  return (
    <>
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
          renderSectionHeader={({section: {date}}) => (
            <Text padding={{horizontal: 16, vertical: 8}}>
              {moment(date).calendar()}
            </Text>
          )}
          renderItem={({item}) => (
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
