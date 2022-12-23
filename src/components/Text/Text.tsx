import React from 'react';
import {Text as RNText, TextProps as RNTextProps} from 'react-native';

interface TextProps extends RNTextProps {
  size?: number;
  color?: string;
}

const Text: React.FC<TextProps> = props => {
  return (
    <RNText
      {...props}
      style={[props.style, {color: props.color, fontSize: props.size}]}>
      {props.children}
    </RNText>
  );
};

export default Text;
