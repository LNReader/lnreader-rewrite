import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

export const Row: React.FC<ViewProps> = props => {
  return (
    <View {...props} style={[props.style, styles.rowCtn]}>
      {props.children}
    </View>
  );
};

export const ScreenContainer: React.FC<ViewProps> = props => {
  return (
    <View {...props} style={[props.style, styles.screenCtn]}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  rowCtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  screenCtn: {
    flex: 1,
  },
});
