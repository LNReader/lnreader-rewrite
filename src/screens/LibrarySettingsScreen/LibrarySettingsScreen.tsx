import React, { useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Appbar, List, Switch } from '@lnreader/core';
import { useAppSettings, useBoolean, useCategories } from '@hooks';

import DefaultCategoryModal from '@components/DefaultCategoryModal/DefaultCategoryModal';
import SkipUpdatingEntriesModal from '@components/SkipUpdatingEntriesModal/SkipUpdatingEntriesModal';
import { skipUpdatingEntriesLabels } from '@utils/UpdateUtils';
import IncludeCategoriesModal from '@components/IncludeCategoriesModal/IncludeCategoriesModal';
import { Setting } from 'types/Settings';

const LibrarySettingsScreen = () => {
  const { navigate } = useNavigation();
  const {
    DEFAULT_CATEGORY,
    SKIP_UPDATING_COMPLETED_NOVELS,
    SKIP_UPDATING_NOVELS_NOT_STARTED,
    SKIP_UPDATING_NOVELS_WITH_UNREAD_CHAPTERS,
    UPDATES_INCLUDED_CATEGORIES,
    UPDATES_EXCLUDED_CATEGORIES,
    REFRESH_METADATA_ON_UPDATE,
    toggleSetting,
  } = useAppSettings();
  const { categories } = useCategories({ showDefaultCategory: true });

  const defaultCategoryModalState = useBoolean();
  const defaultCategoryName = categories.find(
    category => category.id === DEFAULT_CATEGORY,
  )?.name;

  const skipUpdatingEntriesModalState = useBoolean();
  const skipUpdatingEntriesDesc = useMemo(() => {
    const descArr = [];

    if (SKIP_UPDATING_NOVELS_WITH_UNREAD_CHAPTERS) {
      descArr.push(
        skipUpdatingEntriesLabels.SKIP_UPDATING_NOVELS_WITH_UNREAD_CHAPTERS,
      );
    }

    if (SKIP_UPDATING_NOVELS_NOT_STARTED) {
      descArr.push(skipUpdatingEntriesLabels.SKIP_UPDATING_NOVELS_NOT_STARTED);
    }

    if (SKIP_UPDATING_COMPLETED_NOVELS) {
      descArr.push(skipUpdatingEntriesLabels.SKIP_UPDATING_COMPLETED_NOVELS);
    }
    return descArr.join(', ') || 'None';
  }, [
    SKIP_UPDATING_COMPLETED_NOVELS,
    SKIP_UPDATING_NOVELS_NOT_STARTED,
    SKIP_UPDATING_NOVELS_WITH_UNREAD_CHAPTERS,
  ]);

  const includeCategoriesModalState = useBoolean();
  const includeCategoriesDesc = useMemo(() => {
    const includedeArr: string[] = [];
    const excludedArr: string[] = [];

    categories.forEach(category => {
      if (UPDATES_INCLUDED_CATEGORIES?.includes(category.id)) {
        includedeArr.push(category.name);
      }

      if (UPDATES_EXCLUDED_CATEGORIES?.includes(category.id)) {
        excludedArr.push(category.name);
      }
    });

    return `Include: ${includedeArr.join(', ') || 'All'}${
      excludedArr.length ? '\nExclude: ' + excludedArr.join(', ') : ''
    }`;
  }, [UPDATES_INCLUDED_CATEGORIES, UPDATES_EXCLUDED_CATEGORIES]);
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

      <List.SubHeader>Global Update</List.SubHeader>
      <List.Item
        title="Skip updating entries"
        description={skipUpdatingEntriesDesc}
        onPress={skipUpdatingEntriesModalState.setTrue}
      />
      <List.Item
        title="Categories"
        description={includeCategoriesDesc}
        onPress={includeCategoriesModalState.setTrue}
      />
      <Switch
        value={REFRESH_METADATA_ON_UPDATE}
        title="Automatically refresh metadata"
        description="Check for new cover and details when updating library"
        onPress={() => toggleSetting(Setting.REFRESH_METADATA_ON_UPDATE)}
      />
      {/* Modals */}
      <DefaultCategoryModal
        categories={categories}
        visible={defaultCategoryModalState.value}
        onDismiss={defaultCategoryModalState.setFalse}
      />
      <SkipUpdatingEntriesModal
        visible={skipUpdatingEntriesModalState.value}
        onDismiss={skipUpdatingEntriesModalState.setFalse}
      />
      <IncludeCategoriesModal
        categories={categories}
        visible={includeCategoriesModalState.value}
        onDismiss={includeCategoriesModalState.setFalse}
      />
    </>
  );
};

export default LibrarySettingsScreen;
