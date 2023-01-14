import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text, Row, IconButton } from '..';
import { Category } from '@database/types';
import { useBoolean, useTheme } from '@hooks';
import AddCategoryModal from '@components/AddCategoryModal/AddCategoryModal';
import { deleteCategoryById } from '@database/queries/CategoryQueries';
import ConfirmationModal from '@components/ConfirmationModal/ConfirmationModal';

type CategoryCardProps = {
  index: number;
  category: Category;
  totalCategories: number;
  refetchCategories: () => void;
  sortCategories: (id: number, currentIndex: number, newIndex: number) => void;
};

const CategoryCard: React.FC<CategoryCardProps> = ({
  index,
  category,
  totalCategories,
  refetchCategories,
  sortCategories,
}) => {
  const { theme } = useTheme();

  const editCategoryModalState = useBoolean();
  const deleteCategoryModalState = useBoolean();

  const handleDelete = async () => {
    deleteCategoryById(category.id);
    refetchCategories();
  };

  return (
    <>
      <View style={[styles.cardCtn, { backgroundColor: theme.surface1 }]}>
        <Row>
          <IconButton
            color={theme.onSurface}
            name="label-outline"
            padding={0}
          />
          <Text padding={{ horizontal: 8 }}>{category.name}</Text>
        </Row>
        <Row style={styles.actionsCtn}>
          <Row>
            <IconButton
              color={theme.onSurface}
              name="menu-up"
              onPress={() => {
                sortCategories(category.id, index, index - 1);
              }}
              disabled={index <= 0}
            />
            <IconButton
              color={theme.onSurface}
              name="menu-down"
              onPress={() => {
                sortCategories(category.id, index, index + 1);
              }}
              disabled={index + 1 >= totalCategories}
            />
          </Row>
          <Row>
            <IconButton
              color={theme.onSurface}
              name="pencil-outline"
              onPress={editCategoryModalState.setTrue}
            />
            <IconButton
              color={theme.onSurface}
              name="delete-outline"
              onPress={deleteCategoryModalState.setTrue}
            />
          </Row>
        </Row>
      </View>
      <AddCategoryModal
        category={category}
        visible={editCategoryModalState.value}
        onDismiss={editCategoryModalState.setFalse}
        onSuccess={refetchCategories}
      />
      <ConfirmationModal
        title="Delete category"
        description={`Do you wish to delete category ${category.name}?`}
        visible={deleteCategoryModalState.value}
        onConfirm={handleDelete}
        onDismiss={deleteCategoryModalState.setFalse}
      />
    </>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  cardCtn: {
    margin: 16,
    marginTop: 0,
    padding: 16,
    paddingBottom: 8,
    borderRadius: 12,
    elevation: 1,
  },
  actionsCtn: {
    justifyContent: 'space-between',
    marginHorizontal: -8,
  },
});
