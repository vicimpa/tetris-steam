import { join } from "path";
import { Configuration } from "webpack";

module.exports = {
  entry: {
    'index': './index.ts'
  },
  output: {
    filename: '[name].js',
    path: join(__dirname, 'dist'),
    publicPath: '/dist/'
  },
  resolve: { extensions: ['.js', '.json', '.ts']},
  devtool: 'inline-source-map',
  mode: 'development',
  watch: true,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
} as Configuration