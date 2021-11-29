'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    // Add options here
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  const { Webpack } = require('@embroider/webpack');
  return require('@embroider/compat').compatBuild(app, Webpack, {
    skipBabel: [
      {
        package: 'qunit',
      },
    ],
    packagerOptions: {
      webpackConfig: {
        // when this is enabled, we get `ObjectMiddleware.register: serializer for mini-css-extract-plugin/dist/CssModule/null is already registered`
        // plugins: [new MiniCssExtractPlugin()],
        module: {
          rules: [
            {
              test: /\.s[ac]ss$/i,
              use: [
                MiniCssExtractPlugin.loader,
                // app.env === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    url: false,
                    import: true,
                    modules: 'global',
                  },
                },
                'sass-loader',
              ],
            },
          ],
        },
      },
    }
  });
};
