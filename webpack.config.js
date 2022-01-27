const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './client/index.jsx',
  output: {
      path: path.join(__dirname, 'build'),
      filename: 'bundle.js',
  },
  plugins: [new HtmlWebpackPlugin({template: 'index.html'})],
  module: {
    rules: 
    [
      {
        test: /\.css$/i,
        use: ['style-loader','css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      },
      { 
        test: /\.jsx?/, 
        exclude: /(node_modules)/,
          use: {
              loader: 'babel-loader',
              options: {
                  presets: ['@babel/preset-env', '@babel/preset-react'],
              },
          },
      },
    ]
  },
  devServer: {
    static: {
      publicPath: path.join(__dirname, 'build')
    },
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
}