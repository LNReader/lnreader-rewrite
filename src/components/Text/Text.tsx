import {isNumber} from 'lodash';
import React from 'react';
import {
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
} from 'react-native';

interface TextProps extends RNTextProps {
  size?: number;
  color?: string;
  padding?:
    | {
        horizontal?: number;
        vertical?: number;
      }
    | number;
  fontWeight?: TextStyle['fontWeight'];
}

const Text: React.FC<TextProps> = props => {
  const padding: TextStyle = isNumber(props.padding)
    ? {padding: props.padding}
    : {
        paddingHorizontal: props.padding?.horizontal,
        paddingVertical: props.padding?.vertical,
      };

  const fontWeight = props.fontWeight || 'normal';

  return (
    <RNText
      {...props}
      style={[
        props.style,
        {
          color: props.color,
          fontSize: props.size,
          fontWeight,
        },
        padding,
      ]}>
      {props.children}
    </RNText>
  );
};

export default Text;
