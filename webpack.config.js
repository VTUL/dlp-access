const webpack = require('webpack');
const path = require('path');

const config = {
  entry: [
    'react-hot-loader/patch',
    './src/index.tsx'
  ],
  output: {
    hashFunction: 'sha256',
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(mjs|js|jsx)$/,
        use: 'babel-loader',
        include: /node_modules/
      },
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    'static': {
      directory: './dist'
    }
  },
  resolve: {
    extensions: [
      'webpack.config.js',
      '.mjs',
      '.tsx',
      '.ts',
      '.js',
      '.json',
      '.css',
      '.scss'
    ],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  }
};

module.exports = config;
