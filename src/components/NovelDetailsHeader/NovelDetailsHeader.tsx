import React from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import {DatabaseNovel, NovelStatus} from 'database/types';
import {CoverImage, SubHeader} from './Components';
import {Row, Text} from '..';
import {IMAGE_PLACEHOLDER_COLOR, Spacing} from 'theme/constants';
import {useTheme} from 'hooks/useTheme';
import SourceFactory from 'sources/SourceFactory';

interface NovelDetailsHeader {
  novel: DatabaseNovel;
}

const NovelDetailsHeader: React.FC<NovelDetailsHeader> = ({novel}) => {
  const {theme} = useTheme();

  const sourceName = SourceFactory.getSource(novel.sourceId)?.name;

  return (
    <>
      <CoverImage source={{uri: novel.coverUrl}}>
        <Row style={styles.headerCtn}>
          <FastImage source={{uri: novel.coverUrl}} style={styles.coverCtn} />
          <View style={styles.detailsCtn}>
            <Text size={16} color={theme.onSurface}>
              {novel.title}
            </Text>
            <Text numberOfLines={1} color={theme.onSurfaceVariant}>
              {novel.author}
            </Text>
            <Text numberOfLines={1} color={theme.onSurfaceVariant}>{`${
              novel.status || NovelStatus.UNKNOWN
            }${sourceName ? ' • ' + sourceName : ''}`}</Text>
          </View>
        </Row>
      </CoverImage>
      <SubHeader novel={novel} />
    </>
  );
};

export default NovelDetailsHeader;

const styles = StyleSheet.create({
  coverCtn: {
    height: 150,
    width: 100,
    borderRadius: 6,
    backgroundColor: IMAGE_PLACEHOLDER_COLOR,
  },
  headerCtn: {
    flex: 1,
    padding: Spacing.M,
  },
  detailsCtn: {
    flex: 1,
    padding: Spacing.M,
  },
});
