import React, {useMemo} from 'react';
import {SectionList, StyleSheet} from 'react-native';

import {useTheme} from 'hooks/useTheme';
import SourceFactory from 'sources/SourceFactory';

import SourceCard from 'components/SourceCard/SourceCard';
import Searchbar from 'components/Searchbar/Searchbar';
import Text from 'components/Text/Text';
import {Spacing} from 'theme/constants';

const BrowseScreen = () => {
  const {theme} = useTheme();
  const sources = SourceFactory.getSources();

  const sections = useMemo(
    () => [
      {
        header: 'All',
        data: sources,
      },
    ],
    [sources],
  );

  return (
    <>
      <Searchbar placeholder="Search sources" />
      <SectionList
        sections={sections}
        renderItem={({item}) => <SourceCard source={item} />}
        renderSectionHeader={({section: {header}}) => (
          <Text
            color={theme.onSurfaceVariant}
            padding={{horizontal: Spacing.M, vertical: Spacing.XS}}>
            {header}
          </Text>
        )}
      />
    </>
  );
};

export default BrowseScreen;

const styles = StyleSheet.create({});
