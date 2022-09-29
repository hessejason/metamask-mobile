// eslint-disable-next-line import/no-commonjs
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    './plugins/remove-flask-code',
    'transform-inline-environment-variables',
    'react-native-reanimated/plugin',
  ],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
};
