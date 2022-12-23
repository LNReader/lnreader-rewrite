import React, {useMemo} from 'react';
import {SectionList, StyleSheet} from 'react-native';

import SourceFactory from 'sources/index';

import SourceCard from 'components/SourceCard/SourceCard';
import Appbar from 'components/Appbar/Appbar';
import Searchbar from 'components/Searchbar/Searchbar';

const BrowseScreen = () => {
  const sources = SourceFactory.getSources();

  const sections = useMemo(
    () => [
      {
        header: 'Sources',
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
      />
    </>
  );
};

export default BrowseScreen;

const styles = StyleSheet.create({});
