import React from 'react';
import {
  Appbar as PaperAppbar,
  AppbarHeaderProps as PaperAppbarHeaderProps,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from '@hooks';

interface AppbarProps
  extends Omit<PaperAppbarHeaderProps, 'children' | 'theme'> {
  title: string;
  actions?: Array<{ icon: string; onPress: () => void }>;
}

const Appbar: React.FC<AppbarProps> = props => {
  const { theme } = useTheme();
  const { goBack } = useNavigation();

  return (
    <PaperAppbar.Header mode="large" {...props} theme={{ colors: theme }}>
      <PaperAppbar.BackAction
        onPress={goBack}
        iconColor={theme.onSurfaceVariant}
      />
      <PaperAppbar.Content
        title={props.title}
        titleStyle={{ color: theme.onSurface }}
        theme={{ colors: theme }}
      />
      {props.actions?.map(action => (
        <PaperAppbar.Action
          key={action.icon}
          icon={action.icon}
          onPress={goBack}
        />
      ))}
    </PaperAppbar.Header>
  );
};

export default Appbar;
