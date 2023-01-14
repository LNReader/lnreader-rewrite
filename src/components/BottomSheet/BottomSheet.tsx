import React, { ReactNode, Ref, useCallback, useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { Portal } from 'react-native-paper';
import { TabBar, TabView, SceneRendererProps } from 'react-native-tab-view';
import {
  default as BS,
  BottomSheetBackdrop,
  BottomSheetProps as BSProps,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';

import { Text } from '@lnreader/core';
import { useTheme } from '@hooks';

export type BottomSheetRef = Ref<BS>;
export type BottomSheetType = BS | null;

type BottomSheetProps = BSProps & {
  bottomSheetRef: BottomSheetRef;
};

export const BottomSheet: React.FC<BottomSheetProps> = props => {
  const { theme } = useTheme();

  const renderBackdrop = useCallback(
    (backDropProps: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...backDropProps} disappearsOnIndex={0} />
    ),
    [],
  );

  return (
    <Portal>
      <BS
        index={-1}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        ref={props.bottomSheetRef}
        handleComponent={null}
        {...props}
      >
        <View
          style={[styles.bottomSheetCtn, { backgroundColor: theme.surface1 }]}
        >
          <>{props.children}</>
        </View>
      </BS>
    </Portal>
  );
};

type BottomSheetTabViewProps = BSProps & {
  bottomSheetRef: BottomSheetRef;
  routes: Array<{ key: string; title: string }>;
  renderScene: (
    props: SceneRendererProps & {
      route: {
        key: string;
        title: string;
      };
    },
  ) => ReactNode;
};

export const BottomSheetTabView: React.FC<
  Omit<BottomSheetTabViewProps, 'children'>
> = props => {
  const { theme } = useTheme();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const renderTabBar = (tabBarprops: any) => (
    <TabBar
      {...tabBarprops}
      indicatorStyle={{ backgroundColor: theme.primary }}
      style={[
        {
          backgroundColor: theme.surface2,
          borderBottomColor: theme.outlineVariant,
        },
        styles.tabBar,
      ]}
      renderLabel={({ route, color }) => (
        <Text style={{ color }}>{route.title}</Text>
      )}
      inactiveColor={theme.onSurfaceVariant}
      activeColor={theme.primary}
      pressColor={theme.rippleColor}
    />
  );

  const renderBackdrop = useCallback(
    (backDropProps: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...backDropProps} disappearsOnIndex={0} />
    ),
    [],
  );

  return (
    <BS
      index={-1}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      ref={props.bottomSheetRef}
      handleComponent={null}
      {...props}
    >
      <View
        style={[styles.bottomSheetCtn, { backgroundColor: theme.surface1 }]}
      >
        <TabView
          navigationState={{ index, routes: props.routes }}
          renderTabBar={renderTabBar}
          renderScene={props.renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          style={styles.tabView}
        />
      </View>
    </BS>
  );
};

const styles = StyleSheet.create({
  bottomSheetCtn: {
    flex: 1,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  tabBar: {
    borderBottomWidth: 1,
    elevation: 0,
  },
  tabView: {
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
});
