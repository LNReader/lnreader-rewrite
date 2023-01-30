import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Portal } from 'react-native-paper';
import { xor } from 'lodash-es';

import { Modal, TriStateCheckbox, Text } from '@lnreader/core';
import { useAppSettings } from '@hooks';
import { Category } from '@database/types';

interface DefaultCategoryModalProps {
  categories: Category[];
  visible: boolean;
  onDismiss: () => void;
}

const DefaultCategoryModal: React.FC<DefaultCategoryModalProps> = props => {
  const {
    UPDATES_INCLUDED_CATEGORIES = [],
    UPDATES_EXCLUDED_CATEGORIES = [],
    setAppSettings,
  } = useAppSettings();

  const onPress = (id: number) => {
    if (UPDATES_INCLUDED_CATEGORIES.includes(id)) {
      setAppSettings({
        UPDATES_INCLUDED_CATEGORIES: xor(UPDATES_INCLUDED_CATEGORIES, [id]),
        UPDATES_EXCLUDED_CATEGORIES: [...UPDATES_EXCLUDED_CATEGORIES, id],
      });
    } else if (UPDATES_EXCLUDED_CATEGORIES.includes(id)) {
      setAppSettings({
        UPDATES_EXCLUDED_CATEGORIES: xor(UPDATES_EXCLUDED_CATEGORIES, [id]),
      });
    } else {
      setAppSettings({
        UPDATES_INCLUDED_CATEGORIES: [...UPDATES_INCLUDED_CATEGORIES, id],
      });
    }
  };

  const getCheckboxStatus = (id: number) => {
    if (UPDATES_INCLUDED_CATEGORIES.includes(id)) {
      return 'checked';
    } else if (UPDATES_EXCLUDED_CATEGORIES.includes(id)) {
      return 'indeterminate';
    } else {
      return 'unchecked';
    }
  };

  return (
    <Portal>
      <Modal
        title="Categories"
        visible={props.visible}
        onDismiss={props.onDismiss}
      >
        <Text style={styles.descCtn}>
          Entries in excluded categories will not be updated even if they are
          also in included categories.
        </Text>
        <FlatList
          data={props.categories}
          extraData={[UPDATES_INCLUDED_CATEGORIES, UPDATES_EXCLUDED_CATEGORIES]}
          renderItem={({ item }) => {
            return (
              <TriStateCheckbox
                status={getCheckboxStatus(item.id)}
                label={item.name}
                onPress={() => onPress(item.id)}
              />
            );
          }}
        />
      </Modal>
    </Portal>
  );
};

export default DefaultCategoryModal;

const styles = StyleSheet.create({
  descCtn: {
    paddingHorizontal: 24,
    paddingBottom: 8,
  },
});
