const path = require('path');
const DemoPlugin = require('./plugins/DemoPlugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolveLoader: { // loader路径查找顺序从左往右
    modules: ['node_modules', './loader']
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          path.resolve(__dirname, 'loader', 'style-loader'),
          path.resolve(__dirname, 'loader', 'less-loader'),
        ]
      },
      // {
      //   test: /\.js$/,
      //   use: [
      //     {
      //       loader: 'syncLoader',
      //       options: {
      //         message: '前端工程师'
      //       }
      //     },
      //     {
      //       loader: 'asyncLoader'
      //     }
      //   ]
      // }
    ]
  },
  plugins: [
    new DemoPlugin()
  ]
}
