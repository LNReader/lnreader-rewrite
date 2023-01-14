import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMMKVObject } from 'react-native-mmkv';
import { xor } from 'lodash';

import { IconButton, Text } from '@lnreader/core';
import { useAppSettings, useTheme } from '@hooks';
import { Source } from '@sources/types';

import { IMAGE_PLACEHOLDER_COLOR, Spacing } from '@theme/constants';
import { Setting } from 'types/Settings';

interface SourceCardProps {
  source: Source;
}

const SourceCard: React.FC<SourceCardProps> = ({ source }) => {
  const { theme } = useTheme();
  const { navigate } = useNavigation();
  const { PINNED_SOURCES, setAppSettings } = useAppSettings();
  const { id, name, lang, iconUrl } = source;

  const onPress = () => {
    navigate('SourceScreen', { sourceId: source.id });
    setAppSettings(Setting.LAST_USED_SOURCE_ID, id);
  };

  const handlePinSource = () => {
    setAppSettings(Setting.PINNED_SOURCES, xor(PINNED_SOURCES, [id]));
  };

  const isPinned = PINNED_SOURCES?.includes(id);

  return (
    <Pressable
      style={styles.sourceCardCtn}
      onPress={onPress}
      android_ripple={{ color: theme.rippleColor }}
    >
      <Image source={{ uri: iconUrl }} style={styles.icon} />
      <View style={styles.infoCtn}>
        <Text color={theme.onSurface}>{name}</Text>
        <Text color={theme.onSurfaceVariant} size={12}>
          {lang}
        </Text>
      </View>
      <IconButton
        name={isPinned ? 'pin' : 'pin-outline'}
        size={22}
        onPress={handlePinSource}
      />
    </Pressable>
  );
};

export default SourceCard;

const styles = StyleSheet.create({
  sourceCardCtn: {
    paddingHorizontal: Spacing.M,
    paddingVertical: Spacing.XM,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoCtn: {
    flex: 1,
    marginLeft: 16,
  },
  icon: {
    backgroundColor: IMAGE_PLACEHOLDER_COLOR,
    height: 40,
    width: 40,
    borderRadius: 4,
  },
});
