import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { Appbar, EmptyView } from '@lnreader/core';
import { DatabaseChapterWithNovelDetails, Update } from '@database/types';
import { getDownloadedChapters } from '@database/queries/ChapterQueries';

import UpdateCard from '@components/UpdateCard/UpdateCard';

const DownloadsScreen = () => {
  const [chapters, setChapters] = useState<DatabaseChapterWithNovelDetails[]>(
    [],
  );

  const getChapters = async () => {
    const dbChapters = await getDownloadedChapters();

    setChapters(dbChapters);
  };

  useEffect(() => {
    getChapters();
  }, []);

  return (
    <>
      <Appbar title="Downloads" />
      <FlatList
        contentContainerStyle={styles.listCtn}
        data={chapters}
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
