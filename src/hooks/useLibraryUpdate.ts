import BackgroundService from 'react-native-background-actions';
import * as Notifications from 'expo-notifications';
import { isUndefined } from 'lodash';

import { ToastAndroid } from '@lnreader/core';
import { insertChapters } from '@database/queries/ChapterQueries';
import { getLibraryNovels } from '@database/queries/NovelQueries';
import SourceFactory from '@sources/SourceFactory';
import { sleep } from '@utils/Sleep';

export const useLibraryUpdate = () => {
  const updateLibrary = async ({ categoryId }: { categoryId?: number }) => {
    const isCategoryUpdate = !isUndefined(categoryId);

    ToastAndroid.show(`Updating ${isCategoryUpdate ? 'category' : 'library'}`);

    let novels = await getLibraryNovels();

    if (isCategoryUpdate) {
      novels = novels.filter(novel => {
        const categories: number[] = JSON.parse(novel.categoryIds);

        return categories.includes(categoryId);
      });
    }

    const totalNovels = novels.length;

    if (!totalNovels) {
      return;
    }

    const notificationOptions = {
      taskName: 'Library Update',
      taskTitle: novels[0].title,
      taskDesc: '0/' + totalNovels,
      taskIcon: {
        name: 'notification_icon',
        type: 'drawable',
      },
      color: '#00adb5',
      parameters: {
        delay: 1000,
      },
      progressBar: {
        max: totalNovels,
        value: 0,
      },
    };

    const updateLibraryBackgroundAction = async (taskData: any) => {
      await new Promise(async resolve => {
        for (let i = 0; BackgroundService.isRunning() && i < totalNovels; i++) {
          if (BackgroundService.isRunning()) {
            const novel = novels[i];
            const source = SourceFactory.getSource(novel.sourceId);

            try {
              const sourceNovel = await source?.getNovelDetails({
                url: novel.url,
              });

              if (sourceNovel?.chapters?.length) {
                await insertChapters(novel.id, sourceNovel.chapters);
              }
            } catch (err) {
              if (err instanceof Error) {
                Notifications.scheduleNotificationAsync({
                  content: {
                    title: novel.title,
                    body: `Update failed: ${err.message}`,
                  },
                  trigger: null,
                });
              }
            }

            await BackgroundService.updateNotification({
              taskTitle: novel.title,
              taskDesc: i + 1 + '/' + totalNovels,
              progressBar: {
                max: totalNovels,
                value: i + 1,
              },
            });

            if (i + 1 === totalNovels) {
              resolve(true);
              await BackgroundService.stop();

              Notifications.scheduleNotificationAsync({
                content: {
                  title: 'Library Updated',
                  body: totalNovels + ' novels updated',
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
      updateLibraryBackgroundAction,
      notificationOptions,
    );
  };

  return {
    updateLibrary,
  };
};
