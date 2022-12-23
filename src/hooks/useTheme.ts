import {useMemo} from 'react';
import {Appearance} from 'react-native';
import {defaultTo, get, isUndefined} from 'lodash';
import {useMMKVBoolean, useMMKVObject} from 'react-native-mmkv';
import Color from 'color';

import {defaultColors} from 'theme/Colors/default';
import {ThemeColors} from 'theme/types';

interface ExtendedThemeColors extends ThemeColors {
  rippleColor?: string;
}

enum ThemePreferences {
  APP_THEME = 'APP_THEME',
  DARK_MODE = 'DARK_MODE',
  AMOLED_BLACK = 'AMOLED_BLACK',
}

interface UseThemeReturn {
  theme: ExtendedThemeColors;
  isDarkMode?: boolean;
  setAppTheme: (id: number) => void;
  setDarkMode: (val: boolean) => void;
  setAmoledBlack: (val: boolean) => void;
}

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

    let colors: ExtendedThemeColors = defaultTo(
      get(ThemesMap, `[${appTheme}].${lightOrDark}`),
      defaultColors.light,
    );

    colors = {
      ...colors,
      rippleColor: Color(colors.primary).alpha(0.12).toString(),
    };

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
