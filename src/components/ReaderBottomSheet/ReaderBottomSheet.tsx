import React, { useMemo, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SceneMap } from 'react-native-tab-view';
import { Portal } from 'react-native-paper';
import Slider from '@react-native-community/slider';

import {
  BottomSheetTabView,
  ColorButton,
  Switch,
  BottomSheetRef,
  Row,
  Text,
  ToggleButton,
  Counter,
} from '@lnreader/core';
import { useAppSettings, useTheme } from '@hooks';

import { Setting } from 'types/Settings';
import {
  DEAULT_READER_THEME,
  DEAULT_TEXT_ALIGNMENT,
  PRESET_READER_THEMES,
  TEXT_ALIGNMENTS,
} from '@utils/ReaderUtils';

interface ReaderBottomSheetProps {
  bottomSheetRef: BottomSheetRef;
}

export const ReaderRoute = () => {
  const { theme } = useTheme();
  const {
    READER_FONT_SIZE = 16,
    READER_BACKGROUND_COLOR = DEAULT_READER_THEME.backgroundColor,
    READER_TEXT_COLOR = DEAULT_READER_THEME.color,
    READER_TEXT_ALIGNMENT = DEAULT_TEXT_ALIGNMENT.value,
    READER_LINE_HEIGHT = 1.5,
    READER_PADDING = 5,
    setAppSetting,
    setReaderTheme,
  } = useAppSettings();

  return (
    <View style={styles.readerCtn}>
      <Row style={styles.settingCtn}>
        <Text>Color</Text>
        <Row>
          {PRESET_READER_THEMES.map(item => (
            <ColorButton
              key={`${item.backgroundColor}-${item.color}`}
              backgroundColor={item.backgroundColor}
              color={item.color}
              selected={
                READER_BACKGROUND_COLOR === item.backgroundColor &&
                READER_TEXT_COLOR === item.color
              }
              onPress={() => setReaderTheme(item.backgroundColor, item.color)}
            />
          ))}
        </Row>
      </Row>
      <Row style={styles.settingCtn}>
        <Text>Text align</Text>
        <Row>
          {TEXT_ALIGNMENTS.map(item => (
            <ToggleButton
              key={item.value}
              icon={item.icon}
              selected={item.value === READER_TEXT_ALIGNMENT}
              onPress={() =>
                setAppSetting(Setting.READER_TEXT_ALIGNMENT, item.value)
              }
            />
          ))}
        </Row>
      </Row>
      <Row style={styles.settingCtn}>
        <Text>Text size</Text>
        <Counter
          value={READER_FONT_SIZE}
          minimumValue={2}
          maximumValue={40}
          step={1}
          onPress={val => setAppSetting(Setting.READER_FONT_SIZE, val)}
        />
      </Row>
      <Row style={styles.settingCtn}>
        <Text>Line height</Text>
        <Counter
          value={READER_LINE_HEIGHT}
          minimumValue={1.3}
          maximumValue={2}
          step={0.1}
          onPress={val =>
            setAppSetting(Setting.READER_LINE_HEIGHT, Number(val.toFixed(1)))
          }
        />
      </Row>
      <Row style={styles.settingCtn}>
        <Text>Padding</Text>
        <Counter
          value={READER_PADDING}
          minimumValue={0}
          maximumValue={10}
          step={1}
          onPress={val => setAppSetting(Setting.READER_PADDING, val)}
        />
      </Row>
    </View>
  );
};

export const GeneralRoute = () => {
  const {
    READER_SHOW_PROGRESS = false,
    KEEP_SCREEN_ON = false,
    toggleSetting,
  } = useAppSettings();

  return (
    <View>
      <Switch
        size="small"
        value={READER_SHOW_PROGRESS}
        title="Show progress percentage"
        onPress={() => toggleSetting(Setting.READER_SHOW_PROGRESS)}
      />
      <Switch
        size="small"
        value={KEEP_SCREEN_ON}
        title="Keep screen on"
        onPress={() => toggleSetting(Setting.KEEP_SCREEN_ON)}
      />
    </View>
  );
};

const ReaderBottomSheet: React.FC<ReaderBottomSheetProps> = ({
  bottomSheetRef,
}: ReaderBottomSheetProps) => {
  const { bottom: bottomInset } = useSafeAreaInsets();

  const routes = useMemo(
    () => [
      { key: 'first', title: 'Reader' },
      { key: 'second', title: 'General' },
    ],
    [],
  );

  const renderScene = SceneMap({
    first: ReaderRoute,
    second: GeneralRoute,
  });

  const bottomSheetHeight = 400 + bottomInset;

  return (
    <Portal>
      <BottomSheetTabView
        renderScene={renderScene}
        routes={routes}
        bottomSheetRef={bottomSheetRef}
        snapPoints={[0.1, bottomSheetHeight]}
        containerHeight={bottomSheetHeight}
      />
    </Portal>
  );
};

export default ReaderBottomSheet;

const styles = StyleSheet.create({
  readerCtn: {
    paddingVertical: 8,
  },
  settingCtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'space-between',
  },
  slider: {
    flex: 1,
  },
});
