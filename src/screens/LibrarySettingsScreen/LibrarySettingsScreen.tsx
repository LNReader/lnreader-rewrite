import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { Appbar, List } from '@lnreader/core';
import { useAppSettings, useBoolean, useCategories } from '@hooks';

import DefaultCategoryModal from '@components/DefaultCategoryModal/DefaultCategoryModal';

const LibrarySettingsScreen = () => {
  const { navigate } = useNavigation();
  const { DEFAULT_CATEGORY } = useAppSettings();
  const { categories } = useCategories({ showDefaultCategory: true });
  const defaultCategoryModalState = useBoolean();

  const defaultCategoryName =
    categories.find(category => category.id === DEFAULT_CATEGORY)?.name ||
    'Default';

  return (
    <>
      <Appbar title="Library" />
      <List.SubHeader>Categories</List.SubHeader>
      <List.Item
        title="Edit Categories"
        description={`${categories.length} categories`}
        onPress={() =>
          navigate('MoreStack', {
            screen: 'CategoriesScreen',
          })
        }
      />
      <List.Item
        title="Default Category"
        description={defaultCategoryName}
        onPress={defaultCategoryModalState.setTrue}
      />
      <DefaultCategoryModal
        categories={categories}
        visible={defaultCategoryModalState.value}
        onDismiss={defaultCategoryModalState.setFalse}
      />
    </>
  );
};

export default LibrarySettingsScreen;
