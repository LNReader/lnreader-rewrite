import React, {useMemo} from 'react';
import {Pressable, StyleSheet, useWindowDimensions} from 'react-native';

import Image from 'react-native-fast-image';

import {DatabaseNovel} from 'database/types';
import {SourceNovel} from 'sources/types';

import Text from 'components/Text/Text';

import {Spacing} from 'theme/constants';
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
    <Pressable style={styles.novelCtn} onPress={handleOnPress}>
      <Image
        source={{uri: novel.coverUrl}}
        style={[styles.cover, {height: coverHeight}]}
      />
      <Text
        numberOfLines={2}
        fontWeight="bold"
        color={theme.onSurface}
        padding={Spacing.XS}>
        {novel.title}
      </Text>
    </Pressable>
  );
};

export default NovelItem;

const styles = StyleSheet.create({
  novelCtn: {
    flex: 1,
    margin: Spacing.XS,
  },
  cover: {
    borderRadius: 4,
  },
});
