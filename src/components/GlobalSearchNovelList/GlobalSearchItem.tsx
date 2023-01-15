import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { IconButton, Text } from '@lnreader/core';
import { useTheme } from '@hooks';
import { GlobalSearchResult } from '@hooks/useGlobalSearch';

import GlobalSearchNovelItem from './GlobalSearchNovelItem';

type Props = {
  data: GlobalSearchResult;
  searchText?: string;
};

const GlobalSearchItem = ({ data, searchText }: Props) => {
  const { theme } = useTheme();
  const { navigate } = useNavigation();
  const { source, loading, novels, error } = data;

  const onPress = () => {
    navigate('SourceScreen', { sourceId: source.id, searchText });
  };

  return (
    <>
      <Pressable
        style={styles.headerCtn}
        android_ripple={{ color: theme.rippleColor }}
        onPress={onPress}
      >
        <View>
          <Text fontWeight="bold">{source.name}</Text>
          <Text size={12} color={theme.onSurfaceVariant}>
            {source.lang}
          </Text>
        </View>
        <IconButton name="arrow-right" onPress={onPress} />
      </Pressable>
      {loading ? (
        <ActivityIndicator style={styles.loadingCtn} color={theme.primary} />
      ) : error ? (
        <Text style={styles.errorCtn} color={theme.error}>
          {error?.message}
        </Text>
      ) : (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.novelsCtn}
          data={novels}
          renderItem={({ item }) => <GlobalSearchNovelItem novel={item} />}
          ListEmptyComponent={
            <Text color={theme.onSurfaceVariant} style={styles.emptyCtn}>
              No results found
            </Text>
          }
        />
      )}
    </>
  );
};

export default GlobalSearchItem;

const styles = StyleSheet.create({
  headerCtn: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  novelsCtn: {
    paddingHorizontal: 12,
  },
  loadingCtn: {
    padding: 16,
  },
  errorCtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  emptyCtn: {
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
});
