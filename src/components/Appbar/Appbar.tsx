import React from 'react';
import {Appbar as PaperAppbar} from 'react-native-paper';

import {useTheme} from 'hooks/useTheme';

interface AppbarProps {
  title: string;
}

const Appbar: React.FC<AppbarProps> = ({title}) => {
  const {theme} = useTheme();

  return (
    <PaperAppbar.Header>
      <PaperAppbar.Content
        title={title}
        titleStyle={{color: theme.onSurface}}
      />
    </PaperAppbar.Header>
  );
};

export default Appbar;
