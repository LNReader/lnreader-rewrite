import { useMMKVObject } from 'react-native-mmkv';

import { Setting, SettingTypes } from 'types/Settings';
import { MMKVStorage } from '@utils/mmkv/mmkv';

export const APP_SETTINGS = 'APP_SETTINGS';

type Settings = Partial<SettingTypes>;

const useAppSettings = () => {
  const [settings, setSettings] = useMMKVObject<Settings>(
    APP_SETTINGS,
    MMKVStorage,
  );

  const setAppSetting = (key: keyof SettingTypes, value: any): void => {
    setSettings({
      ...settings,
      [key]: value,
    });
  };

  const setAppSettings = (newSettings: Partial<SettingTypes>): void => {
    setSettings({
      ...settings,
      ...newSettings,
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
    setAppSetting,
    setAppSettings,
    toggleSetting,
    setReaderTheme,
  };
};

export default useAppSettings;

export const getAppSettings = () => {
  const rawSettings = MMKVStorage.getString(APP_SETTINGS) || '{}';
  const parsedSettings: Partial<SettingTypes> = JSON.parse(rawSettings);

  return parsedSettings;
};
