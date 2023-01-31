import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { Appbar, EmptyView, ErrorScreen, LoadingScreen } from '@lnreader/core';
import { DatabaseChapterWithNovelDetails, Update } from '@database/types';
import { GetDownloadedChaptersQuery } from '@database/queries/ChapterQueries';

import UpdateCard from '@components/UpdateCard/UpdateCard';
import useQuery from '@hooks/useQuery';

const DownloadsScreen = () => {
  const { loading, data, error } = useQuery<DatabaseChapterWithNovelDetails[]>(
    GetDownloadedChaptersQuery,
  );

  return (
    <>
      <Appbar title="Downloads" />
      {loading ? (
        <LoadingScreen />
      ) : error ? (
        <ErrorScreen error={error} />
      ) : (
        <FlatList
          contentContainerStyle={styles.listCtn}
          data={data}
          renderItem={({ item }) => (
            <UpdateCard
              update={
                {
                  ...item,
                  chapterId: item.id,
                  chapterName: item.name,
                  chapterUrl: item.url,
                } as unknown as Update
              }
            />
          )}
          ListEmptyComponent={<EmptyView description="No downloads" />}
        />
      )}
    </>
  );
};

export default DownloadsScreen;

const styles = StyleSheet.create({
  itemCtn: {
    padding: 16,
  },
  progressCtn: {
    marginTop: 8,
  },
  listCtn: {
    flexGrow: 1,
  },
});
