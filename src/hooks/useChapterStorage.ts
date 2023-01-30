import { useMMKVObject } from 'react-native-mmkv';
import { debounce } from 'lodash-es';

import { MMKVStorage } from '@utils/mmkv/mmkv';

export const CHAPTER_STORAGE = 'CHAPTER_STORAGE';

export enum ChapterStorageSetting {
  PROGRESS = 'PROGRESS',
}

interface ChapterStorage {
  [ChapterStorageSetting.PROGRESS]?: number;
}

export type ChapterStorageMap = Record<number, ChapterStorage>;

const useChapterStorage = (chapterId: number) => {
  const [values, setValues] = useMMKVObject<ChapterStorageMap>(
    CHAPTER_STORAGE,
    MMKVStorage,
  );

  const setChapterStorage = (key: keyof ChapterStorage, value: any): void => {
    setValues({
      ...values,
      [chapterId]: {
        ...values?.[chapterId],
        [key]: value,
      },
    });
  };

  const setChapterProgress = debounce((percentage: number): void => {
    setValues({
      ...values,
      [chapterId]: {
        ...values?.[chapterId],
        [ChapterStorageSetting.PROGRESS]: percentage,
      },
    });
  }, 500);

  const chapterStorage = values?.[chapterId];

  return {
    ...chapterStorage,
    setChapterStorage,
    setChapterProgress,
  };
};

export default useChapterStorage;
