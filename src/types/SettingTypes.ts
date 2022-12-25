/**
 *
 * Library Filters
 *
 * 1 -> Downloaded
 * 2 -> Unread
 * 3 -> Started
 * 4 -> Completed
 *
 */

import {LibrarySortOrder} from 'utils/libraryUtils';
import {LibraryDisplayModes, LibraryFilters} from 'utils/libraryUtils';

export enum Setting {
  /**
   * Library Settings
   */
  LIBRARY_SORT_ORDER = 'LIBRARY_SORT_ORDER',
  LIBRARY_FILTERS = 'LIBRARY_FILTERS',
  LIBRARY_DISPLAY_MODE = 'LIBRARY_DISPLAY_MODE',
  LIBRARY_SHOW_DOWNLOADS_BADGE = 'LIBRARY_SHOW_DOWNLOADS_BADGE',
  LIBRARY_SHOW_UNREAD_BADGE = 'LIBRARY_SHOW_UNREAD_BADGE',
  LIBRARY_SHOW_NUMBER_OF_ITEMS = 'LIBRARY_SHOW_NUMBER_OF_ITEMS',
}

export interface SettingTypes {
  /**
   * Library Settings
   */
  LIBRARY_SORT_ORDER: LibrarySortOrder;
  LIBRARY_FILTERS: LibraryFilters[];
  LIBRARY_DISPLAY_MODE: LibraryDisplayModes[];
  LIBRARY_SHOW_DOWNLOADS_BADGE: boolean;
  LIBRARY_SHOW_UNREAD_BADGE: boolean;
  LIBRARY_SHOW_NUMBER_OF_ITEMS: boolean;
}
