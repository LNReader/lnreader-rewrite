import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';

import { Modal, TextInput, Switch } from '@lnreader/core';
import { useNovelDetailsContext } from '@contexts/NovelDetailsContext';
import { DatabaseChapter } from '@database/types';

interface JumpToChapterModalProps {
  listRef: FlashList<DatabaseChapter> | null;
  visible: boolean;
  onDismiss: () => void;
}

enum Mode {
  ChapterName,
  ChapterNumber,
}

const JumpToChapterModal: React.FC<JumpToChapterModalProps> = ({
  visible,
  listRef,
  onDismiss,
}) => {
  const [mode, setMode] = useState<Mode>(Mode.ChapterNumber);
  const [searchText, setSearchText] = useState<string>('');

  const { chapters } = useNovelDetailsContext();

  const isChapterNameMode = mode === Mode.ChapterName;

  const label = isChapterNameMode ? 'Chapter name' : 'Chapter number';

  const onSubmit = () => {
    let index = 0;

    if (Mode.ChapterNumber) {
      index = +searchText;
    } else {
      const exactMatch = chapters?.findIndex(
        chapter => chapter.name.toLowerCase() === searchText?.toLowerCase(),
      );

      if (exactMatch) {
        index = exactMatch;
      } else {
        const firstMatch = chapters?.findIndex(chapter =>
          chapter.name.toLowerCase().includes(searchText?.toLowerCase()),
        );

        if (firstMatch) {
          index = firstMatch;
        }
      }
    }

    listRef?.scrollToIndex({
      index,
      animated: true,
      viewOffset: 200,
    });
  };

  return (
    <Modal
      title="Jump to chapter"
      visible={visible}
      onDismiss={onDismiss}
      onSubmit={onSubmit}
    >
      <TextInput
        autoFocus
        placeholder={label}
        style={styles.contentCtn}
        onChangeText={setSearchText}
        keyboardType={!isChapterNameMode ? 'numeric' : undefined}
      />
      <Switch
        value={isChapterNameMode}
        title="Chapter name"
        onPress={() =>
          setMode(prevVal =>
            prevVal === Mode.ChapterName
              ? Mode.ChapterNumber
              : Mode.ChapterName,
          )
        }
        style={styles.switchCtn}
      />
    </Modal>
  );
};

export default JumpToChapterModal;

const styles = StyleSheet.create({
  contentCtn: {
    marginHorizontal: 24,
  },
  switchCtn: {
    paddingHorizontal: 24,
    marginTop: 8,
  },
});
