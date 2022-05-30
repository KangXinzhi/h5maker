// webpack.config.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  target: 'web', // 默认打包成web平台的
  mode: 'development', // 环境 development 和 production 环境 链接： https://www.webpackjs.com/concepts/mode/#mode-development
  entry: path.resolve(__dirname, './src/index.tsx'), // 文件的入口
  output: {
    filename: 'js/[name].[hash:8].js', // 文件名
    path: path.resolve(__dirname, './dist') // 文件输出地址
  },
  plugins: [
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
    new MiniCssExtractPlugin({ filename: 'css/[name].css' }), // 设置文件存放的位置和名称
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
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/i,
        use: [
         'style-loader',
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
  devServer: { // 新增webpack-dev-server 的配置
    headers: { 'Access-Control-Allow-Origin': '*' },
    hot: true, // 热更新
    host: '127.0.0.1', // 地址
    port: '8081', // 端口
    open: true, // 是否自动打开
    setupExitSignals: true,
    compress: true
  }
}