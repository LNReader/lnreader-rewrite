import React, {useRef} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {useTheme} from 'hooks/useTheme';
import {SourceChapter} from 'sources/types';

import {IconButton, Text, Row} from 'components/index';
import {Spacing} from 'theme/constants';
import ReaderBottomSheet from 'components/ReaderBottomSheet/ReaderBottomSheet';
import {BottomSheetType} from 'components/BottomSheet/BottomSheet';

type Props = {
  visible: boolean;
  chapter?: SourceChapter;
  novelName: string;
};

const ReaderFooterButton = ({
  iconName,
  onPress,
}: {
  iconName: string;
  onPress?: () => void;
}) => {
  const {theme} = useTheme();

  return (
    <Pressable
      style={styles.iconCtn}
      android_ripple={{
        color: theme.rippleColor,
        borderless: true,
        radius: 50,
      }}
      onPress={onPress}>
      <Icon name={iconName} size={24} color={theme.onSurface} />
    </Pressable>
  );
};

const ReaderFooter = (props: Props) => {
  const {theme} = useTheme();
  const {bottom: paddingBottom} = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheetType>(null);

  if (!props.visible) {
    return null;
  }

  return (
    <>
      <Animated.View
        entering={FadeIn.duration(150)}
        exiting={FadeOut.duration(150)}
        style={[
          styles.appbarCtn,
          {backgroundColor: theme.surfaceReader, paddingBottom},
        ]}>
        <View style={styles.contentCtn}>
          <ReaderFooterButton iconName="chevron-left" />
          <ReaderFooterButton
            iconName="cog-outline"
            onPress={() => bottomSheetRef.current?.show()}
          />
          <ReaderFooterButton iconName="chevron-right" />
        </View>
      </Animated.View>
      <ReaderBottomSheet bottomSheetRef={bottomSheetRef} />
    </>
  );
};

export default ReaderFooter;

const styles = StyleSheet.create({
  appbarCtn: {
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 4,
  },
  contentCtn: {
    height: 80,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  iconCtn: {
    padding: 32,
    paddingVertical: 16,
  },
});
