import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { IconButton } from '..';
import { useTheme } from '@hooks';

type Props = {
  value: number;
  step?: number;
  minimumValue: number;
  maximumValue: number;
  onPress: (values: number) => void;
};

const Counter: React.FC<Props> = ({
  value,
  step = 1,
  maximumValue,
  minimumValue,
  onPress,
}) => {
  const { theme } = useTheme();

  return (
    <View style={styles.buttonCtn}>
      <IconButton
        name="minus"
        color={theme.primary}
        size={26}
        disabled={value <= minimumValue}
        onPress={() => onPress(value - step)}
      />
      <Text style={[styles.value, { color: theme.onSurface }]}>{value}</Text>
      <IconButton
        name="plus"
        color={theme.primary}
        size={26}
        disabled={value >= maximumValue}
        onPress={() => onPress(value + step)}
      />
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  buttonCtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  value: {
    paddingHorizontal: 24,
  },
});
