import { useMMKVObject } from 'react-native-mmkv';
import { MMKVStorage } from '@utils/mmkv/mmkv';
import { NovelFilters, NovelSortOrder } from '@utils/NovelUtils';

export const NOVEL_STORAGE = 'NOVEL_STORAGE';

export enum NovelStorageSetting {
  SHOW_CHAPTER_NUMBERS = 'SHOW_CHAPTER_NUMBERS',
  FILTERS = 'FILTERS',
  SORT_ORDER = 'SORT_ORDER',
}

interface NovelStorage {
  [NovelStorageSetting.SHOW_CHAPTER_NUMBERS]: boolean;
  [NovelStorageSetting.FILTERS]: NovelFilters[];
  [NovelStorageSetting.SORT_ORDER]: NovelSortOrder;
}

export type NovelStorageMap = Record<number, Partial<NovelStorage>>;

const useNovelStorage = (novelId: number) => {
  const [values, setValues] = useMMKVObject<NovelStorageMap>(
    NOVEL_STORAGE,
    MMKVStorage,
  );

  const setNovelStorage = (key: keyof NovelStorage, value: any): void => {
    setValues({
      ...values,
      [novelId]: {
        ...values?.[novelId],
        [key]: value,
      },
    });
  };

  const novelStorage = values?.[novelId];

  return {
    ...novelStorage,
    setNovelStorage,
  };
};

export default useNovelStorage;

export const getNovelStorage = (id: number) => {
  const rawSettings = MMKVStorage.getString(NOVEL_STORAGE) || '{}';
  const parsedSettings: Partial<NovelStorageMap> = JSON.parse(rawSettings);

  return parsedSettings[id];
};
