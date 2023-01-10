import React from 'react';
import { StyleSheet } from 'react-native';
import {
  List as PaperList,
  ListItemProps as PaperListItemProps,
  ListSubheaderProps as PaperListSubheaderProps,
  Divider as PaperDivider,
} from 'react-native-paper';

import { useTheme } from '@hooks';

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
      {...props}
    />
  );
};

export const List = {
  Item,
  Divider,
  SubHeader,
};

const styles = StyleSheet.create({
  iconCtn: {
    paddingLeft: 16,
  },
  divider: {
    height: 1,
  },
  listSubheader: {
    fontWeight: 'bold',
    paddingVertical: 12,
  },
});
