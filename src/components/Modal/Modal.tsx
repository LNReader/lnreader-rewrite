import { useTheme } from '@hooks';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import {
  Modal as PaperModal,
  ModalProps as PaperModalProps,
} from 'react-native-paper';

import { Text, Button } from '@lnreader/core';

interface ModalProps extends Omit<PaperModalProps, 'theme'> {
  title?: string;
  submitText?: string;
  onSubmit?: () => void;
  showDismissButton?: boolean;
}

const Modal: React.FC<ModalProps> = props => {
  const { theme } = useTheme();
  const { showDismissButton = true } = props;

  return (
    <PaperModal
      contentContainerStyle={[
        styles.modalCtn,
        { backgroundColor: theme.overlay3 },
      ]}
      {...props}
    >
      {props.title ? (
        <Text size={24} style={styles.modalTitle}>
          {props.title}
        </Text>
      ) : null}
      {props.children}
      <View style={styles.buttonsCtn}>
        <Button
          title={props.submitText ?? 'OK'}
          onPress={() => {
            props.onSubmit?.();
            props.onDismiss?.();
          }}
        />
        {showDismissButton ? (
          <Button title="Cancel" onPress={props.onDismiss} />
        ) : null}
      </View>
    </PaperModal>
  );
};

export default Modal;

const styles = StyleSheet.create({
  modalCtn: {
    margin: 30,
    paddingVertical: 32,
    borderRadius: 32,
  },
  modalTitle: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  buttonsCtn: {
    paddingHorizontal: 24,
    marginTop: 24,
    flexDirection: 'row-reverse',
  },
});
