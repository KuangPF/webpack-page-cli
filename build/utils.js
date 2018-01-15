'use strict';
const path = require('path');
const config = require('../config');
const packageConfig = require('../package.json');

exports.assetsPath = function (_path) {
    const assetsSubDirectory = process.env.NODE_ENV === 'production' ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory;

    return path.posix.join(assetsSubDirectory, _path);
};
exports.createNotifierCallback = () => {
    const notifier = require('node-notifier');

    return (severity, errors) => {
        if (severity !== 'error') return;
        const error = errors[0];
        const filename = error.file && error.file.split('!').pop();
        // Send cross platform native notifications using Node.js.
        notifier.notify({
            title: packageConfig.name,
            message: severity + ': ' + error.name,
            subtitle: filename || '',
            icon: path.join(__dirname, 'webpack.svg')
        });
    };
};
