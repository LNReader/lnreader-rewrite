import { Pressable, StyleSheet } from 'react-native';
import React, { useMemo } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';

import { Appbar, Row, Text } from '@lnreader/core';
import { Source } from '@sources/types';
import { useLibraryContext } from '@contexts/LibraryContext';
import { FlashList } from '@shopify/flash-list';
import FastImage from 'react-native-fast-image';
import { useTheme } from '@hooks';

type MigrationSourceNovelsScreenRouteProps = RouteProp<{
  params: {
    source: Source;
  };
}>;

const MigrationSourceNovelsScreen = () => {
  const { theme } = useTheme();
  const {
    params: { source },
  } = useRoute<MigrationSourceNovelsScreenRouteProps>();
  const { novels: libraryNovels } = useLibraryContext();

  const novels = useMemo(
    () => libraryNovels.filter(novel => novel.sourceId === source.id),
    [libraryNovels],
  );

  return (
    <>
      <Appbar title={source.name} />
      <FlashList
        data={novels}
        estimatedItemSize={100}
        renderItem={({ item }) => (
          <Pressable
            android_ripple={{ color: theme.rippleColor }}
            style={styles.mainCtn}
          >
            <Row>
              <FastImage
                source={{ uri: item.coverUrl || undefined }}
                style={styles.coverCtn}
              />
              <Text>{item.title}</Text>
            </Row>
          </Pressable>
        )}
      />
    </>
  );
};

export default MigrationSourceNovelsScreen;

const styles = StyleSheet.create({
  coverCtn: {
    height: 40,
    width: 40,
    borderRadius: 4,
    marginRight: 16,
  },
  mainCtn: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
