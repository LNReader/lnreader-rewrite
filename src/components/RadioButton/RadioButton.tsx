import React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { RadioButton as PaperRadioButton } from 'react-native-paper';

import { useTheme } from '@hooks';
import { Text } from '@lnreader/core';
import { Spacing } from '@theme/constants';

type Props = {
  value: string | number;
  status: boolean;
  label?: string;
  onPress?: () => void;
};

const RadioButton: React.FC<Props> = props => {
  const { theme } = useTheme();
  const status = props.status ? 'checked' : 'unchecked';

  return (
    <Pressable
      style={styles.checkboxCtn}
      android_ripple={{ color: theme.rippleColor }}
      onPress={props.onPress}
    >
      <PaperRadioButton
        value={String(props.value)}
        status={status}
        color={theme.primary}
        uncheckedColor={theme.onSurfaceVariant}
        theme={{ colors: theme }}
      />
      <Text style={styles.label}>{props.label}</Text>
    </Pressable>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  checkboxCtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.XM,
    paddingVertical: Spacing.S,
  },
  label: {
    marginLeft: Spacing.S,
  },
});
