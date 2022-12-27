import React from 'react';
import { Appbar as PaperAppbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from '@hooks';

interface AppbarProps {
  title: string;
}

const Appbar: React.FC<AppbarProps> = ({ title }) => {
  const { theme } = useTheme();
  const { goBack } = useNavigation();

  return (
    <PaperAppbar.Header mode="large" theme={{ colors: theme }}>
      <PaperAppbar.BackAction
        onPress={goBack}
        iconColor={theme.onSurfaceVariant}
      />
      <PaperAppbar.Content
        title={title}
        titleStyle={{ color: theme.onSurface }}
        theme={{ colors: theme }}
      />
    </PaperAppbar.Header>
  );
};

export default Appbar;
