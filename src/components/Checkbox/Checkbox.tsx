import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {Checkbox as PaperCheckbox} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Text} from 'components/index';
import {useTheme} from 'hooks/useTheme';
import {Spacing} from 'theme/constants';

type Props = {
  status?: boolean;
  label?: string;
  onPress?: () => void;
};

const Checkbox: React.FC<Props> = props => {
  const {theme} = useTheme();
  const status = props.status ? 'checked' : 'unchecked';

  return (
    <Pressable
      style={styles.checkboxCtn}
      android_ripple={{color: theme.rippleColor}}
      onPress={props.onPress}>
      <PaperCheckbox
        status={status}
        color={theme.primary}
        uncheckedColor={theme.onSurfaceVariant}
        theme={{colors: theme}}
      />
      <Text style={styles.label}>{props.label}</Text>
    </Pressable>
  );
};

export default Checkbox;

interface SortItemProps {
  status?: 'ASC' | 'DESC';
  label?: string;
  onPress?: () => void;
}

export const SortItem: React.FC<SortItemProps> = ({label, status, onPress}) => {
  const {theme} = useTheme();

  return (
    <Pressable
      style={styles.sortItemCtn}
      android_ripple={{color: theme.rippleColor}}
      onPress={onPress}>
      {status && (
        <Icon
          name={status === 'ASC' ? 'arrow-up' : 'arrow-down'}
          color={theme.primary}
          size={21}
          style={styles.icon}
        />
      )}
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

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
  sortItemCtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.XM,
    paddingVertical: Spacing.M,
    paddingLeft: 56,
  },
  icon: {
    position: 'absolute',
    left: 24,
    alignSelf: 'center',
  },
});
