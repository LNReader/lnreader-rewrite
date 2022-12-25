import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import {NovelStatus} from 'database/types';
import {CoverImage, Description, SubHeader} from './Components';
import {Row, Text, IconButton} from 'components/index';
import {IMAGE_PLACEHOLDER_COLOR, Spacing} from 'theme/constants';
import {useTheme} from 'hooks/useTheme';
import SourceFactory from 'sources/SourceFactory';
import {useNovelDetailsContext} from 'contexts/NovelDetailsContext';
import {useNavigation} from '@react-navigation/native';

const NovelDetailsHeader: React.FC = () => {
  const {theme} = useTheme();
  const {goBack} = useNavigation();
  const {novel, chapters} = useNovelDetailsContext();

  const sourceName = SourceFactory.getSource(novel.sourceId)?.name;
  const coverUrl = novel.coverUrl || undefined;

  return (
    <>
      <CoverImage source={{uri: coverUrl}}>
        <IconButton
          name="arrow-left"
          containerStyle={styles.backHandler}
          onPress={goBack}
        />
        <Row style={styles.headerCtn}>
          <FastImage source={{uri: coverUrl}} style={styles.coverCtn} />
          <View style={styles.detailsCtn}>
            <Text size={16} color={theme.onSurface}>
              {novel.title}
            </Text>
            <Text
              numberOfLines={1}
              color={theme.onSurfaceVariant}
              padding={{vertical: Spacing.TINY}}>
              {novel.author}
            </Text>
            <Text numberOfLines={1} color={theme.onSurfaceVariant}>{`${
              novel.status || NovelStatus.UNKNOWN
            } • ${sourceName}`}</Text>
          </View>
        </Row>
      </CoverImage>
      <SubHeader />
      <Description />
      <Pressable
        style={styles.chaptersCtn}
        android_ripple={{color: theme.rippleColor}}>
        <Text fontWeight="bold">{`${chapters?.length} Chapters`}</Text>
      </Pressable>
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
  chaptersCtn: {
    paddingHorizontal: Spacing.M,
    paddingVertical: Spacing.S,
  },
  backHandler: {
    position: 'absolute',
    top: Spacing.XXL,
    left: Spacing.XS,
  },
});
