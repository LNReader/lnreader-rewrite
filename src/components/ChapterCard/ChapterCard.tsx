import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import moment from 'moment';
import {Text} from '..';

import {useTheme} from 'hooks/useTheme';
import {DatabaseChapter} from 'database/types';
import {Spacing} from 'theme/constants';
import {useNavigation} from '@react-navigation/native';

interface ChapterCardProps {
  chapter: DatabaseChapter;
  sourceId: number;
}

const ChapterCard: React.FC<ChapterCardProps> = ({chapter, sourceId}) => {
  const {theme} = useTheme();
  const {navigate} = useNavigation();

  const navigateToReader = () => navigate('ReaderScreen', {chapter, sourceId});

  return (
    <Pressable
      android_ripple={{color: theme.rippleColor}}
      style={styles.cardCtn}
      onPress={navigateToReader}>
      <Text numberOfLines={1} color={theme.onSurface}>
        {chapter.name}
      </Text>
      {chapter.dateUpload ? (
        <Text
          color={theme.onSurfaceVariant}
          numberOfLines={1}
          size={12}
          style={styles.dateCtn}>
          {moment.unix(chapter.dateUpload).format('Do MMM, YYYY')}
        </Text>
      ) : null}
    </Pressable>
  );
};

export default ChapterCard;

const styles = StyleSheet.create({
  cardCtn: {
    paddingHorizontal: Spacing.M,
    paddingVertical: Spacing.XM,
  },
  dateCtn: {
    marginTop: Spacing.TINY,
  },
});
