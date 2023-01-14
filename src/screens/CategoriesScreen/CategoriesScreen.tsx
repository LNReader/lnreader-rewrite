import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { Appbar, ErrorScreen, FAB, LoadingScreen } from '@lnreader/core';
import { useBoolean, useCategories } from '@hooks';
import CategoryCard from '@components/CategoryCard/CategoryCard';
import AddCategoryModal from '@components/AddCategoryModal/AddCategoryModal';
import { updateCategoriesSort } from '@database/queries/CategoryQueries';

const CategoriesScreen = () => {
  const { categories, error, loading, refetch } = useCategories({});

  const addCategoryModalState = useBoolean();

  const sortCategories = (
    id: number,
    currentIndex: number,
    newIndex: number,
  ) => {
    const sortedCategories = categories?.map((category, index) => {
      if (category.sort === newIndex || newIndex === index) {
        return {
          ...category,
          sort: currentIndex,
        };
      }

      if (category.id === id) {
        return {
          ...category,
          sort: newIndex,
        };
      }

      return category;
    });

    updateCategoriesSort(sortedCategories);
    refetch();
  };

  return (
    <>
      <Appbar title="Edit categories" />
      {loading ? (
        <LoadingScreen />
      ) : error ? (
        <ErrorScreen error={error} />
      ) : (
        <FlatList
          data={categories}
          renderItem={({ item, index }) => (
            <CategoryCard
              index={index}
              category={item}
              refetchCategories={refetch}
              sortCategories={sortCategories}
              totalCategories={categories.length}
            />
          )}
        />
      )}
      <FAB icon="plus" label="Add" onPress={addCategoryModalState.setTrue} />
      <AddCategoryModal
        visible={addCategoryModalState.value}
        onDismiss={addCategoryModalState.setFalse}
        onSuccess={refetch}
      />
    </>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({});
