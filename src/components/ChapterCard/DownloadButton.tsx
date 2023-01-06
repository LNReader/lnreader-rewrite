import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import { IconButton } from '@lnreader/core';
import { useDownloader, useTheme } from '@hooks';

import { DatabaseChapter } from '@database/types';
import { useNovelDetailsContext } from '@contexts/NovelDetailsContext';

type Props = {
  chapter: DatabaseChapter;
};

const DownloadButton: React.FC<Props> = ({ chapter }) => {
  const {
    novel: { sourceId },
  } = useNovelDetailsContext();
  const { theme } = useTheme();
  const { downloadChapters, downloadQueue } = useDownloader();

  if (downloadQueue?.includes(chapter.id)) {
    return (
      <ActivityIndicator
        color={theme.outline}
        size={25}
        style={styles.loading}
      />
    );
  }

  if (chapter?.downloaded) {
    return <IconButton name="check-circle" />;
  } else {
    return (
      <IconButton
        name="arrow-down-circle-outline"
        onPress={() => downloadChapters(sourceId, [chapter])}
      />
    );
  }
};

export default DownloadButton;

const styles = StyleSheet.create({
  loading: {
    padding: 8,
  },
});
