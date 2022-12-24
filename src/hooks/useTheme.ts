import {useMemo} from 'react';
import {Appearance} from 'react-native';
import {defaultTo, get, isUndefined} from 'lodash';
import {useMMKVBoolean, useMMKVObject} from 'react-native-mmkv';
import Color from 'color';

import {MMKVStorage} from 'utils/mmkv/mmkv';

import {ThemeColors} from 'theme/types';
import {defaultColors} from 'theme/Colors/default';
import {AMOLED_HEX, Opacity} from 'theme/constants';

interface ExtendedThemeColors extends ThemeColors {
  rippleColor?: string;
  surface1?: string;
  surface2?: string;
  surface3?: string;
  surface4?: string;
  surface5?: string;
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

const getElevationColor = (colors: ExtendedThemeColors, elevation: number) => {
  return Color(colors.surface)
    .mix(Color(colors.primary), elevation)
    .rgb()
    .string();
};

export const useTheme = (): UseThemeReturn => {
  const [appTheme, setAppTheme] = useMMKVObject<number>(
    ThemePreferences.APP_THEME,
    MMKVStorage,
  );

  const [isDarkMode, setDarkMode] = useMMKVBoolean(
    ThemePreferences.DARK_MODE,
    MMKVStorage,
  );

  const [isAmoledBlack, setAmoledBlack] = useMMKVBoolean(
    ThemePreferences.AMOLED_BLACK,
    MMKVStorage,
  );

  const themeColors = useMemo(() => {
    const defaultDeviceColorScheme = Appearance.getColorScheme();
    const appColorScheme = isDarkMode ? 'dark' : 'light';

    const colorScheme = !isUndefined(isDarkMode)
      ? appColorScheme
      : defaultDeviceColorScheme;

    let colors: ExtendedThemeColors = defaultTo(
      get(ThemesMap, `[${appTheme}].${colorScheme}`),
      defaultColors.light,
    );

    if (isAmoledBlack && isDarkMode) {
      colors = {
        ...colors,
        background: AMOLED_HEX,
        surface: AMOLED_HEX,
      };
    }

    colors = {
      ...colors,
      rippleColor: Color(colors.primary).alpha(Opacity.level2).toString(),
      surface1: getElevationColor(colors, Opacity.level1),
      surface2: getElevationColor(colors, Opacity.level2),
      surface3: getElevationColor(colors, Opacity.level3),
      surface4: getElevationColor(colors, Opacity.level4),
      surface5: getElevationColor(colors, Opacity.level5),
    };

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
