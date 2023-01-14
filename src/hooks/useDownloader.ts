import BackgroundService from 'react-native-background-actions';
import * as Notifications from 'expo-notifications';
import { useMMKVObject } from 'react-native-mmkv';

import { DatabaseChapter } from '@database/types';

import { insertChapterInDownloads } from '@database/queries/DownloadQueries';
import { MMKVStorage } from '@utils/mmkv/mmkv';
import { uniq } from 'lodash';
import { sleep } from '@utils/Sleep';

export const DOWNLOAD_QUEUE = 'DOWNLOAD_QUEUE';

const useDownloader = () => {
  const [downloadQueue = [], setDownloadQueue] = useMMKVObject<number[]>(
    DOWNLOAD_QUEUE,
    MMKVStorage,
  );

  const downloadChapters = async (
    sourceId: number,
    chapters: DatabaseChapter[],
  ) => {
    if (!chapters?.length) {
      return;
    }

    const notificationOptions = {
      taskName: 'Library Update',
      taskTitle: chapters[0].name,
      taskDesc: '0/' + chapters.length,
      taskIcon: {
        name: 'notification_icon',
        type: 'drawable',
      },
      color: '#00adb5',
      parameters: {
        delay: 1000,
      },
      progressBar: {
        max: chapters.length,
        value: 0,
      },
    };

    const downloadChaptersBackgroundAction = async (taskData: any) => {
      const chapterIds = chapters.map(chapter => chapter.id);
      let tempDownloadQueue = uniq([...downloadQueue, ...chapterIds]);
      setDownloadQueue(tempDownloadQueue);

      await new Promise(async resolve => {
        for (
          let i = 0;
          BackgroundService.isRunning() && i < chapters.length;
          i++
        ) {
          if (BackgroundService.isRunning()) {
            const chapter = chapters[i];

            try {
              if (!chapter.downloaded) {
                await insertChapterInDownloads(
                  sourceId,
                  chapter.id,
                  chapter.url,
                );

                tempDownloadQueue = tempDownloadQueue.filter(
                  chapterId => chapterId !== chapter.id,
                );
                setDownloadQueue(tempDownloadQueue);
              }
            } catch (err) {
              if (err instanceof Error) {
                Notifications.scheduleNotificationAsync({
                  content: {
                    title: chapter.name,
                    body: `Download failed: ${err.message}`,
                  },
                  trigger: null,
                });
              }
            }

            await BackgroundService.updateNotification({
              taskTitle: chapter.name,
              taskDesc: i + 1 + '/' + chapters.length,
              progressBar: {
                max: chapters.length,
                value: i + 1,
              },
            });

            if (i + 1 === chapters.length) {
              resolve(true);
              await BackgroundService.stop();

              Notifications.scheduleNotificationAsync({
                content: {
                  title: 'Downloader',
                  body: 'Download completed',
                },
                trigger: null,
              });
            }

            await sleep(taskData.delay);
          }
        }
      });
    };

    await BackgroundService.start(
      downloadChaptersBackgroundAction,
      notificationOptions,
    );
  };

  return {
    downloadQueue,
    downloadChapters,
  };
};

export default useDownloader;
