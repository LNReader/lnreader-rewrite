import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {useTheme} from 'hooks/useTheme';

import {Source} from 'sources/types';

import Text from 'components/Text/Text';
import {IMAGE_PLACEHOLDER_COLOR, Spacing} from 'theme/constants';
import {useNavigation} from '@react-navigation/native';
import SourceFactory from 'sources/SourceFactory';
import {MMKVStorage} from 'utils/mmkv/mmkv';
import {SourceSettingTypes} from 'utils/settings/constants';
import {useMMKVObject, useMMKVString} from 'react-native-mmkv';
import IconButton from 'components/IconButton/IconButton';
import {xor} from 'lodash';

interface SourceCardProps {
  source: Source;
}

const SourceCard: React.FC<SourceCardProps> = ({source}) => {
  const {id, name, lang, iconUrl} = source;

  const {theme} = useTheme();

  const {navigate} = useNavigation();

  const onPress = () => navigate('SourceScreen', {sourceId: source.id});

  const [pinnedSources, setPinnedSources] = useMMKVObject<number[]>(
    SourceSettingTypes.PINNED_SOURCES,
    MMKVStorage,
  );

  const handlePinSource = () => {
    setPinnedSources(xor(pinnedSources, [id]));
  };

  const isPinned = pinnedSources?.includes(id);

  return (
    <Pressable style={styles.sourceCardCtn} onPress={onPress}>
      <Image source={{uri: iconUrl}} style={styles.icon} />
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
