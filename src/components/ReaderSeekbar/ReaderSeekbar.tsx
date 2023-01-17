import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import Slider from '@react-native-community/slider';
import WebView from 'react-native-webview';

import { Text } from '@lnreader/core';
import { useChapterStorage, useTheme } from '@hooks';
import { useChapterDetailsContext } from '@contexts/ChapterDetailsContext';

type Props = {
  visible: boolean;
  webViewRef: React.RefObject<WebView<{}>>;
};

const MAX_PROGRESS = 100;

const ReaderSeekbar: React.FC<Props> = ({ visible, webViewRef }) => {
  const { theme } = useTheme();
  const {
    chapter: { id: chapterId },
  } = useChapterDetailsContext();
  const { PROGRESS = 0 } = useChapterStorage(chapterId);
  const [sliderValue, setSliderValue] = useState(PROGRESS);

  useEffect(() => {
    setSliderValue(PROGRESS);
  }, [PROGRESS]);

  const onSlidingComplete = (value: number) => {
    setSliderValue(value);
    webViewRef.current?.injectJavaScript(`
    (() => {
      const scrollPercentage = ${value};
      
      const scrollHeight = document.body.scrollHeight;
      const position = (scrollPercentage * scrollHeight) / 100;
      const readerHeight = ${Math.trunc(Dimensions.get('window').height)};
      const scrollOffsetY = position - readerHeight;

      window.scrollTo({
        top: scrollOffsetY, 
        left: 0, 
        behavior:'auto'
      });
    })()`);
  };

  if (!visible) {
    return null;
  }

  return (
    <Animated.View
      entering={FadeIn.duration(150)}
      exiting={FadeOut.duration(150)}
      style={[styles.appbarCtn, { backgroundColor: theme.surfaceReader }]}
    >
      <Text style={styles.textCtn}>{sliderValue}</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={100}
        step={1}
        value={sliderValue}
        onSlidingComplete={onSlidingComplete}
        thumbTintColor={theme.primary}
        minimumTrackTintColor={theme.primary}
        maximumTrackTintColor={theme.onSurface}
      />
      <Text style={styles.textCtn}>{MAX_PROGRESS}</Text>
    </Animated.View>
  );
};

export default ReaderSeekbar;

const styles = StyleSheet.create({
  appbarCtn: {
    position: 'absolute',
    bottom: 120,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    zIndex: 2,
    paddingHorizontal: 16,
    marginHorizontal: 16,
  },
  slider: {
    height: 56,
    flex: 1,
  },
  textCtn: {},
});
