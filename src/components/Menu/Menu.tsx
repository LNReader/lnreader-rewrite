import { useTheme } from '@hooks';
import React from 'react';
import {
  Menu as PaperMenu,
  MenuProps as PaperMenuProps,
  MenuItemProps as PaperMenuItemProps,
} from 'react-native-paper';
import { IconButton } from '..';

interface MenuProps extends Omit<PaperMenuProps, 'theme' | 'anchor'> {
  visible: boolean;
  openMenu: () => void;
}

export const Menu: React.FC<MenuProps> = props => {
  const { theme } = useTheme();

  return (
    <PaperMenu
      {...props}
      anchor={<IconButton name="dots-vertical" onPress={props.openMenu} />}
      contentStyle={{ backgroundColor: theme.surface2 }}
    >
      {props.children}
    </PaperMenu>
  );
};

export const MenuItem: React.FC<Omit<PaperMenuItemProps, 'theme'>> = props => {
  const { theme } = useTheme();

  return <PaperMenu.Item {...props} titleStyle={{ color: theme.onSurface }} />;
};

export default Menu;
