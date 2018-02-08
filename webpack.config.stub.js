module.exports = (baseConfig, env, defaultConfig) => {
  // Use provided default config if available (Storybook 3.4+)
  if (typeof defaultConfig !== "undefined") return defaultConfig;

  const genDefaultConfig = require("@storybook/react/dist/server/config/defaults/webpack.config.js");
  return genDefaultConfig(baseConfig, env);
};
