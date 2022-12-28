import { useMMKVObject } from 'react-native-mmkv';

import { Setting, SettingTypes } from 'types/SettingTypes';
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

  const toggleSetting = (key: keyof SettingTypes): void => {
    setSettings({
      ...settings,
      [key]: !settings?.[key],
    });
  };

  const setReaderTheme = (backgroundColor: string, color: string) => {
    setSettings({
      ...settings,
      [Setting.READER_BACKGROUND_COLOR]: backgroundColor,
      [Setting.READER_TEXT_COLOR]: color,
    });
  };

  return {
    ...settings,
    setAppSettings,
    toggleSetting,
    setReaderTheme,
  };
};

export default useAppSettings;
