import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {Switch as PaperSwitch} from 'react-native-paper';

import {useTheme} from 'hooks/useTheme';
import {Text} from 'components/index';

type Props = {
  value?: boolean;
  label?: string;
  onPress: () => void;
};

const Switch: React.FC<Props> = props => {
  const {theme} = useTheme();

  return (
    <Pressable
      style={styles.switchCtn}
      android_ripple={{color: theme.rippleColor}}
      onPress={props.onPress}>
      <Text>{props.label}</Text>
      <PaperSwitch
        value={props.value}
        onValueChange={props.onPress}
        color={theme.primary}
      />
    </Pressable>
  );
};

export default Switch;

const styles = StyleSheet.create({
  switchCtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
