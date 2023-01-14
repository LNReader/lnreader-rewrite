import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Portal } from 'react-native-paper';

import { Modal, RadioButton } from '@lnreader/core';
import { useAppSettings } from '@hooks';
import { Setting } from 'types/Settings';
import { Category } from '@database/types';

interface DefaultCategoryModalProps {
  categories: Category[];
  visible: boolean;
  onDismiss: () => void;
}

const DefaultCategoryModal: React.FC<DefaultCategoryModalProps> = props => {
  const { DEFAULT_CATEGORY = 1, setAppSetting } = useAppSettings();

  return (
    <Portal>
      <Modal
        title="Default Categories"
        visible={props.visible}
        onDismiss={props.onDismiss}
      >
        <FlatList
          data={props.categories}
          renderItem={({ item }) => (
            <RadioButton
              status={item.id === DEFAULT_CATEGORY}
              value={item.id}
              label={item.name}
              onPress={() => setAppSetting(Setting.DEFAULT_CATEGORY, item.id)}
            />
          )}
        />
      </Modal>
    </Portal>
  );
};

export default DefaultCategoryModal;

const styles = StyleSheet.create({});
