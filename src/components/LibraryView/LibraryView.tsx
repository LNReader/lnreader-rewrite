import React from 'react';
import {StyleSheet} from 'react-native';

import {DatabaseNovel} from 'database/types';

import {NovelList} from 'components/index';

interface LibraryViewProps {
  categoryId: number;
  novels: DatabaseNovel[];
}

const LibraryView: React.FC<LibraryViewProps> = ({novels}) => {
  return <NovelList data={novels} />;
};

export default LibraryView;

const styles = StyleSheet.create({});
