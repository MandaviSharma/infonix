const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

// Get the default Metro configuration
const defaultConfig = getDefaultConfig(__dirname);

// Merge the Reanimated Metro configuration with the default config
const config = mergeConfig(defaultConfig, {
  // Any custom config can go here if needed
});

// Apply Reanimated Metro config wrapper
module.exports = wrapWithReanimatedMetroConfig(config);
