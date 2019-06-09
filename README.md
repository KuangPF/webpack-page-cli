# webpack-page-cli

![npm-version](https://img.shields.io/npm/v/webpack-page-cli.svg?style=flat) ![download](https://img.shields.io/npm/dm/webpack-page-cli.svg?style=flat) ![webpack-version](https://img.shields.io/badge/webpack-v4.33.0-brightgreen.svg) 

English | [简体中文](./README-zh_CN.md)

## Install

``` bash 
npm install webpack-page-cli -g 
# OR
yarn global add webpack-page-cli
```

## Usage

``` bash 
webpack-page create <app-name>
```

## Features

:white_check_mark: es6 ➡️ es5

:white_check_mark: Css preprocessor（scss less stylus）

:white_check_mark: eslint

:white_check_mark: stylelint

:white_check_mark: multi pages support

:white_check_mark: HRM

## Related screenshots

<img width=600 src='https://user-images.githubusercontent.com/20694238/58763330-d0b54600-858b-11e9-8234-53a3dd264db4.png'>

## Directory Structure
    webpack-page-cli
    |
    ├─build                     // webpack config folder
    |   ├─build.js              // webpack build entry
    |   ├─utils.js              // some utils about webpack config
    |   ├─webpack.base.conf.js  // webpack.base.conf
    |   ├─webpack.dev.conf.js   // webpack.dev.conf
    |   ├─webpack.prod.conf.js  // webpack.prod.conf.js
    |   └─webpack.svg           // webpack icon
    |
    |─config                    // some configuration about development and production
    |   ├─dev.env.js                
    |   ├─index.js             
    |   └─prod.env.js           
    |  
    ├─dist                      // Packaged file
    |   └─static
    |   |    ├─css             
    |   |    ├─img              
    |   |    └─js               
    |   └─index.html           
    |         
    ├─node_modules              // node_modules
    ├─src
    |   ├─css                   // Page css folder
    |   ├─img                   // Page img folder
    |   |─font                  // Page font folder
    |   |─js                    // Page js folder
    |   └─index.html            // html files
    |
    |─static                    // Static resources, which are packaged directly into the /dist/static directory
    |   └─.gitkeep
    ├─.balelrc                  // babel config
    ├─.eslintrc.js              // eslint config
    ├─.stylelintrc.json         // stylelint config   
    ├─.gitignore                // .gitignore
    ├─favicon.icon              // icon
    ├─package.json              // package.json
    ├─postcss.config.js         // postcss config
    └─README.md


## Multi Pages Support

webpack-page-cli supports multi-page configuration, and the configuration for multiple pages is as follows
- Create a new `pageA.html` in the src root directory and create a new `pageA.js` in the src/js/ directory (the page name and the js name must be the same, because the corresponding `html` template will be generated according to the name of the `js` file when packaging)
- Add the entry in the `webpack.base.conf.js` entry file `entry`, `{pageA: './src/js/pageA.js'}`
- If there are more pages, and so on
