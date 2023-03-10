import { useMemo } from 'react';
import { Appearance } from 'react-native';
import { defaultTo, get, isUndefined } from 'lodash-es';
import { useMMKVBoolean, useMMKVObject } from 'react-native-mmkv';
import Color from 'color';

import { MMKVStorage } from '@utils/mmkv/mmkv';

import { defaultColors } from '@theme/colors/default';
import { AMOLED_HEX, Opacity } from '@theme/constants';
import { ThemeColors, ThemeType } from '@theme/types';
import { tealTurquoise } from '@theme/colors/tealTurquoise';
import { yotsubaColors } from '@theme/colors/yotsuba';
import { tidalWaveColors } from '@theme/colors/tidalWave';
import { takoColors } from '@theme/colors/tako';
import { overlay } from 'react-native-paper';

interface ExtendedThemeColors extends ThemeColors {
  rippleColor?: string;
  onSurfaceDisabled?: string;
  surface1?: string;
  surface2?: string;
  surface3?: string;
  surface4?: string;
  surface5?: string;
  overlay1?: string;
  overlay2?: string;
  overlay3?: string;
  surfaceReader?: string;
}

enum ThemePreferences {
  APP_THEME = 'APP_THEME',
  DARK_MODE = 'DARK_MODE',
  AMOLED_BLACK = 'AMOLED_BLACK',
}

interface UseThemeReturn {
  themeId?: number;
  theme: ExtendedThemeColors;
  isDarkMode?: boolean;
  isAmoledBlack?: boolean;
  setAppTheme: (id: number) => void;
  setDarkMode: (val: boolean) => void;
  setAmoledBlack: (val: boolean) => void;
}

export const ThemesMap: Record<number, ThemeType> = {
  1: defaultColors,
  2: tealTurquoise,
  3: yotsubaColors,
  4: tidalWaveColors,
  5: takoColors,
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
      get(ThemesMap, `[${defaultTo(appTheme, 1)}].${colorScheme}`),
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
      onSurfaceDisabled: Color(colors.onSurface)
        .alpha(Opacity.level4)
        .rgb()
        .string(),
      surface1: getElevationColor(colors, Opacity.level1),
      surface2: getElevationColor(colors, Opacity.level2),
      surface3: getElevationColor(colors, Opacity.level3),
      surface4: getElevationColor(colors, Opacity.level4),
      surface5: getElevationColor(colors, Opacity.level5),
      overlay1: overlay(1, colors.surface),
      overlay2: overlay(2, colors.surface),
      overlay3: overlay(3, colors.surface),
      surfaceReader: Color(colors.surface).alpha(0.9).toString(),
    };

    return colors;
  }, [appTheme, isDarkMode, isAmoledBlack]);

  return {
    themeId: appTheme,
    theme: themeColors,
    isDarkMode,
    isAmoledBlack,
    setAppTheme,
    setDarkMode,
    setAmoledBlack,
  };
};
