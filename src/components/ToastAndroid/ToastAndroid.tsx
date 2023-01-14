import { ToastAndroid as RNToastAndroid } from 'react-native';

export const ToastAndroid = {
  show: (message: string) => RNToastAndroid.show(message, RNToastAndroid.SHORT),
};
