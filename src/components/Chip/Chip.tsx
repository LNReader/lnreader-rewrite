import React from 'react';
import {
  Chip as PaperChip,
  ChipProps as PaperChipProps,
} from 'react-native-paper';

import { useTheme } from '@hooks';

interface ChipProps extends Omit<PaperChipProps, 'theme'> {
  textSize?: number;
}

const Chip: React.FC<ChipProps> = props => {
  const { theme } = useTheme();

  return (
    <PaperChip
      theme={{ colors: theme }}
      textStyle={[props.textStyle, { fontSize: props.textSize }]}
    >
      {props.children}
    </PaperChip>
  );
};

export default Chip;
