import React from 'react';
import { StyleSheet } from 'react-native';
import { Portal } from 'react-native-paper';

import { Modal, Checkbox } from '@lnreader/core';
import { useAppSettings } from '@hooks';
import { Setting } from 'types/Settings';
import { skipUpdatingEntriesLabels } from '@utils/UpdateUtils';

interface SkipUpdatingEntriesModalProps {
  visible: boolean;
  onDismiss: () => void;
}

const SkipUpdatingEntriesModal: React.FC<
  SkipUpdatingEntriesModalProps
> = props => {
  const {
    SKIP_UPDATING_COMPLETED_NOVELS,
    SKIP_UPDATING_NOVELS_NOT_STARTED,
    SKIP_UPDATING_NOVELS_WITH_UNREAD_CHAPTERS,
    toggleSetting,
  } = useAppSettings();

  return (
    <Portal>
      <Modal
        title="Skip updating entries"
        visible={props.visible}
        onDismiss={props.onDismiss}
      >
        <Checkbox
          status={SKIP_UPDATING_NOVELS_WITH_UNREAD_CHAPTERS}
          label={
            skipUpdatingEntriesLabels.SKIP_UPDATING_NOVELS_WITH_UNREAD_CHAPTERS
          }
          onPress={() =>
            toggleSetting(Setting.SKIP_UPDATING_NOVELS_WITH_UNREAD_CHAPTERS)
          }
        />
        <Checkbox
          status={SKIP_UPDATING_NOVELS_NOT_STARTED}
          label={skipUpdatingEntriesLabels.SKIP_UPDATING_NOVELS_NOT_STARTED}
          onPress={() =>
            toggleSetting(Setting.SKIP_UPDATING_NOVELS_NOT_STARTED)
          }
        />
        <Checkbox
          status={SKIP_UPDATING_COMPLETED_NOVELS}
          label={skipUpdatingEntriesLabels.SKIP_UPDATING_COMPLETED_NOVELS}
          onPress={() => toggleSetting(Setting.SKIP_UPDATING_COMPLETED_NOVELS)}
        />
      </Modal>
    </Portal>
  );
};

export default SkipUpdatingEntriesModal;

const styles = StyleSheet.create({});
