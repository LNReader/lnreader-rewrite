import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {useTheme} from 'hooks/useTheme';

import {Source} from 'sources/types';

import Text from 'components/Text/Text';

interface SourceCardProps {
  source: Source;
}

const SourceCard: React.FC<SourceCardProps> = ({source}) => {
  const {name, lang, iconUrl} = source;

  const {theme} = useTheme();

  return (
    <Pressable style={styles.sourceCardCtn}>
      <Image source={{uri: iconUrl}} style={styles.icon} />
      <View style={styles.infoCtn}>
        <Text color={theme.onSurface}>{name}</Text>
        <Text color={theme.onSurfaceVariant} size={12}>
          {lang}
        </Text>
      </View>
    </Pressable>
  );
};

export default SourceCard;

const styles = StyleSheet.create({
  sourceCardCtn: {
    padding: 16,
    flexDirection: 'row',
  },
  infoCtn: {
    marginLeft: 16,
  },
  icon: {
    backgroundColor: 'blue',
    height: 40,
    width: 40,
    borderRadius: 4,
  },
});
