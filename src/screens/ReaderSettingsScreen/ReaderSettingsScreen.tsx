import React from 'react';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';

import {
  Appbar,
  ColorButton,
  Counter,
  List,
  Row,
  Text,
  ToggleButton,
} from '@lnreader/core';
import { useAppSettings, useTheme } from '@hooks';
import {
  DEAULT_READER_THEME,
  DEAULT_TEXT_ALIGNMENT,
  mockHtml,
  PRESET_READER_THEMES,
  TEXT_ALIGNMENTS,
} from '@utils/ReaderUtils';
import { Setting } from 'types/Settings';
import { debounce } from 'lodash-es';

const READER_HEIGHT = 250;

const ReaderSettingsScreen = () => {
  const { theme } = useTheme();
  const { top: marginTop, bottom: bottomInset } = useSafeAreaInsets();
  const {
    READER_FONT_SIZE = 16,
    READER_BACKGROUND_COLOR = DEAULT_READER_THEME.backgroundColor,
    READER_TEXT_COLOR = DEAULT_READER_THEME.color,
    READER_TEXT_ALIGNMENT = DEAULT_TEXT_ALIGNMENT.value,
    READER_LINE_HEIGHT = 1.5,
    READER_PADDING = 5,
    READER_CUSTOM_CSS = '',
    setAppSetting,
    setReaderTheme,
  } = useAppSettings();

  return (
    <>
      <Appbar title="Reader" mode="small" />
      <View style={{ height: READER_HEIGHT }}>
        <WebView
          nestedScrollEnabled
          source={{
            html: `
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');
              
              html {
                font-family: 'Nunito', sans-serif;
                font-size: ${READER_FONT_SIZE}px;
                text-align: ${READER_TEXT_ALIGNMENT};
                line-height: ${READER_LINE_HEIGHT};
              }

              body {
                margin-top: ${marginTop}px;
                padding: ${READER_PADDING}%;
                background-color: ${READER_BACKGROUND_COLOR};
                color: ${READER_TEXT_COLOR};
              }

              ${READER_CUSTOM_CSS}
            </style>
          </head>
          <body>
            ${mockHtml}
          </body>
        </html>`,
          }}
        />
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: bottomInset }}>
        <List.SubHeader>Custom CSS</List.SubHeader>
        <TextInput
          multiline
          style={styles.customCssCtn}
          defaultValue={READER_CUSTOM_CSS}
          placeholderTextColor={theme.onSurfaceVariant}
          placeholder="Example: body { color: red; }"
          onChangeText={debounce(
            customCss => setAppSetting(Setting.READER_CUSTOM_CSS, customCss),
            300,
          )}
        />
        <List.Divider />
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
      </ScrollView>
    </>
  );
};

export default ReaderSettingsScreen;

const styles = StyleSheet.create({
  settingCtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'space-between',
  },
  slider: {
    flex: 1,
  },
  customCssCtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
