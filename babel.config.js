module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          components: './src/components',
          contexts: './src/contexts',
          database: './src/database',
          hooks: './src/hooks',
          navigators: './src/navigators',
          screens: './src/screens',
          sources: './src/sources',
          theme: './src/theme',
          types: './src/types',
          utils: './src/utils',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
