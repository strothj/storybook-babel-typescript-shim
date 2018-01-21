const fs = require("fs");
const path = require("path");
const wrapMessage = require("./wrapMessage");
const configPaths = require("./configPaths");

try {
  require("@babel/register")({
    extensions: [".ts", ".tsx"],
  });
} catch (e) {
  throw new Error(
    wrapMessage(
      "Unable to load @babel/register. Make sure you have the @babel/register and @babel/core packages installed."
    )
  );
}

const addWebpackTypeScriptShim = (baseConfig, env) => {
  let createWebpackConfig = require(configPaths["webpack.config"]);
  createWebpackConfig = createWebpackConfig.default || createWebpackConfig;

  const config = createWebpackConfig(baseConfig, env);

  // Replace Webpack entries that point to this package's stubs with those in
  // the user's .storybook directory.
  Object.values(config.entry).forEach(entry => {
    entry.forEach((filename, index) => {
      const matchingEntry = findMatchingEntryToStub(filename);
      if (matchingEntry) entry[index] = configPaths[matchingEntry];
    });
  });

  return config;
};

const targetReplacementFilenames = [/addons\.js$/, /config\.js$/];
const findMatchingEntryToStub = filename => {
  for (let i = 0; i < targetReplacementFilenames.length; i += 1) {
    if (targetReplacementFilenames[i].test(filename)) {
      // Match sure the entry is actually one of the ones we're looking for and
      // not another file with the same name. It is possible that another entry
      // was added named addons.js or config.js.
      const fileContents = fs.readFileSync(filename, "utf8");
      if (fileContents.includes("## STORYBOOK-BABEL-TYPESCRIPT-SHIM ##")) {
        // Trim the file path and return a key (addons / config) which
        // corresponds to the keys in configPaths.
        return filename.substring(
          targetReplacementFilenames[i].exec(filename).index,
          filename.length - 3
        );
      }
    }
  }
};

module.exports = addWebpackTypeScriptShim;
