# webpack-cli

> 基于 webpack 3.10.0 的页面打包脚手架,支持单页面和多页面 :hammer:

> 参考 vue-cli 脚手架配置，支持`es6`,`eslint`以及热更新 :wrench:

## 目录
* [介绍](#介绍)
* [webpack-cli](#webpack-cli)
* [使用](#使用)
* [目录结构](#目录结构)
* [多页面配置](#多页面配置)
* [加载器](#加载器)
  * babel-loader
  * html-loader
  * url-loader
  * style-loader
  * css-loader
  * postcss-loader
  * sass-loader
  * less-loader
  * stylus-loader
* [插件](#插件)
    * webpack-dev-serve
    * html-webpack-plugin
    * webpack-merge
    * friendly-errors-webpack-plugin
    * copy-webpack-plugin
    * optimize-css-assets-webpack-plugin
    * uglifyjs-webpack-plugin
* [版本](#版本)
* [小结](#小结)
## 介绍
`webpack`是目前前端非常流行的打包工具，它可以把模块(s)连同它的依赖一起打包生成包含这些模块的静态资源，这也是其优点所在。在webpack看来一切都是模块！包括你的JavaScript代码，也包括CSS和fonts以及图片等等等，只要通过合适的loaders，它们都可以被当做模块被处理。

## webpack-cli
`webpack`这么好，这么方便，哪有不用之理。但是...‘理想是美好的，现实是残酷的’，当我第一次接触`webpack`时，看了官方文档一遍又一遍，读了博客一篇又一篇，踩了坑一个又一个，（可能由于 `too vegetables`）还是有点懵。然后自尝试写一下配置，就逐渐明白了其中的一些套路。然后由于又在使用`vue-cli`脚手架开发一些项目，再研究了一些`vue-cli`其中的`webpack`的配置，最终抽离了其中的配置部分，形成了`webpack-cli`，目录结构与`vue-cli`相似，仅限于学习，交流。
该脚手架适用于单页面以及多页面项目，如果你才接触`webpack`，对于其配置有点迷，然后又想利用`webpack`在开发中的简单方便，那么你就可以使用该脚手架。

## 使用
先`git clone`到本地，由于本项目使用包管理工具NPM，因此需要先把本项目所依赖的包下载下来：

    npm install || cnpm install(网络不佳推荐使用)
启动服务，利用`webpack`提供的插件`webpack-dev-server`来进行开发（启动后会有个[demo](https://kuangpf.github.io/webpack-cli/dist/index.html)）

    npm run dev
打包

    npm run build

## 目录结构
    webpack-cli
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
    ├─.balelrc                  // es6==>es5
    ├─.eslintrc.js              // eslint 配置
    ├─.gitignore                // git 提交忽略
    ├─favicon                   // icon
    ├─package.json              // npm 脚本  项目描述
    ├─postcss.config.js         // postcss插件配置
    └─README.md


## 多页面配置
该脚手架支持多页面配置，对于多页面配置如下
- 在src目录下面新建`pageA.html`,在src/js/ 目录下面新建`pageA.js`(页面名称和js名字一定要一样，因为在打包时候会根据`js`文件的名称生成对应的`html`模板)
- 在`webpack.base.conf.js`入口文件`entry`添加入口，`{pageA: './src/js/pageA.js'}`
- 如果还有更多的页面，依次类推


## 版本

目前版本`1.0.0`,持续更新~ 欢迎star

## 小结
其实写这个项的目的有两个，第一就是生成一个脚手架，方便以后项目的重复利用，第二就是将`webpack`的一些知识再次复习一下。现在技术更新的太快了，前几天看了一下新的打包工具[parcel](https://parceljs.org/),发现其打包速度很快，而且几乎0配置，但也有缺点，生成后的文件比较大。还有比较坑的一点是，如果发现一些莫名奇妙的错误可能答案都找不到...毕竟parcel还很年轻。其实这样也挺好的，有竞争才会有有更好的产品，`webpack`也更新的十分迅速，目前版本`3.10.0`。最后这篇文章如果什么错误还希望大牛们提[issues](https://github.com/KuangPF/webpack-cli/issues)，另外就是该项目的主要参考了[vue-cli](https://github.com/vuejs/vue-cli),目的仅限于交流学习@[Evan You](https://github.com/yyx990803).