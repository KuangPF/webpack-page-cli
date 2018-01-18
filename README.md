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
    * extract-text-webpack-plugin
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
- 在`ebpack.base.conf.js`入口文件`entry`添加入口，`{pageA: './src/js/pageA.js'}`
- 如果还有更多的页面，依次类推


## 加载器
- [babel-loader](https://github.com/babel/babel-loader): 是转化 `es6`代码，方便浏览器解析
- [html-loader](https://github.com/webpack-contrib/html-loader): 对`.html || .htm`文件进行处理
- [url-loader](https://github.com/webpack-contrib/url-loader): 对图片，音频。字体文件进行处理，依赖于`file-loader`，有一个选项 `limit`当处理图片时，可以设置一个值，如果图片大小小于这个值，就将其转化为base64,反之则不转化
- [style-loader](https://github.com/webpack-contrib/style-loader): `webpack`的样式加载器,通过注入`<style>`标签将`CSS`添加到`DOM`中,建议将它与`css-loader`结合使用
- [css-loader](https://github.com/webpack-contrib/css-loader): 如果我们在打包的入口`js`文件中`import`了`css`文件，并且想要把`css`文件作为`<style>`的内容插入到模版文件，这时就需要`css-loader`加载`css`
- [postcss-loader](https://github.com/postcss/postcss-loader): `postcss-loader`是为了解决`CSS`浏览器的兼容性问题，比如`flex,transform`等属性，该`loader`会为其加上兼容性前缀
- [sass-loader](https://github.com/webpack-contrib/sass-loader): 处理`.scss`文件，将`scss`预处理语言转化为可处理的`css`
- [less-loader](https://github.com/webpack-contrib/less-loader): 处理`.less`文件，将`less`预处理语言转化为可处理的`css`
- [stylus-loader](https://github.com/shama/stylus-loader): 处理`.styl`文件，将`stylus`预处理语言转化为可处理的`css`

## 插件

#### [webpack-dev-serve](https://github.com/webpack/webpack-dev-server)
`webpack-dev-server`应该是`webpack`插件中必不可少的一部分，主要是为在开发过程中提供一个服务，利用其热更新的功能让开发变得很方便。当执行`webpack-dev-server`时，第一步和`webpack`一样，先构建输出，然后提供`web`访问，但需要指出的是，输出的文件是在内存中。webpack-dev-server支持两种模式来自动刷新页面
- `iframe`模式(页面放在iframe中,当发生改变时重载)
- `inline`模式(将`webpack-dev-sever`的客户端入口添加到包(bundle)中)
两种模式都支持热模块替换(Hot Module Replacement).热模块替换的好处是只替换更新的部分,而不是页面重载.
`iframe`模式：使用这种模式不需要额外的配置,只需要这种URL格式访问即可：`http://«host»:«port»/webpack-dev-server/«path»`
`inline`模式:inline模式下我们访问的URL不用发生变化:`webpack-dev-server --content-base build --inline --hot`

#### [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)
将 webpack中`entry`配置的相关入口thunk  和  `extract-text-webpack-plugin`抽取的css样式   插入到该插件提供的`template`或者`templateContent`配置项指定的内容基础上生成一个html文件，具体插入方式是将样式`link`插入到`head`元素中，`script`插入到`head`或者`body`中，通过`new HtmlWebpackPlugin({})`

    {
        entry: 'index.js',
        output: {
        path: __dirname + '/dist',
        filename: 'index_bundle.js'
      },
        plugins: [
            new HtmlWebpackPlugin({
              title: 'My App',
              filename: 'assets/admin.html'
            })
          ]
    }
##### 参数配置
- title:生成`html`文件的标题
- filename：要写入HTML的文件名，默认为index.html，你也可以在这里指定一个子目录（例如：assets / admin.html）
- template：根据自己的指定的模板文件来生成特定的 html 文件。这里的模板类型可以是任意你喜欢的模板，可以是 html, jade, ejs, hbs, 等等，但是要注意的是，使用自定义的模板文件时，需要提前安装对应的 loader， 否则webpack不能正确解析。
- inject：注入选项，有四个选项值 true, body, head, false.
   - true
     - 默认值，script标签位于html文件的 body 底部
   - body
     - 同 true
   - head
     - script 标签位于 head 标签内
   - false
     - 不插入生成的 js 文件，只是单纯的生成一个 html 文件。
- favicon: 给生成的 html 文件生成一个 favicon。属性值为 favicon 文件所在的路径名。
- minify: minify 的作用是对 html 文件进行压缩，minify 的属性值是一个压缩选项或者 false 。默认值为false, 不对生成的 html 文件进行压缩，[配置参数](https://github.com/kangax/html-minifier#options-quick-reference)。
- hash: hash选项的作用是 给生成的 js 文件一个独特的 hash 值，该 hash 值是该次 webpack 编译的 hash 值。默认值为 false 。
- cache: 默认值是 true。表示只有在内容变化时才生成一个新的文件。
- showErrors: showErrors 的作用是，如果 webpack 编译出现错误，webpack会将错误信息包裹在一个 pre 标签内，属性的默认值为 true ，也就是显示错误信息。。
- chunks:chunks 选项的作用主要是针对多入口(entry)文件。当你有多个入口文件的时候，对应就会生成多个编译后的 js 文件。那么 chunks 选项就可以决定是否都使用这些生成的 js 文件。chunks 默认会在生成的 html 文件中引用所有的 js文件，当然你也可以指定引入哪些特定的文件。
- chunksSortMode： 这个选项决定了 script 标签的引用顺序。默认有四个选项，'none', 'auto', 'dependency', '{function}'。
- excludeChunks： 与chunks相反，不要哪些模块。
- xhtml： 一个布尔值，默认值是 false ，如果为 true ,则以兼容 xhtml 的模式引用文件。

#### [extract-text-webpack-plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin)
为了让打包后样式生效，有两种方法，一种是使用style-loader自动将css代码放到生成的style标签中插入到head标签里。另一种就是使用extract-text-webpack-plugin插件，将样式文件单独打包，打包输出的文件由配置文件中的output属性指定。然后我们在入口HTML页面写个link标签引入这个打包后的样式文件。
##### 参数配置
- id: 这个插件实例的唯一标识符。（仅限高级用法，默认情况下自动生成）
- filename: 生成文件的文件名。可能包含 [name], [id] and [contenthash]。
- allChunks: 从所有额外的 chunk(additional chunk) 提取（默认情况下，它仅从初始chunk(initial chunk) 中提取）
当使用 CommonsChunkPlugin 并且在公共 chunk 中有提取的 chunk（来自ExtractTextPlugin.extract）时，allChunks **必须设置为 true.
- disable: 禁用插件。
- ignoreOrder: 禁用顺序检查 (这对 CSS 模块很有用！)，默认 false.
##### 利用其`extract`提取`css`
注：适用于多于一个 ExtractTextPlugin 实例的情形

    const ExtractTextPlugin = require('extract-text-webpack-plugin');
    module.exports = {
      module: {
        rules: [
          {
            test: /\.(css|scss|less|styl)$/,
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: ['css-loader', 'sass-loader']
            })
          }
        ]
      },
      plugins: [
        new ExtractTextPlugin('style.css')
        //if you want to pass in options, you can do so:
        //new ExtractTextPlugin({
        //  filename: 'style.css'
        //})
      ]
    }

#### [webpack-merge](https://github.com/survivejs/webpack-merge)
`webpack-merge`的作用在于将多个`webpack`的配置合并成一个配置，比如在该项目中，有一个`webpack.base.conf.js`这个是基础配置
还有`webpack.dev.conf.js`开发环境的一些配置以及`webpack.prod.conf`生成环境的一些配置、我们需要将基础配置和开发环境配置合并在一起，这就需要`webpack-merge`，同理生产环境一样。配置方法如下:
##### merge(...configuration | [...configuration])
    // Default API
    var output = merge(object1, object2, object3, ...);
    // You can pass an array of objects directly.
    // This works with all available functions.
    var output = merge([object1, object2, object3]);

#### [friendly-errors-webpack-plugin](https://github.com/geowarin/friendly-errors-webpack-plugin)
这个插件的作用就是友好的输出webpack的一些警告、错误等信息。
##### 用法
    new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: ['You application is running here http://localhost:3000'],
            notes: ['Some additionnal notes to be displayed unpon successful compilation']
          },
          onErrors: function (severity, errors) {
            // You can listen to errors transformed and prioritized by the plugin
            // severity can be 'error' or 'warning'
          },
          // should the console be cleared between each compilation?
          // default is true
          clearConsole: true,
        
          // add formatters and transformers (see below)
          additionalFormatters: [],
          additionalTransformers: []
    })
##### demo


Build success:

![build-success](https://camo.githubusercontent.com/8626811b709addc6e4e953b1ed2d3414fc843522/687474703a2f2f692e696d6775722e636f6d2f4d6b554568597a2e676966)

eslint-loader errors

![eslint-loader-errors](https://camo.githubusercontent.com/c256a672a786f2cc15037e8a371a886ffe9505bd/687474703a2f2f692e696d6775722e636f6d2f5735397a3857462e676966)

babel-loader syntax errors

![babel-loader syntax errors](https://camo.githubusercontent.com/c256a672a786f2cc15037e8a371a886ffe9505bd/687474703a2f2f692e696d6775722e636f6d2f5735397a3857462e676966)

Module not found

![module-not-found](https://camo.githubusercontent.com/2e42570a995dd411ac49739cd02ebabf447b559b/687474703a2f2f692e696d6775722e636f6d2f4f6976573441732e676966)

#### [copy-webpack-plugin](https://github.com/webpack-contrib/copy-webpack-plugin)
该插件将单个文件或整个目录复制到构建目录。
##### 使用
`new CopyWebpackPlugin([patterns], options)`
##### 配置
- from：定义要拷贝的源目录。
- to： 定义要拷贝到的目录。
- toType： file || dir || template.
- context: A path that determines how to interpret the from path(不太明白作用，还望牛人告知...)。
- flatten: 只拷贝文件不管文件夹 ,默认`false`.
- ignore： 忽略拷贝指定的文件，可以用模糊匹配。
- transform： Function that modifies file contents before writing to webpack.
- force： Overwrites files already in compilation.assets (usually added by other plugins).

#### [optimize-css-assets-webpack-plugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin)
`optimize-css-assets-webpack-plugin`用于压缩提取出的css，并解决ExtractTextPlugin分离出的js重复问题(多个文件引入同一css文件)。

#### [uglifyjs-webpack-plugin](https://github.com/webpack-contrib/uglifyjs-webpack-plugin)
这个插件使用 UglifyJS 去压缩你的JavaScript代码。除了它从 webpack 中解耦之外，它和 webpack 核心插件 (webpack.optimize.UglifyJSPlugin) 是同一个插件。这允许你控制你正在使用的 UglifyJS 的版本。
##### 参数配置
- test: 测试匹配的文件。
- include: 	只测试包含的文件。
- exclude: 	要从测试中排除的文件。
- cache: 是否启用文件缓存,默认`false`.
- parallel： 是否使用多进程并行运行来提高构建速度，默认`false`.
- sourceMap： 是否使用 SourceMaps 将错误信息的位置映射到模块。这会减慢编译的速度，默认`false`.
- uglifyOptions： uglify [Options](https://github.com/mishoo/UglifyJS2/tree/harmony#minify-options).
- extractComments:  是否将注释解压到一个单独的文件中，默认`false`.
- warningsFilter: 是否过滤到`uglify`警告。

## 版本

目前版本`1.0.0`,持续更新~ 欢迎star

## 小结
其实写这个项的目的有两个，第一就是生成一个脚手架，方便以后项目的重复利用，第二就是将`webpack`的一些知识再次复习一下。现在技术更新的太快了，前几天看了一下新的打包工具[parcel](https://parceljs.org/),发现其打包速度很快，而且几乎0配置，但也有缺点，生成后的文件比较大。还有比较坑的一点是，如果发现一些莫名奇妙的错误可能答案都找不到...毕竟parcel还很年轻。其实这样也挺好的，有竞争才会有有更好的产品，`webpack`也更新的十分迅速，目前版本`3.10.0`。最后这篇文章如果什么错误还希望大牛们提[issues](https://github.com/KuangPF/webpack-cli/issues)，另外就是该项目的主要参考了[vue-cli](https://github.com/vuejs/vue-cli),目的仅限于交流学习@[Evan You](https://github.com/yyx990803).