import React from 'react';
import {StyleSheet} from 'react-native';

import {LibraryNovel} from 'database/types';

import {NovelList} from 'components/index';

interface LibraryViewProps {
  categoryId: number;
  novels: LibraryNovel[];
}

const LibraryView: React.FC<LibraryViewProps> = ({novels}) => {
  return <NovelList data={novels} />;
};

export default LibraryView;

const styles = StyleSheet.create({});
