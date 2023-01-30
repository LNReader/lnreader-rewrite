import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { isUndefined } from 'lodash-es';

import { Modal, TextInput, ToastAndroid } from '@lnreader/core';
import {
  createCategory,
  isCategoryDuplicate,
  updateCategory,
} from '@database/queries/CategoryQueries';
import { Category } from '@database/types';
import { Portal } from 'react-native-paper';

interface AddCategoryModalProps {
  category?: Category;
  visible: boolean;
  onDismiss: () => void;
  onSuccess: () => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = props => {
  const [name, setName] = useState(props.category?.name || '');
  const isEditMode = !isUndefined(props.category);

  const onSubmit = async () => {
    const isDuplicate = await isCategoryDuplicate(name);

    if (isDuplicate) {
      ToastAndroid.show('A category with this name already exists!');
    } else {
      if (isUndefined(props.category)) {
        createCategory(name);
      } else {
        updateCategory(props.category?.id, name);
      }
      props.onSuccess();
    }
    setName('');
  };

  return (
    <Portal>
      <Modal
        title={`${isEditMode ? 'Edit' : 'Add'} Category`}
        visible={props.visible}
        onDismiss={props.onDismiss}
        submitText={isEditMode ? 'OK' : 'Add'}
        onSubmit={onSubmit}
      >
        <TextInput
          autoFocus
          label="Name"
          defaultValue={name}
          onChangeText={setName}
          style={styles.contentCtn}
        />
      </Modal>
    </Portal>
  );
};

export default AddCategoryModal;

const styles = StyleSheet.create({
  contentCtn: {
    marginHorizontal: 24,
  },
});
