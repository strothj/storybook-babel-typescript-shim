# [storybook-babel-typescript-shim]

Provides a shim to allow for writing [Storybook] config files using TypeScript through the Babel transform.

## Usage

### Install the package

```shell
$ npm install --save-dev storybook-babel-typescript-shim @babel/register @types/webpack

$ yarn add --dev storybook-babel-typescript-shim @babel/register @types/webpack
```

### Point Storybook to the shim

package.json

```json
{
  "scripts": {
    "storybook":
      "start-storybook -p 9001 -c node_modules/storybook-babel-typescript-shim"
  }
}
```

### Create Storybook config files

Create a directory `.storybook` in your project directory with the normal Storybook config files ending in any of the extensions: .js, .ts, .tsx.

## genDefaultConfig

This project re-exports the Storybook `genDefaultConfig` function with Webpack typings.

```typescript
import { genDefaultConfig } from "storybook-babel-typescript-shim";

const config = genDefaultConfig(baseConfig, env);
// config is a webpack.Configuration
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)

[storybook-babel-typescript-shim]: https://github.com/strothj/storybook-babel-typescript-shim
[storybook]: https://github.com/storybooks/storybook
