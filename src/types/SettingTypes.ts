import { Language } from '@sources/types';
import { LibrarySortOrder } from '@utils/libraryUtils';
import { LibraryDisplayModes, LibraryFilters } from '@utils/libraryUtils';

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
  READER_SHOW_PROGRESS = 'READER_SHOW_PROGRESS',
  READER_FULLSCREEN_MODE = 'READER_FULLSCREEN_MODE',
  READER_LINE_HEIGHT = 'READER_LINE_HEIGHT',

  /**
   * Appearence Settings
   */
  SHOW_HISTORY_TAB = 'SHOW_HISTORY_TAB',
  SHOW_UPDATES_TAB = 'SHOW_UPDATES_TAB',
  SHOW_LABELS_IN_NAV = 'SHOW_LABELS_IN_NAV',

  INCOGNITO_MODE = 'INCOGNITO_MODE',
  DOWNLOADED_ONLY_MODE = 'DOWNLOADED_ONLY_MODE',

  /**
   * Source Settings
   */
  PINNED_SOURCES = 'PINNED_SOURCES',
  SOURCE_LANGUAGES = 'SOURCE_LANGUAGES',
  LAST_USED_SOURCE_ID = 'LAST_USED_SOURCE_ID',
  ONLY_SHOW_PINNED_SOURCES = 'ONLY_SHOW_PINNED_SOURCES',
  SHOW_NSFW_SOURCES = 'SHOW_NSFW_SOURCES',
}

export interface SettingTypes {
  [Setting.LIBRARY_SORT_ORDER]: LibrarySortOrder;
  [Setting.LIBRARY_FILTERS]: LibraryFilters[];
  [Setting.LIBRARY_DISPLAY_MODE]: LibraryDisplayModes;
  [Setting.LIBRARY_SHOW_DOWNLOADS_BADGE]: boolean;
  [Setting.LIBRARY_SHOW_UNREAD_BADGE]: boolean;
  [Setting.LIBRARY_SHOW_NUMBER_OF_ITEMS]: boolean;

  [Setting.READER_TEXT_COLOR]: string;
  [Setting.READER_BACKGROUND_COLOR]: string;
  [Setting.READER_FONT_SIZE]: number;
  [Setting.READER_TEXT_ALIGNMENT]: string;
  [Setting.READER_PADDING]: number;
  [Setting.READER_CUSTOM_CSS]: string;
  [Setting.READER_SHOW_PROGRESS]: boolean;
  [Setting.READER_FULLSCREEN_MODE]: boolean;
  [Setting.READER_LINE_HEIGHT]: number;

  [Setting.SHOW_HISTORY_TAB]: boolean;
  [Setting.SHOW_UPDATES_TAB]: boolean;
  [Setting.SHOW_LABELS_IN_NAV]: boolean;

  [Setting.INCOGNITO_MODE]: boolean;
  [Setting.DOWNLOADED_ONLY_MODE]: boolean;

  [Setting.PINNED_SOURCES]: number[];
  [Setting.SOURCE_LANGUAGES]: Language[];
  [Setting.LAST_USED_SOURCE_ID]: number;
  [Setting.ONLY_SHOW_PINNED_SOURCES]: boolean;
  [Setting.SHOW_NSFW_SOURCES]: boolean;
}
