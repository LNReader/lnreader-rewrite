import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  Button as PaperButton,
  ButtonProps as PaperButtonProps,
} from 'react-native-paper';

import {useTheme} from 'hooks/useTheme';

interface ButtonProps extends Omit<PaperButtonProps, 'children' | 'theme'> {
  title?: string;
}

const Button: React.FC<ButtonProps> = props => {
  const {theme} = useTheme();

  return (
    <PaperButton {...props} theme={{colors: theme}}>
      {props.title}
    </PaperButton>
  );
};

export default Button;

const styles = StyleSheet.create({});
