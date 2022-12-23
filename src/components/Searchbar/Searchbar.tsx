import Color from 'color';
import IconButton from 'components/IconButton/IconButton';
import {useTheme} from 'hooks/useTheme';
import {noop} from 'lodash';
import React from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Searchbar: React.FC<TextInputProps> = props => {
  const {theme} = useTheme();

  const {top} = useSafeAreaInsets();

  const marginTop = top + 18;

  return (
    <View
      style={[
        styles.barCtn,
        {
          backgroundColor: Color(theme.primary).alpha(0.08).toString(),
          marginTop,
        },
      ]}>
      <Pressable
        style={styles.pressableCtn}
        android_ripple={{color: theme.rippleColor}}>
        <IconButton name="magnify" />
        <TextInput
          {...props}
          placeholderTextColor={theme.onSurfaceVariant}
          style={[props.style, styles.inputCtn]}
        />
      </Pressable>
    </View>
  );
};

export default Searchbar;

const styles = StyleSheet.create({
  barCtn: {
    borderRadius: 50,
    marginHorizontal: 16,
    height: 56,
    overflow: 'hidden',
  },
  pressableCtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  inputCtn: {
    fontSize: 16,
  },
});
