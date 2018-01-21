const wrapMessage = require("./wrapMessage");

const storybookModuleKeyRegex = /node_modules[\\\/]@storybook[\\\/]react/;

const resolveHostPackagePath = () => {
  const storybookModuleCacheKey = Object.keys(require.cache).find(k =>
    storybookModuleKeyRegex.test(k)
  );

  if (!storybookModuleCacheKey)
    throw new Error(
      wrapMessage("Unable to locate parent package using require cache")
    );

  const trimIndex = storybookModuleKeyRegex.exec(storybookModuleCacheKey).index;
  return storybookModuleCacheKey.substr(0, trimIndex - 1);
};

module.exports = resolveHostPackagePath;
