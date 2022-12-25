import React, {useMemo} from 'react';
import {Pressable, StyleSheet, useWindowDimensions, View} from 'react-native';

import Image from 'react-native-fast-image';

import {DatabaseNovel} from 'database/types';
import {SourceNovel} from 'sources/types';

import Text from 'components/Text/Text';

import {IMAGE_PLACEHOLDER_COLOR, Spacing} from 'theme/constants';
import {useTheme} from 'hooks/useTheme';
import {useNavigation} from '@react-navigation/native';

interface NovelItemProps {
  novel: SourceNovel | DatabaseNovel;
}

const NovelItem: React.FC<NovelItemProps> = ({novel}) => {
  const {theme} = useTheme();
  const {navigate} = useNavigation();
  const window = useWindowDimensions();

  const coverHeight = useMemo(() => (window.width / 3) * (4 / 3), []);

  const handleOnPress = () => {
    navigate('NovelDetailsScreen', novel);
  };

  return (
    <View style={styles.novelCtn}>
      <Pressable
        style={styles.pressable}
        onPress={handleOnPress}
        android_ripple={{color: theme.rippleColor}}>
        <Image
          source={{uri: novel.coverUrl || undefined}}
          style={[styles.cover, {height: coverHeight}]}
        />
        <Text
          numberOfLines={2}
          fontWeight="bold"
          color={theme.onSurface}
          padding={Spacing.XS}
          size={12}>
          {novel.title}
        </Text>
      </Pressable>
    </View>
  );
};

export default NovelItem;

const styles = StyleSheet.create({
  novelCtn: {
    flex: 1 / 3,
    borderRadius: 6,
    overflow: 'hidden',
  },
  pressable: {
    flex: 1,
    padding: Spacing.S,
    paddingBottom: Spacing.XS,
  },
  cover: {
    borderRadius: 4,
    backgroundColor: IMAGE_PLACEHOLDER_COLOR,
  },
});
