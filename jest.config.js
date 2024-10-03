module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-navigation|react-navigation|@react-native|@react-native-community|@expo|expo)/)"
  ],
};
