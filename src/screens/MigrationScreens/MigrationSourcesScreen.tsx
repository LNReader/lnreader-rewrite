import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import React, { useMemo } from 'react';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';

import { Appbar, Row, Text } from '@lnreader/core';
import { useTheme } from '@hooks';
import { useLibraryContext } from '@contexts/LibraryContext';
import SourceFactory from '@sources/SourceFactory';
import { Source } from '@sources/types';

const MigrationSourcesScreen = () => {
  const { theme } = useTheme();
  const { navigate } = useNavigation();
  const { novels } = useLibraryContext();
  const sources = SourceFactory.getSources();

  const data = useMemo(
    () =>
      sources
        .map(source => {
          const novelsCount = novels.filter(
            novel => novel.sourceId === source.id,
          ).length;

          if (novelsCount) {
            return {
              ...source,
              novelsCount,
            };
          }
        })
        .filter(Boolean),
    [novels],
  );

  const onPress = (source: Source) =>
    navigate('MigrationSourceNovelsScreen', { source });

  return (
    <>
      <Appbar title="Migrate" />
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Pressable
            style={styles.mainCtn}
            android_ripple={{ color: theme.rippleColor }}
            onPress={() => onPress(item as Source)}
          >
            <Row>
              <FastImage
                source={{ uri: item?.iconUrl }}
                style={styles.coverCtn}
              />
              <View>
                <Text>{item?.name}</Text>
                <Text size={12} color={theme.onSurfaceVariant}>
                  {item?.lang}
                </Text>
              </View>
            </Row>
            {item?.novelsCount ? (
              <Text
                color={theme.onPrimary}
                style={[
                  styles.novelCountCtn,
                  { backgroundColor: theme.primary },
                ]}
              >
                {item?.novelsCount}
              </Text>
            ) : null}
          </Pressable>
        )}
      />
    </>
  );
};

export default MigrationSourcesScreen;

const styles = StyleSheet.create({
  mainCtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  coverCtn: {
    height: 40,
    width: 40,
    borderRadius: 4,
    marginRight: 16,
  },
  novelCountCtn: {
    borderRadius: 4,
    paddingHorizontal: 4,
    fontSize: 12,
    fontWeight: 'bold',
  },
});
