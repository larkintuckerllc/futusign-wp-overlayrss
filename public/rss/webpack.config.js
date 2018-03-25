const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BablePluginTransformObjectRestSpread = require('babel-plugin-transform-object-rest-spread');
const AppCachePlugin = require('appcache-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = env => ({
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: env === 'production' ? 'source-map' : 'cheap-eval-source-map',
  entry: './src/index.jsx',
  output: {
    filename: '[name].[chunkhash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react', 'flow'],
          plugins: [BablePluginTransformObjectRestSpread],
        },
      }, {
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 2,
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
            },
          ],
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
    ],
  },
  plugins: [
    new UglifyJSPlugin({ sourceMap: true }),
    new ExtractTextPlugin('styles.[contenthash].css'),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
    }),
    new CopyWebpackPlugin([
      { from: 'data', to: 'data' },
    ]),
    new CleanWebpackPlugin(['dist']),
    new AppCachePlugin({
      exclude: [
        /.*\.map$/,
        /index.html/,
        /data\/.*/,
      ],
      output: 'index.appcache',
    }),
  ],
});
