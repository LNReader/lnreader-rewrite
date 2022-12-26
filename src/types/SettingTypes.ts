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

  /**
   * Reader Settings
   */
  READER_TEXT_COLOR = 'READER_TEXT_COLOR',
  READER_BACKGROUND_COLOR = 'READER_BACKGROUND_COLOR',
  READER_FONT_SIZE = 'READER_FONT_SIZE',
  READER_TEXT_ALIGNMENT = 'READER_TEXT_ALIGNMENT',
  READER_PADDING = 'READER_PADDING',
  READER_CUSTOM_CSS = 'READER_CUSTOM_CSS',

  /**
   * Appearence Settings
   */
  SHOW_HISTORY_TAB = 'SHOW_HISTORY_TAB',
  SHOW_UPDATES_TAB = 'SHOW_UPDATES_TAB',
  SHOW_LABELS_IN_NAV = 'SHOW_LABELS_IN_NAV',
}

export interface SettingTypes {
  /**
   * Library Settings
   */
  [Setting.LIBRARY_SORT_ORDER]: LibrarySortOrder;
  [Setting.LIBRARY_FILTERS]: LibraryFilters[];
  [Setting.LIBRARY_DISPLAY_MODE]: LibraryDisplayModes[];
  [Setting.LIBRARY_SHOW_DOWNLOADS_BADGE]: boolean;
  [Setting.LIBRARY_SHOW_UNREAD_BADGE]: boolean;
  [Setting.LIBRARY_SHOW_NUMBER_OF_ITEMS]: boolean;
  [Setting.READER_TEXT_COLOR]: string;
  [Setting.READER_BACKGROUND_COLOR]: string;
  [Setting.READER_FONT_SIZE]: number;
  [Setting.READER_TEXT_ALIGNMENT]: string;
  [Setting.READER_PADDING]: number;
  [Setting.READER_CUSTOM_CSS]: string;
  [Setting.SHOW_HISTORY_TAB]: boolean;
  [Setting.SHOW_UPDATES_TAB]: boolean;
  [Setting.SHOW_LABELS_IN_NAV]: boolean;
}
