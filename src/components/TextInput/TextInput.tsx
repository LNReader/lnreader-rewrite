import React from 'react';
import { StyleSheet } from 'react-native';

import {
  overlay,
  TextInput as PaperTextInput,
  TextInputProps as PaperTextInputProps,
} from 'react-native-paper';

import { useTheme } from '@hooks';

interface Props extends Omit<PaperTextInputProps, 'theme'> {}

const TextInput = (props: Props) => {
  const { theme } = useTheme();

  return (
    <PaperTextInput
      underlineColor={theme.outlineVariant}
      theme={{
        colors: {
          ...theme,
          background: theme.overlay3,
        },
      }}
      mode={props.mode ?? 'outlined'}
      {...props}
    />
  );
};

export default TextInput;

const styles = StyleSheet.create({});
