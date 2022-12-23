import {defaultTo, get, isUndefined} from 'lodash';
import {useMemo} from 'react';
import {Appearance} from 'react-native';
import {useMMKVBoolean, useMMKVObject} from 'react-native-mmkv';
import {defaultColors} from 'theme/Colors/default';

enum ThemePreferences {
  APP_THEME = 'APP_THEME',
  DARK_MODE = 'DARK_MODE',
  AMOLED_BLACK = 'AMOLED_BLACK',
}

interface UseThemeReturn {}

const ThemesMap = {
  1: defaultColors,
};

export const useTheme = (): UseThemeReturn => {
  const [appTheme, setAppTheme] = useMMKVObject<number>(
    ThemePreferences.APP_THEME,
  );
  const [isDarkMode, setDarkMode] = useMMKVBoolean(ThemePreferences.DARK_MODE);
  const [isAmoledBlack, setAmoledBlack] = useMMKVBoolean(
    ThemePreferences.AMOLED_BLACK,
  );

  const themeColors = useMemo(() => {
    const defaultDeviceColorScheme = Appearance.getColorScheme();

    const lightOrDark = !isUndefined(isDarkMode)
      ? isDarkMode
        ? 'dark'
        : 'light'
      : defaultDeviceColorScheme;

    let colors = defaultTo(
      get(ThemesMap, `[${appTheme}].${lightOrDark}`),
      defaultColors.light,
    );

    if (isAmoledBlack && isDarkMode) {
      colors = {
        ...colors,
        background: '#000000',
        surface: '#000000',
      };
    }

    return colors;
  }, [appTheme, isDarkMode, isAmoledBlack]);

  return {
    theme: themeColors,
    isDarkMode,
    setAppTheme,
    setDarkMode,
    setAmoledBlack,
  };
};
