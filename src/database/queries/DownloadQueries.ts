import * as SQLite from 'expo-sqlite';

import { History } from '@database/types';
import { DATABASE_NAME } from '@database/constants';
import { txnErrorCallback } from '@database/utils';

const db = SQLite.openDatabase(DATABASE_NAME);
