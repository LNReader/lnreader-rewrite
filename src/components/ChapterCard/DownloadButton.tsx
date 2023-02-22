import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import { IconButton } from '@lnreader/core';
import { useDownloader, useTheme } from '@hooks';

import { DatabaseChapter } from '@database/types';
import { useNovelDetailsContext } from '@contexts/NovelDetailsContext';

type Props = {
  sourceId?: number;
  chapter: DatabaseChapter;
};

const DownloadButton: React.FC<Props> = ({
  chapter,
  sourceId: novelSourceId,
}) => {
  const {
    novel: { sourceId = novelSourceId },
  } = useNovelDetailsContext();
  const { theme } = useTheme();
  const { downloadChapters, downloadQueue, downloadErrors } = useDownloader();

  if (downloadErrors?.includes(chapter.id)) {
    return (
      <IconButton
        name="information-outline"
        color={theme.error}
        onPress={() => downloadChapters([chapter], sourceId)}
      />
    );
  }

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
        onPress={() => downloadChapters([chapter], sourceId)}
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
