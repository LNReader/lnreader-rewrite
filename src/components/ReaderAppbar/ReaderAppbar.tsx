import React from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

import {useTheme} from 'hooks/useTheme';
import {SourceChapter} from 'sources/types';

import {IconButton, Text, Row} from 'components/index';
import {Spacing} from 'theme/constants';

type Props = {
  visible: boolean;
  chapter?: SourceChapter;
  novelName: string;
};

const ReaderAppbar = (props: Props) => {
  const {theme} = useTheme();
  const {goBack} = useNavigation();
  const {top: topInset} = useSafeAreaInsets();

  if (!props.visible) {
    return null;
  }

  return (
    <Animated.View
      entering={FadeIn.duration(500)}
      exiting={FadeOut.duration(500)}
      style={[
        styles.appbarCtn,
        {backgroundColor: theme.surface2, paddingTop: topInset},
      ]}>
      <Row style={styles.contentCtn}>
        <IconButton name="arrow-left" onPress={goBack} />
        <View style={styles.flex}>
          <Text size={20}>{props.novelName}</Text>
          <Text size={16}>{props.chapter?.name}</Text>
        </View>
        <IconButton name="earth" onPress={goBack} />
      </Row>
    </Animated.View>
  );
};

export default ReaderAppbar;

const styles = StyleSheet.create({
  appbarCtn: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 4,
  },
  flex: {
    flex: 1,
  },
  contentCtn: {
    paddingVertical: Spacing.S,
  },
});
