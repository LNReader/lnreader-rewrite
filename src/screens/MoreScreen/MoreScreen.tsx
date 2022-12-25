import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'components/index';
import {useTheme} from 'hooks/useTheme';

const MoreScreen = () => {
  const {setDarkMode, isDarkMode, setAmoledBlack, isAmoledBlack} = useTheme();
  return (
    <View style={{padding: 40}}>
      <Text onPress={() => setDarkMode(!isDarkMode)}>Toogle DarkMode</Text>

      {isDarkMode && (
        <Text onPress={() => setAmoledBlack(!isAmoledBlack)}>
          Toogle AmoledBlack
        </Text>
      )}
    </View>
  );
};

export default MoreScreen;

const styles = StyleSheet.create({});
