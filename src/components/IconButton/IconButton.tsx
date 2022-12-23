import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Color from 'color';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from 'hooks/useTheme';

interface IconButtonProps {
  name: string;
  size?: number;
  color?: string;
  onPress?: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({
  name,
  size = 24,
  color,
  onPress,
}) => {
  const {theme} = useTheme();

  return (
    <View style={styles.iconButtonCtn}>
      <Pressable
        onPress={onPress}
        style={styles.pressableCtn}
        android_ripple={{color: theme.rippleColor}}>
        <Icon name={name} size={size} color={color || theme.onSurfaceVariant} />
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
  },
});
