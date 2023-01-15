import React from 'react';
import { StyleSheet } from 'react-native';
import { Portal } from 'react-native-paper';

import { Modal, Text } from '@lnreader/core';

interface ConfirmationModalProps {
  visible: boolean;
  title: string;
  description?: string;
  onDismiss: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  title,
  description,
  visible,
  onConfirm,
  onDismiss,
}) => {
  const onSubmit = () => {
    onConfirm();
    onDismiss();
  };

  return (
    <Portal>
      <Modal
        title={title}
        visible={visible}
        onDismiss={onDismiss}
        submitText="OK"
        onSubmit={onSubmit}
      >
        {description ? <Text style={styles.descCtn}>{description}</Text> : null}
      </Modal>
    </Portal>
  );
};

export default ConfirmationModal;

const styles = StyleSheet.create({
  descCtn: {
    paddingHorizontal: 24,
  },
});
