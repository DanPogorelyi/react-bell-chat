const path = require('path');
const webpack = require('webpack');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

var isLocalBuild = process.env && process.env.NODE_ENV && process.env.NODE_ENV.trim().toString() == 'local';

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    entry: { 'index': './src/lib/index.ts' },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: /src/,
                use: 'awesome-typescript-loader?silent=true'
            }
        ]
    },
    output:
        {
            path: path.join(__dirname, '../lib'),
            filename: '[name].js',
            publicPath: '../lib/', // Webpack dev middleware, if enabled, handles requests for this URL prefix
            libraryTarget: 'umd'
        },
    plugins: [
        new CheckerPlugin(),
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map', // Remove this line if you prefer inline source maps
            moduleFilenameTemplate: path.relative('../lib', '[resourcePath]') // Point sourcemap entries to the original file locations on disk
        })
    ],
    mode: isLocalBuild ? "development" : "production",
    ...(!isLocalBuild
      ? {
          optimization: {
            minimizer: [
              new TerserPlugin({
                parallel: true,
                sourceMap: isLocalBuild,
                cache: true
              }),
              new OptimizeCSSAssetsPlugin({}),
              new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 100000 })
            ],
            splitChunks: {
              cacheGroups: {
                /*default: false,
                vendors: false,*/
                // vendor chunk
                /*vendor: {
                  // sync + async chunks
                  chunks: "all",
                  // import file path containing node_modules
                  test: /node_modules/
                }*/
              }
            }
          }
        }
      : {})
};