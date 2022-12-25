import {useTheme} from 'hooks/useTheme';
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
  const {theme} = useTheme();

  const padding: TextStyle = isNumber(props.padding)
    ? {padding: props.padding}
    : {
        paddingHorizontal: props.padding?.horizontal,
        paddingVertical: props.padding?.vertical,
      };

  return (
    <RNText
      {...props}
      style={[
        props.style,
        padding,
        {
          color: props.color || theme.onSurface,
          fontSize: props.size,
          fontWeight: props.fontWeight || 'normal',
        },
      ]}>
      {props.children}
    </RNText>
  );
};

export default Text;
