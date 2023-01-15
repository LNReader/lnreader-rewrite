import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import React, { useMemo } from 'react';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';

import { Text } from '@lnreader/core';
import { useTheme } from '@hooks';
import { useLibraryContext } from '@contexts/LibraryContext';
import { SourceNovel } from '@sources/types';

type Props = {
  novel: SourceNovel;
};

const GlobalSearchNovelItem: React.FC<Props> = ({ novel }) => {
  const { navigate } = useNavigation();
  const { theme } = useTheme();
  const { novels: libraryNovels } = useLibraryContext();

  const onPress = () => {
    navigate('NovelDetailsScreen', novel);
  };

  const isInLibrary = libraryNovels.some(
    libraryNovel => libraryNovel.url === novel.url,
  );

  const coverDimensions = useMemo(
    () => ({
      width: Dimensions.get('window').width / 3 - 16,
      height: ((Dimensions.get('window').width / 3 - 16) * 4) / 3,
      opacity: isInLibrary ? 0.5 : 1,
    }),
    [isInLibrary],
  );

  return (
    <View style={styles.mainCtn}>
      <Pressable
        style={styles.pressableCtn}
        android_ripple={{ color: theme.rippleColor }}
        onPress={onPress}
      >
        {isInLibrary && (
          <Text
            size={12}
            color={theme.onPrimary}
            style={[styles.inLibraryBadge, { backgroundColor: theme.primary }]}
          >
            {'In Library'}
          </Text>
        )}
        <FastImage
          source={{ uri: novel.coverUrl }}
          style={[coverDimensions, styles.coverCtn]}
        />
        <Text style={[styles.titleText, { width: coverDimensions.width }]}>
          {novel.title}
        </Text>
      </Pressable>
    </View>
  );
};

export default GlobalSearchNovelItem;

const styles = StyleSheet.create({
  mainCtn: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 6,
  },
  pressableCtn: {
    padding: 4,
    flex: 1,
  },
  titleText: {
    paddingHorizontal: 2,
    paddingVertical: 4,
    fontSize: 12,
    fontWeight: 'bold',
  },
  coverCtn: {
    borderRadius: 4,
  },
  inLibraryBadge: {
    zIndex: 1,
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 4,
    borderRadius: 4,
  },
});
