const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
const CopyPlugin = require('copy-webpack-plugin');

const styledComponentsTransformer = createStyledComponentsTransformer({ ssr: false });
const webAppDir = __dirname;
const rootDir = path.resolve(webAppDir, '.');
const distDir = path.join(webAppDir, 'dist');
const appCoreDir = path.join(rootDir, 'src/app_core');
const componentsDir = path.join(rootDir, 'src/components');

const unknownVersion = 'unknown';

module.exports = {
  mode: 'development',
  entry: './src/main.ts',
  // devtool: isProd ? 'source-map' : 'inline-source-map',
  context: rootDir,
  output: {
    path: distDir,
    filename: 'bundle.[hash].js',
    // sourceMapFilename: 'sourcemaps/[name].[chunkhash].map.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            getCustomTransformers: () => ({ before: [styledComponentsTransformer] }),
            onlyCompileBundledFiles: true
          }
        },
        include: rootDir,
        exclude: [/node_modules/, /\.test\.ts/]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true // isDev
            }
          },
          'css-loader'
        ]
      }
      // ,{
      //   test: /\.(png|jpe?g|gif|svg)$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: { name: '[name]-[hash].[ext]', outputPath: 'assets' }
      //     }
      //   ]
      // }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@app-core': appCoreDir,
      '@components': componentsDir
    }
  },
  plugins: [
    new CleanWebpackPlugin({ verbose: true }),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new CopyPlugin({
      patterns: [
        { from: './favicon.ico', flatten: true },
      ]
    }),
  ],
  optimization: {
    namedModules: true,
    namedChunks: true,
    splitChunks: {
      chunks: 'all'
    },
    noEmitOnErrors: true
  },
  devServer: {
    contentBase: distDir,
    compress: false,
    port: 3001,
    historyApiFallback: true
  },
  watchOptions: {
    ignored: [distDir, 'node_modules'],
    aggregateTimeout: 2500
  }
};
