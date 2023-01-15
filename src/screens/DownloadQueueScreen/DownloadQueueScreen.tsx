import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import BackgroundService from 'react-native-background-actions';
import { ProgressBar } from 'react-native-paper';

import { Appbar, EmptyView, FAB, Text } from '@lnreader/core';
import { useDownloader, useTheme } from '@hooks';
import { DatabaseChapterWithSourceId } from '@database/types';
import { getChaptersByChapterIds } from '@database/queries/ChapterQueries';

const DownloadQueueScreen = () => {
  const { theme } = useTheme();
  const { downloadQueue, downloadChapters } = useDownloader();

  const [chapters, setChapters] = useState<DatabaseChapterWithSourceId[]>([]);

  const getChapters = async () => {
    const dbChapters = await getChaptersByChapterIds(downloadQueue);

    setChapters(dbChapters);
  };

  useEffect(() => {
    getChapters();
  }, [downloadQueue]);

  const isBackgroundServiceRunning = BackgroundService.isRunning();

  return (
    <>
      <Appbar title="Download queue" />
      <FlatList
        contentContainerStyle={styles.listCtn}
        data={chapters}
        renderItem={({ item }) => (
          <View style={styles.itemCtn}>
            <Text>{item.name}</Text>
            <ProgressBar
              indeterminate={isBackgroundServiceRunning}
              progress={0}
              color={theme.primary}
              style={styles.progressCtn}
            />
          </View>
        )}
        ListEmptyComponent={<EmptyView description="No downloads" />}
      />
      {!downloadQueue.length ? (
        <FAB
          label={isBackgroundServiceRunning ? 'Pause' : 'Resume'}
          icon={isBackgroundServiceRunning ? 'pause' : 'play'}
          onPress={() => {
            if (isBackgroundServiceRunning) {
              BackgroundService.stop();
            } else {
              downloadChapters(chapters);
            }
          }}
        />
      ) : null}
    </>
  );
};

export default DownloadQueueScreen;

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
