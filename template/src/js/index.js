<%_ const cssSuffixName = {less: 'less',sass: 'scss', stylus: 'styl'} _%>
import '../css/reset.<%= cssSuffixName[cssPreprocessor] %>'
import '../css/index.<%= cssSuffixName[cssPreprocessor] %>'

console.log('%c webpack-page-cli https://github.com/KuangPF/webpack-page-cli', 'line-height:1;font-size:15px;color:#1C78C0;')
