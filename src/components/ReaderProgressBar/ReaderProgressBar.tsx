import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from '@lnreader/core';
import { useAppSettings, useChapterStorage } from '@hooks';

type Props = {
  chapterId: number;
};

const ReaderProgressBar = ({ chapterId }: Props) => {
  const { bottom: paddingBottom } = useSafeAreaInsets();
  const { PROGRESS = 0 } = useChapterStorage(chapterId);
  const { READER_SHOW_PROGRESS = false } = useAppSettings();

  if (!READER_SHOW_PROGRESS) {
    return null;
  }

  return (
    <View style={[styles.progressCtn, { paddingBottom }]}>
      <Text>{PROGRESS}</Text>
    </View>
  );
};

export default ReaderProgressBar;

const styles = StyleSheet.create({
  progressCtn: {
    alignItems: 'center',
    padding: 8,
  },
});
