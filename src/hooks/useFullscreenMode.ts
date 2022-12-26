// import {useCallback, useEffect} from 'react';
// import {StatusBar} from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import * as NavigationBar from 'expo-navigation-bar';

// import {useTheme} from './useTheme';
// import useAppSettings from './useAppSettings';

// const useFullscreenMode = () => {
//   const {isDarkMode} = useTheme();

//   const {addListener} = useNavigation();
//   const {READER_FULLSCREEN_MODE} = useAppSettings();

//   const setFullScreenMode = useCallback(async () => {
//     if (READER_FULLSCREEN_MODE) {
//       StatusBar.setHidden(true);
//       await NavigationBar.setVisibilityAsync('hidden');
//     } else {
//     }
//   }, [READER_FULLSCREEN_MODE]);

//   const showNavigationBars = useCallback(async () => {
//     StatusBar.setHidden(false);
//     await NavigationBar.setVisibilityAsync('visible');
//   }, []);

//   useEffect(() => {
//     setFullScreenMode();
//   }, [setFullScreenMode]);

//   useEffect(() => {
//     const unsubscribe = addListener('beforeRemove', () => {
//       showNavigationBars();
//       StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content');
//     });

//     return unsubscribe;
//   }, []);

//   return {setFullScreenMode, showNavigationBars};
// };

// export default useFullscreenMode;
