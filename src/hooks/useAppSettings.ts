import { useMMKVObject } from 'react-native-mmkv';

import { SettingTypes } from 'types/SettingTypes';
import { MMKVStorage } from '@utils/mmkv/mmkv';

export const APP_SETTINGS = 'APP_SETTINGS';

type Settings = Partial<SettingTypes>;

const useAppSettings = () => {
  const [settings, setSettings] = useMMKVObject<Settings>(
    APP_SETTINGS,
    MMKVStorage,
  );

  const setAppSettings = (key: keyof SettingTypes, value: any): void => {
    setSettings({
      ...settings,
      [key]: value,
    });
  };

  return {
    ...settings,
    setAppSettings,
  };
};

export default useAppSettings;
