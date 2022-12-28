import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTheme } from '@hooks';

interface IconButtonProps {
  name: string;
  size?: number;
  color?: string;
  onPress?: () => void;
  containerStyle?: ViewStyle;
  style?: StyleProp<TextStyle>;
  padding?: number;
  disabled?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
  name,
  size = 24,
  color,
  onPress,
  style,
  padding = 8,
  containerStyle,
  disabled,
}) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.iconButtonCtn, containerStyle]}>
      <Pressable
        onPress={onPress}
        style={[styles.pressableCtn, { padding }]}
        android_ripple={{ color: theme.rippleColor }}
        disabled={disabled}
      >
        <Icon
          name={name}
          size={size}
          color={
            disabled ? theme.onSurfaceDisabled : color || theme.onSurfaceVariant
          }
          style={style}
        />
      </Pressable>
    </View>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  iconButtonCtn: {
    borderRadius: 50,
    overflow: 'hidden',
  },
  pressableCtn: {
    padding: 8,
    alignItems: 'center',
  },
});
