import {ToastAndroid} from 'react-native';
import {SQLError, SQLTransaction} from 'expo-sqlite';

export const txnErrorCallback = (
  _txnObj: SQLTransaction,
  error: SQLError,
): boolean => {
  if (__DEV__) {
    console.log(error.message);
  }
  ToastAndroid.show(error.message, ToastAndroid.SHORT);
  return false;
};

export const txnErrorCallbackWithoutToast = (): boolean => false;

export const dbTxnErrorCallback = (error: SQLError): void =>
  ToastAndroid.show(error.message, ToastAndroid.SHORT);
