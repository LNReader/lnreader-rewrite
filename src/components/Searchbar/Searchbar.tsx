import React from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { IconButton } from '@lnreader/core';
import { useTheme } from '@hooks';

import { Spacing } from '@theme/constants';

interface SearchbarProps extends TextInputProps {
  onChangeText: (text: string) => void;
  onClearSearchbar?: () => void;
  useBackAction?: boolean;
  actions?: Array<{
    icon: string;
    onPress?: () => void;
    disabled?: boolean;
  }>;
}

const Searchbar: React.FC<SearchbarProps> = props => {
  const { theme } = useTheme();
  const { top } = useSafeAreaInsets();
  const { goBack } = useNavigation();

  const onClearSearchBar = () => {
    props.onChangeText('');
    props.onClearSearchbar?.();
  };

  const marginTop = top + 8;

  return (
    <View
      style={[
        styles.barCtn,
        {
          backgroundColor: theme.surface3,
          marginTop,
        },
      ]}
    >
      <Pressable
        style={styles.pressableCtn}
        android_ripple={{ color: theme.rippleColor }}
      >
        {props.useBackAction ? (
          <IconButton name="arrow-left" onPress={goBack} />
        ) : (
          <IconButton name="magnify" />
        )}
        <TextInput
          {...props}
          placeholderTextColor={theme.onSurfaceVariant}
          style={[props.style, styles.inputCtn, { color: theme.onSurface }]}
          value={props.value}
          onChangeText={props.onChangeText}
        />
        {props.value ? (
          <IconButton name="close" onPress={onClearSearchBar} />
        ) : null}
        {props.actions?.map(action => (
          <IconButton
            key={action.icon}
            name={action.icon}
            onPress={action.onPress}
            disabled={action.disabled}
          />
        ))}
      </Pressable>
    </View>
  );
};

export default Searchbar;

const styles = StyleSheet.create({
  barCtn: {
    borderRadius: 50,
    marginHorizontal: Spacing.M,
    marginBottom: Spacing.XM,
    height: 56,
    overflow: 'hidden',
  },
  pressableCtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.S,
  },
  inputCtn: {
    flex: 1,
    fontSize: 16,
  },
});
