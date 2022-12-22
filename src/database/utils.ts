import {ToastAndroid} from 'react-native';
import {SQLError, SQLTransaction} from 'expo-sqlite';

export const txnErrorCallback = (
  _txnObj: SQLTransaction,
  error: SQLError,
): boolean => {
  ToastAndroid.show(error.message, ToastAndroid.SHORT);
  return false;
};

export const txnErrorCallbackWithoutToast = (): boolean => false;

export const dbTxnErrorCallback = (error: SQLError): void =>
  ToastAndroid.show(error.message, ToastAndroid.SHORT);
