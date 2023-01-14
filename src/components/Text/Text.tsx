import React from 'react';
import {
  // eslint-disable-next-line no-restricted-imports
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
} from 'react-native';
import { isNumber } from 'lodash';

import { useTheme } from '@hooks';

export interface TextProps extends RNTextProps {
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
  const { theme } = useTheme();

  const padding: TextStyle = isNumber(props.padding)
    ? { padding: props.padding }
    : {
        paddingHorizontal: props.padding?.horizontal,
        paddingVertical: props.padding?.vertical,
      };

  return (
    <RNText
      {...props}
      style={[
        padding,
        {
          color: props.color || theme.onSurface,
          fontSize: props.size,
          fontWeight: props.fontWeight || 'normal',
        },
        props.style,
      ]}
    >
      {props.children}
    </RNText>
  );
};

export default Text;
