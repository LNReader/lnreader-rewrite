import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Switch as PaperSwitch } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Text, Row } from '@lnreader/core';
import { useTheme } from '@hooks';

type Props = {
  size?: 'small' | 'large';
  value?: boolean;
  title?: string;
  description?: string;
  onPress: () => void;
  icon?: string;
};

const Switch: React.FC<Props> = props => {
  const { theme } = useTheme();
  const { size = 'large' } = props;

  const titleSize = size === 'large' ? 16 : 14;

  return (
    <Pressable
      style={styles.switchCtn}
      android_ripple={{ color: theme.rippleColor }}
      onPress={props.onPress}
    >
      <Row>
        {props.icon && (
          <Icon
            style={styles.iconCtn}
            name={props.icon}
            size={24}
            color={theme.primary}
          />
        )}
        <View>
          <Text size={titleSize}>{props.title}</Text>
          {props.description && (
            <Text size={12} color={theme.onSurfaceVariant}>
              {props.description}
            </Text>
          )}
        </View>
      </Row>
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
    padding: 16,
  },
  iconCtn: {
    marginRight: 16,
  },
});
