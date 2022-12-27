import { useMMKVObject } from 'react-native-mmkv';
import { MMKVStorage } from '@utils/mmkv/mmkv';

export const SOURCE_STORAGE = 'SOURCE_STORAGE';

interface SourceStorage {
  cookies?: any;
}

export type SourceStorageMap = Record<number, Partial<SourceStorage>>;

const useSourceStorage = (sourceId: number) => {
  const [values, setValues] = useMMKVObject<SourceStorageMap>(
    SOURCE_STORAGE,
    MMKVStorage,
  );

  const setSourceStorage = (key: keyof SourceStorage, value: any): void => {
    setValues({
      ...values,
      [sourceId]: {
        ...values?.[sourceId],
        [key]: value,
      },
    });
  };

  const sourceStorage = values?.[sourceId];

  return {
    ...sourceStorage,
    setSourceStorage,
  };
};

export default useSourceStorage;
