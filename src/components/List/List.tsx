import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  List as PaperList,
  ListItemProps as PaperListItemProps,
  ListSubheaderProps as PaperListSubheaderProps,
  Divider as PaperDivider,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTheme } from '@hooks';
import { Text } from '..';

const SubHeader: React.FC<Omit<PaperListSubheaderProps, 'theme'>> = props => {
  const { theme } = useTheme();

  return (
    <PaperList.Subheader
      style={[{ color: theme.primary }, styles.listSubheader]}
    >
      {props.children}
    </PaperList.Subheader>
  );
};

const Info: React.FC<{ message?: string }> = props => {
  const { theme } = useTheme();

  return (
    <View style={styles.infoCtn}>
      <Icon
        size={20}
        color={theme.onSurfaceVariant}
        name="information-outline"
      />
      <Text style={styles.infoMsg} size={12} color={theme.onSurfaceVariant}>
        {props.message}
      </Text>
    </View>
  );
};

const Divider: React.FC = () => {
  const { theme } = useTheme();

  return (
    <PaperDivider
      style={[styles.divider, { backgroundColor: theme.outlineVariant }]}
    />
  );
};

const Item: React.FC<
  Omit<PaperListItemProps & { icon?: string }, 'left' | 'theme'>
> = props => {
  const { theme } = useTheme();

  return (
    <PaperList.Item
      titleStyle={{ color: theme.onSurface }}
      descriptionStyle={{ color: theme.onSurfaceVariant }}
      left={
        props.icon
          ? () => (
              <PaperList.Icon
                color={theme.primary}
                icon={props.icon as string}
                style={styles.iconCtn}
              />
            )
          : undefined
      }
      rippleColor={theme.rippleColor}
      style={styles.listItemCtn}
      {...props}
    />
  );
};

export const List = {
  Item,
  Divider,
  SubHeader,
  Info,
};

const styles = StyleSheet.create({
  iconCtn: {
    paddingLeft: 16,
  },
  divider: {
    height: 1,
    opacity: 0.6,
  },
  listSubheader: {
    fontWeight: 'bold',
    paddingVertical: 12,
  },
  infoCtn: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  infoMsg: {
    marginTop: 12,
  },
  listItemCtn: {
    paddingVertical: 12,
  },
});
