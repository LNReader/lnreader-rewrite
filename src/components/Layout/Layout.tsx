import {StyleSheet, Text, View, ViewProps} from 'react-native';
import React from 'react';

const Row: React.FC<ViewProps> = props => {
  return (
    <View {...props} style={[props.style, styles.rowCtn]}>
      <Text>{props.children}</Text>
    </View>
  );
};

export default Row;

const styles = StyleSheet.create({
  rowCtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
