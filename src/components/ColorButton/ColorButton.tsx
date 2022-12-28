import Color from 'color';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ColorButtonProps {
  selected: boolean;
  backgroundColor: string;
  color: string;
  onPress: () => void;
}

const ColorButton: React.FC<ColorButtonProps> = ({
  selected,
  backgroundColor,
  color,
  onPress,
}) => (
  <View style={styles.buttonCtn}>
    <Pressable
      android_ripple={{ color: Color(color).alpha(0.12).toString() }}
      style={[styles.pressableCtn, { backgroundColor }]}
      onPress={onPress}
    >
      <Icon
        name={selected ? 'check' : 'format-color-text'}
        color={color}
        size={24}
      />
    </Pressable>
  </View>
);

export default ColorButton;

const styles = StyleSheet.create({
  buttonCtn: {
    borderRadius: 50,
    overflow: 'hidden',
    marginHorizontal: 6,
    height: 44,
    width: 44,
  },
  pressableCtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
