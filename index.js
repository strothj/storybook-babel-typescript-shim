const genDefaultConfig = require("@storybook/react/dist/server/config/defaults/webpack.config");

Object.defineProperty(exports, "__esModule", { value: true });

Object.defineProperty(exports, "genDefaultConfig", {
  enumerable: true,
  get: function get() {
    return genDefaultConfig.default || genDefaultConfig;
  },
});
