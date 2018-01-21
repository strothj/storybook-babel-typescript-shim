const fs = require("fs");
const path = require("path");
const wrapMessage = require("./wrapMessage");
const hostPackagePath = require("./resolveHostPackagePath")();

// Perform sanity check.
if (
  !fs.existsSync(
    path.resolve(
      hostPackagePath,
      "node_modules/storybook-babel-typescript-shim/package.json"
    )
  )
) {
  throw new Error(wrapMessage("Failed to properly resolve host package path."));
}

const paths = ["addons", "config", "webpack.config"].reduce((acc, file) => {
  // Locate any existing config files in user's .storybook directory.
  [".js", ".ts", ".tsx"].forEach(ext => {
    if (acc[file]) return;
    const filePath = path.resolve(hostPackagePath, ".storybook", file + ext);
    if (fs.existsSync(filePath)) acc[file] = filePath;
  });

  if (!acc[file] && file === "config") {
    throw new Error(
      wrapMessage(
        "Create a config.(ts|tsx|js) file at " +
          path.resolve(hostPackagePath, ".storybook")
      )
    );
  }

  // Replace missing config files with stubs from this package.
  if (!acc[file])
    acc[file] = path.resolve(
      __dirname,
      file === "webpack.config" ? "webpack.config.stub" : file + ".js"
    );

  return acc;
}, {});

module.exports = paths;
