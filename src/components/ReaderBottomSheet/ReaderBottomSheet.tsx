import React, { useMemo, useState } from 'react';
import { Animated, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SceneMap } from 'react-native-tab-view';

import { BottomSheetTabView, Switch } from '@lnreader/core';
import { BottomSheetRef } from 'components/BottomSheet/BottomSheet';

import { Portal } from 'react-native-paper';
import useAppSettings from 'hooks/useAppSettings';
import { Setting } from 'types/SettingTypes';

interface ReaderBottomSheetProps {
  bottomSheetRef: BottomSheetRef;
}

export const ReaderRoute = () => {
  return <View></View>;
};

export const GeneralRoute = () => {
  const {
    READER_SHOW_PROGRESS = false,
    READER_FULLSCREEN_MODE = false,
    setAppSettings,
  } = useAppSettings();

  return (
    <View>
      <Switch
        value={READER_SHOW_PROGRESS}
        label="Show progress percentage"
        onPress={() =>
          setAppSettings(Setting.READER_SHOW_PROGRESS, !READER_SHOW_PROGRESS)
        }
      />
      <Switch
        value={READER_FULLSCREEN_MODE}
        label="Fullscreen"
        onPress={() =>
          setAppSettings(
            Setting.READER_FULLSCREEN_MODE,
            !READER_FULLSCREEN_MODE,
          )
        }
      />
    </View>
  );
};

const ReaderBottomSheet: React.FC<ReaderBottomSheetProps> = ({
  bottomSheetRef,
}: ReaderBottomSheetProps) => {
  const { bottom: bottomInset } = useSafeAreaInsets();
  const [animatedValue] = useState(new Animated.Value(0));

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

  const bottomSheetHeight = 200 + bottomInset;

  return (
    <Portal>
      <BottomSheetTabView
        renderScene={renderScene}
        routes={routes}
        bottomSheetRef={bottomSheetRef}
        animatedValue={animatedValue}
        draggableRange={{ top: bottomSheetHeight, bottom: 0 }}
        snappingPoints={[0, bottomSheetHeight]}
        height={bottomSheetHeight}
      />
    </Portal>
  );
};

export default ReaderBottomSheet;
