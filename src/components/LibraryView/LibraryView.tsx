import React from 'react';
import {StyleSheet, View} from 'react-native';

import {DatabaseNovel} from 'database/types';

import {Text, NovelList} from 'components/index';

interface LibraryViewProps {
  categoryId: number;
  novels: DatabaseNovel[];
}

const LibraryView: React.FC<LibraryViewProps> = ({categoryId, novels}) => {
  return <NovelList data={novels} />;
};

export default LibraryView;

const styles = StyleSheet.create({});
