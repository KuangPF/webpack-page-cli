# webpack-page-cli

![npm-version](https://img.shields.io/npm/v/webpack-page-cli.svg?style=flat) ![download](https://img.shields.io/npm/dm/webpack-page-cli.svg?style=flat) ![webpack-version](https://img.shields.io/badge/webpack-v4.8.3-brightgreen.svg) 


## 安装

``` bash 
npm install webpack-page-cli -g 
# OR
yarn global add webpack-page-cli
```

## 使用

``` bash 
webpack-page create <app-name>
```

## 功能

:white_check_mark: es6 ➡️ es5

:white_check_mark: css 预处理器支持（scss less stylus）

:white_check_mark: eslint

:white_check_mark: stylelint

:white_check_mark: 多页面支持

:white_check_mark: 模块热替换 (HRM)

## 相关截图

<img width=600 src='https://user-images.githubusercontent.com/20694238/58763330-d0b54600-858b-11e9-8234-53a3dd264db4.png'>

## 目录结构
    webpack-page-cli
    |
    ├─build
    |   ├─build.js              // webpack 打包时运行的文件，配置了控制台的一些输出信息         
    |   ├─utils.js              // 一些工具类，比如会将开发过程中报的错通知windows || mac || linux
    |   ├─webpack.base.conf.js  // webpack基础配置，包含了打包入口以及出口，还有对js,图片,音频,特殊字体的处理等
    |   ├─webpack.dev.conf.js   // 增加了对css的处理，配置了 webpack-dev-server
    |   ├─webpack.prod.conf.js  // 增加了对css的处理，打包后进行压缩，已经将static目录下的静态资源copy到打包后的static目录下
    |   └─webpack.svg           // notifier.notify 在通知客户端显示的图标
    |
    |─config
    |   ├─dev.env.js            // 定义开发标识     
    |   ├─index.js              // 对于开发和打包的配置，比如开发作用端口，开发的路径，以及生产环境的公共路径等等
    |   └─prod.env.js           // 定义生产环境标识
    |  
    ├─dist
    |   └─static
    |   |    ├─css              // 生产环境的 css,支持sass,less,stylus
    |   |    ├─img              // 生产环境的 img
    |   |    └─js               // 生产环境的 js
    |   └─index.html            // 生产环境的 index.html
    |         
    ├─node_modules              // nmp install 模块
    ├─src
    |   ├─css                   // 开发环境的 css
    |   ├─img                   // 开发环境的 img
    |   |─font                  // 开发环境的 font
    |   |─js                    // 开发环境的 font
    |   └─index.html            // 开发环境的 index.html
    |
    |─static                    // 静态资源，比如一些类库，打包后会直接打包到 /dist/static目录下
    |   └─.gitkeep
    ├─.balelrc                  // es6 ==> es5
    ├─.eslintrc.js              // eslint 配置
    ├─.stylelintrc.json         // stylelint 配置   
    ├─.gitignore                // git 提交忽略
    ├─favicon.icon              // icon
    ├─package.json              // npm 脚本  项目描述
    ├─postcss.config.js         // postcss插件配置
    └─README.md


## 多页面配置

该脚手架支持多页面配置，对于多页面配置如下
- 在src目录下面新建`pageA.html`,在src/js/ 目录下面新建`pageA.js`(页面名称和js名字一定要一样，因为在打包时候会根据`js`文件的名称生成对应的`html`模板)
- 在`webpack.base.conf.js`入口文件`entry`添加入口，`{pageA: './src/js/pageA.js'}`
- 如果还有更多的页面，依次类推
