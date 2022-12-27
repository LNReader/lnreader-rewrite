import React, { ReactNode, useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { Portal } from 'react-native-paper';
import { TabBar, TabView, SceneRendererProps } from 'react-native-tab-view';
import SlidingUpPanel, { SlidingUpPanelProps } from 'rn-sliding-up-panel';

import { Text } from '@lnreader/core';
import { useTheme } from '@hooks';

export type BottomSheetRef = React.LegacyRef<SlidingUpPanel>;
export type BottomSheetType = SlidingUpPanel | null;

type BottomSheetProps = SlidingUpPanelProps & {
  bottomSheetRef: BottomSheetRef;
};

export const BottomSheet: React.FC<BottomSheetProps> = props => {
  const { theme } = useTheme();

  return (
    <Portal>
      <SlidingUpPanel
        {...props}
        showBackdrop={props.showBackdrop ?? true}
        backdropOpacity={props.backdropOpacity ?? 0.3}
        ref={props.bottomSheetRef}
      >
        <View
          style={[styles.bottomSheetCtn, { backgroundColor: theme.surface1 }]}
        >
          <>{props.children}</>
        </View>
      </SlidingUpPanel>
    </Portal>
  );
};

type BottomSheetTabViewProps = SlidingUpPanelProps & {
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

export const BottomSheetTabView: React.FC<BottomSheetTabViewProps> = props => {
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

  return (
    <SlidingUpPanel
      {...props}
      showBackdrop={props.showBackdrop ?? true}
      backdropOpacity={props.backdropOpacity ?? 0.3}
      ref={props.bottomSheetRef}
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
    </SlidingUpPanel>
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
