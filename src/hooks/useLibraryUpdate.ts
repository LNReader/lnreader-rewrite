import BackgroundService from 'react-native-background-actions';
import * as Notifications from 'expo-notifications';
import { intersection, isUndefined } from 'lodash';

import { ToastAndroid } from '@lnreader/core';
import { insertChapters } from '@database/queries/ChapterQueries';
import {
  getLibraryNovels,
  updateNovelMetadata,
} from '@database/queries/NovelQueries';
import SourceFactory from '@sources/SourceFactory';
import { sleep } from '@utils/Sleep';
import useAppSettings from './useAppSettings';
import { NovelStatus } from '@database/types';
import { Setting } from 'types/Settings';

export const useLibraryUpdate = () => {
  const {
    SKIP_UPDATING_COMPLETED_NOVELS,
    SKIP_UPDATING_NOVELS_NOT_STARTED,
    SKIP_UPDATING_NOVELS_WITH_UNREAD_CHAPTERS,
    UPDATES_INCLUDED_CATEGORIES = [],
    UPDATES_EXCLUDED_CATEGORIES = [],
    REFRESH_METADATA_ON_UPDATE,
    setAppSetting,
  } = useAppSettings();

  const updateLibrary = async ({ categoryId }: { categoryId?: number }) => {
    setAppSetting(Setting.LAST_UPDATE_TIME, +Date.now());

    const isCategoryUpdate = !isUndefined(categoryId);

    ToastAndroid.show(`Updating ${isCategoryUpdate ? 'category' : 'library'}`);

    let novels = await getLibraryNovels();

    if (isCategoryUpdate) {
      novels = novels.filter(novel => {
        const categories: number[] = JSON.parse(novel.categoryIds);

        return categories.includes(categoryId);
      });
    }

    if (SKIP_UPDATING_COMPLETED_NOVELS) {
      novels.filter(novel => novel.status !== NovelStatus.COMPLETED);
    }

    if (SKIP_UPDATING_NOVELS_NOT_STARTED) {
      novels.filter(novel => novel.initialized);
    }

    if (SKIP_UPDATING_NOVELS_WITH_UNREAD_CHAPTERS) {
      novels.filter(novel => novel.chaptersUnread && novel.chaptersUnread > 0);
    }

    if (UPDATES_INCLUDED_CATEGORIES.length) {
      novels = novels.filter(novel => {
        const categories: number[] = JSON.parse(novel.categoryIds);

        return intersection(categories, UPDATES_INCLUDED_CATEGORIES).length;
      });
    }

    if (UPDATES_EXCLUDED_CATEGORIES.length) {
      novels = novels.filter(novel => {
        const categories: number[] = JSON.parse(novel.categoryIds);

        return !intersection(categories, UPDATES_EXCLUDED_CATEGORIES).length;
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

              if (REFRESH_METADATA_ON_UPDATE && sourceNovel) {
                await updateNovelMetadata(sourceNovel);
              }

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
