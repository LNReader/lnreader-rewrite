import {useMMKVObject} from 'react-native-mmkv';
import {MMKVStorage} from 'utils/mmkv/mmkv';

import {Setting, SettingTypes} from 'src/types/SettingTypes';

export const APP_SETTINGS = 'APP_SETTINGS';

type Settings = Partial<SettingTypes>;

const useAppSettings = () => {
  const [settings, setSettings] = useMMKVObject<Settings>(
    APP_SETTINGS,
    MMKVStorage,
  );

  const setAppSettings = (key: Setting, value: any): void => {
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
