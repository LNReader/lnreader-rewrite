import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Portal } from 'react-native-paper';
import { isNumber, xor } from 'lodash';

import { Modal, Checkbox, Text } from '@lnreader/core';
import { useCategories } from '@hooks';
import { useNavigation } from '@react-navigation/native';
import { updateNovelCategoryByIds } from '@database/queries/NovelQueries';

interface SetCategoriesModalProps {
  novelIds: number[];
  selectedCategories: number[];
  visible: boolean;
  onDismiss: () => void;
}

const SetCategoriesModal: React.FC<SetCategoriesModalProps> = ({
  onDismiss,
  selectedCategories,
  visible,
  novelIds,
}) => {
  const { navigate } = useNavigation();
  const { categories } = useCategories({ lazy: visible });
  const [newCategories, setNewCategories] = useState(
    selectedCategories.filter(id => id !== 1),
  );

  const isCategoriesListEmpty = !categories.length;

  useEffect(() => {
    setNewCategories(selectedCategories);
  }, [JSON.stringify(selectedCategories)]);

  return (
    <Portal>
      <Modal
        title="Set categories"
        visible={visible}
        onDismiss={onDismiss}
        submitText={isCategoriesListEmpty ? 'Edit categories' : 'OK'}
        showDismissButton={!isCategoriesListEmpty}
        onSubmit={() => {
          if (!isCategoriesListEmpty) {
            updateNovelCategoryByIds(novelIds, newCategories);
          } else {
            navigate('MoreStack', {
              screen: 'CategoriesScreen',
            });
          }
        }}
      >
        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <Checkbox
              status={newCategories.includes(item.id)}
              label={item.name}
              onPress={() =>
                setNewCategories(prevVal => xor(prevVal, [item.id]))
              }
            />
          )}
          ListEmptyComponent={
            <Text padding={{ horizontal: 24 }}>
              You don't have any categories yet.
            </Text>
          }
        />
      </Modal>
    </Portal>
  );
};

export default SetCategoriesModal;

const styles = StyleSheet.create({});
