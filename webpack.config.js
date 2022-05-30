// webpack.config.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  target: 'web', // 默认打包成web平台的
  mode: 'production', // 环境 development 和 production 环境 链接： https://www.webpackjs.com/concepts/mode/#mode-development
  entry: path.resolve(__dirname, './src/index.tsx'), // 文件的入口
  output: {
    filename: 'js/[name].[chunkhash:8].js', // 文件名
    path: path.resolve(__dirname, './dist') // 文件输出地址
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: '项目',
      filename: 'index.html',
      template: path.resolve(__dirname, './index.ejs'),
      hash: true,
      cache: false,
      inject: true,
      minify: {
        removeComments: true,
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        minifyJS: true, // 在脚本元素和事件属性中缩小JavaScript(使用UglifyJS)
        minifyCSS: true // 缩小CSS样式元素和样式属性
      },
      nodeModules: path.resolve(__dirname, './node_modules')
    }),
    new MiniCssExtractPlugin({ filename: 'css/[name].[contenthash:8].css' }), // 设置文件存放的位置和名称
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/, // 图片
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/images/[name].[ext]' // 存放的位置： dist/assets/images/文件
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/, // 字体
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/fonts/[name].[ext]'// 存放的位置： dist/assets/fonts/文件
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // 'style-loader', 因为我们直接用的 mode是'production' 所以就直接替换了
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/i,
        use: [
          MiniCssExtractPlugin.loader, // 'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
    ]
  },


  resolve: {
    extensions: ['.tsx', '.js', '.ts', '.less', '.css']
  },
}