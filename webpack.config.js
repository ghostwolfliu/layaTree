let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
if (process.env.NODE_ENV === 'production') {

}

module.exports = {
    entry: {
        popup: path.resolve(__dirname, "./src/popup/main.js")
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/',
        filename: '[name].main.js'
    },
    module: {
        rules: [{
            test: /\.(less|css)$/,
            use: [
              'vue-style-loader',
              'css-loader'
            ],
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              scss: 'style-loader!css-loader!sass-loader',
              sass: 'style-loader!css-loader!sass-loader?indentedSyntax',
            }
            // other vue-loader options go here
          }
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.(png|jpg|gif|svg|ttf|woff|woff2|eot)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]'
          }
        }]
    },  
    devServer: {
        contentBase: "./dist",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        noInfo: true,
        inline: true,//实时刷新
        overlay: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // webpack 执行之前删除dist下的文件
        new CleanWebpackPlugin(
          ['dist/*'],
          {
            root: __dirname,//根目录
            verbose: true,//开启在控制台输出信息
            dry: false,//启用删除文件
          }),
        //popup.html
        new HtmlWebpackPlugin({
          template: __dirname + "/src/popup/popup.html",
          filename: 'popup.html',
          inject: 'body',
          chunks: ['popup']
        }),
        
        // 拷贝静态资源(manifest.json)
        new CopyWebpackPlugin([
          {
            from: path.resolve(__dirname, 'src/assets/'),
            to: 'static',
            force: true,
            // ignore: ['.*']
          },
          {
            from: path.resolve(__dirname, 'manifest.json'),
            to: path.resolve(__dirname, 'dist/')
          }]),
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: '"production"'
          }
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //   sourceMap: true,
        //   compress: {
        //     warnings: false
        //   }
        // }),
        new webpack.LoaderOptionsPlugin({
          minimize: true
        })
      ],
      devtool: '#source-map',
      devServer: {
        contentBase: "./dist",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        noInfo: true,
        inline: true,//实时刷新
        overlay: true
      },
      performance: {
        hints: false
      }
}