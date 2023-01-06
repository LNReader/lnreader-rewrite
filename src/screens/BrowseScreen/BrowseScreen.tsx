import React, { useMemo } from 'react';
import { SectionList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Searchbar, Text } from '@lnreader/core';
import { useAppSettings, useSearchText, useTheme } from '@hooks';
import SourceFactory from '@sources/SourceFactory';

import SourceCard from '@components/SourceCard/SourceCard';
import { Spacing } from '@theme/constants';
import { Language } from '@sources/types';

const BrowseScreen = () => {
  const { theme } = useTheme();
  const { navigate } = useNavigation();
  const { searchText, setSearchText } = useSearchText();
  const {
    LAST_USED_SOURCE_ID,
    PINNED_SOURCES,
    ONLY_SHOW_PINNED_SOURCES,
    SOURCE_LANGUAGES = [Language.English],
  } = useAppSettings();
  const sources = SourceFactory.getSources();

  const filteredSources = sources
    .filter(source => SOURCE_LANGUAGES.includes(source.lang))
    .filter(source =>
      source.name.toLowerCase().includes(searchText.toLowerCase()),
    );

  const lastUsedSource = filteredSources.find(
    source => source.id === LAST_USED_SOURCE_ID,
  );
  const pinnedSources = filteredSources.filter(source =>
    PINNED_SOURCES?.includes(source.id),
  );

  const sections = useMemo(() => {
    const sectionsArr = [];

    if (lastUsedSource) {
      sectionsArr.push({
        header: 'Last used',
        data: [lastUsedSource],
      });
    }

    if (pinnedSources.length) {
      sectionsArr.push({
        header: 'Pinned',
        data: pinnedSources,
      });
    }

    if (!ONLY_SHOW_PINNED_SOURCES) {
      sectionsArr.push({
        header: 'All',
        data: filteredSources,
      });
    }
    return sectionsArr;
  }, [
    filteredSources,
    pinnedSources,
    lastUsedSource,
    ONLY_SHOW_PINNED_SOURCES,
  ]);

  return (
    <>
      <Searchbar
        placeholder="Search sources"
        value={searchText}
        onChangeText={setSearchText}
        actions={[
          {
            icon: 'cog-outline',
            onPress: () => navigate('BrowseSettingsScreen'),
          },
        ]}
      />
      <SectionList
        sections={sections}
        renderItem={({ item }) => <SourceCard source={item} />}
        renderSectionHeader={({ section: { header } }) => (
          <Text
            color={theme.onSurfaceVariant}
            padding={{ horizontal: Spacing.M, vertical: Spacing.XS }}
          >
            {header}
          </Text>
        )}
      />
    </>
  );
};

export default BrowseScreen;

const styles = StyleSheet.create({});
