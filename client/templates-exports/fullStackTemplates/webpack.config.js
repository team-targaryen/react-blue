const webpack = `const webpack = require('webpack');
const path = require('path');
const status = process.env.NODE_ENV;

module.exports = {
  mode: status,
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?/i,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /node_modules/,
      }
    ]},
    devServer: {
      publicPath: '/build',
      contentBase: path.resolve(__dirname, 'assets')
    },
    resolve: {
      extensions: ['*', '.js', '.jsx'],
    }
};`
export default webpack;
