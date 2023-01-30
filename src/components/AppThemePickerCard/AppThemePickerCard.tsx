import React, { useMemo } from 'react';
import { Appearance, Pressable, StyleSheet, View } from 'react-native';
import { get, isUndefined } from 'lodash-es';
import Color from 'color';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Row, Text } from '@lnreader/core';
import { useTheme } from '@hooks';

import { ThemeType } from '@theme/types';
import { Opacity } from '@theme/constants';

type AppThemePickerCardProps = {
  theme: ThemeType;
};

const AppThemePickerCard: React.FC<AppThemePickerCardProps> = ({ theme }) => {
  const { isDarkMode, themeId = 1, setAppTheme } = useTheme();

  const selected = themeId === theme.id;

  const colors = useMemo(() => {
    const defaultDeviceColorScheme = Appearance.getColorScheme();
    const appColorScheme = isDarkMode ? 'dark' : 'light';

    const colorScheme = !isUndefined(isDarkMode)
      ? appColorScheme
      : defaultDeviceColorScheme;

    return get(theme, `${colorScheme}`);
  }, [isDarkMode]);

  return (
    <View>
      <View
        style={[
          styles.mainCtn,
          {
            borderColor: selected ? colors?.primary : colors?.outlineVariant,
            backgroundColor: colors?.background,
          },
        ]}
      >
        <Pressable
          style={styles.pressableCtn}
          android_ripple={{
            color: Color(colors?.primary).alpha(Opacity.level2).toString(),
          }}
          onPress={() => setAppTheme(theme.id)}
        >
          {selected && (
            <Icon
              name="check"
              size={16}
              color={colors?.onPrimary}
              style={[styles.iconCtn, { backgroundColor: colors?.primary }]}
            />
          )}
          <View>
            <View
              style={[styles.headerCtn, { backgroundColor: colors?.onSurface }]}
            />
            <View
              style={[
                styles.cardCtn,
                { backgroundColor: colors?.surfaceVariant },
              ]}
            >
              <View
                style={[
                  styles.badgeCtn1,
                  { backgroundColor: colors?.tertiary },
                ]}
              />
              <View
                style={[styles.badgeCtn2, { backgroundColor: colors?.primary }]}
              />
            </View>
          </View>
          <View
            style={[
              styles.navbarCtn,
              { backgroundColor: colors?.surfaceVariant },
            ]}
          >
            <Row>
              <View
                style={[
                  styles.navbarCtn1,
                  { backgroundColor: colors?.primary },
                ]}
              />
              <View
                style={[
                  styles.navbarCtn2,
                  { backgroundColor: colors?.onSurfaceVariant },
                ]}
              />
            </Row>
          </View>
        </Pressable>
      </View>
      <Text style={styles.nameCtn}>{theme.name}</Text>
    </View>
  );
};

export default AppThemePickerCard;

const styles = StyleSheet.create({
  mainCtn: {
    borderRadius: 12,
    borderWidth: 4,
    marginHorizontal: 4,
    overflow: 'hidden',
    height: 180,
    width: 116,
    alignSelf: 'center',
  },
  pressableCtn: {
    flex: 1,
    justifyContent: 'space-between',
  },
  headerCtn: {
    height: 14,
    margin: 8,
    borderRadius: 6,
    width: 50,
  },
  nameCtn: {
    padding: 4,
    textAlign: 'center',
  },
  cardCtn: {
    width: 44,
    height: 56,
    borderRadius: 6,
    marginHorizontal: 8,
    padding: 4,
    flexDirection: 'row',
  },
  badgeCtn1: {
    height: 12,
    width: 10,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  badgeCtn2: {
    height: 12,
    width: 10,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  navbarCtn: {
    height: 24,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  navbarCtn1: {
    height: 12,
    width: 12,
    borderRadius: 50,
  },
  navbarCtn2: {
    flex: 1,
    height: 12,
    marginLeft: 8,
    borderRadius: 4,
  },
  iconCtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    borderRadius: 50,
  },
});
