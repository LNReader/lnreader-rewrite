import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTheme } from '@hooks';

interface ToggleButtonProps {
  icon: string;
  selected: boolean;
  onPress: () => void;
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  icon,
  selected,
  onPress,
}) => {
  const { theme } = useTheme();

  return (
    <View style={styles.buttonCtn}>
      <Pressable
        android_ripple={{ color: theme.rippleColor }}
        style={[
          styles.pressable,
          selected && { backgroundColor: theme.rippleColor },
        ]}
        onPress={onPress}
      >
        <MaterialCommunityIcons
          name={icon}
          color={selected ? theme.primary : theme.onSurfaceVariant}
          size={24}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonCtn: {
    borderRadius: 6,
    overflow: 'hidden',
    marginHorizontal: 6,
  },
  pressable: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
