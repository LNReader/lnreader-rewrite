import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import BackgroundService from 'react-native-background-actions';
import { ProgressBar } from 'react-native-paper';

import {
  Appbar,
  EmptyView,
  FAB,
  IconButton,
  Menu,
  MenuItem,
  Text,
  ToastAndroid,
} from '@lnreader/core';
import { useBoolean, useDownloader, useTheme } from '@hooks';
import { DatabaseChapterWithSourceId } from '@database/types';
import { getChaptersByChapterIds } from '@database/queries/ChapterQueries';

const DownloadQueueScreen = () => {
  const { theme } = useTheme();
  const { downloadQueue, downloadChapters, clearDownloadQueue } =
    useDownloader();

  const {
    value: menuVisible,
    setTrue: showMenu,
    setFalse: hideMenu,
  } = useBoolean();

  const [chapters, setChapters] = useState<DatabaseChapterWithSourceId[]>([]);

  const getChapters = async () => {
    const dbChapters = await getChaptersByChapterIds(downloadQueue);

    setChapters(dbChapters);
  };

  useEffect(() => {
    getChapters();
  }, [downloadQueue]);

  const isBackgroundServiceRunning = BackgroundService.isRunning();

  const onCancelDownloads = async () => {
    await BackgroundService.stop();
    clearDownloadQueue();
    ToastAndroid.show('Downloads cancelled.');
    hideMenu();
  };

  return (
    <>
      <Appbar
        title="Download queue"
        menu={
          downloadQueue.length ? (
            <Menu
              visible={menuVisible}
              openMenu={showMenu}
              onDismiss={hideMenu}
            >
              <MenuItem title="Cancel downloads" onPress={onCancelDownloads} />
            </Menu>
          ) : undefined
        }
      />
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
      {downloadQueue.length ? (
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
