<%_ if(features.indexOf('css-preprocessor') > -1) { _%>
<%_ const cssSuffixName = {less: 'less',sass: 'scss', stylus: 'styl'} _%>
import '../css/reset.<%= cssSuffixName[cssPreprocessor] %>'
import '../css/about.<%= cssSuffixName[cssPreprocessor] %>'
<%_ } else { _%>
import '../css/reset.css'
import '../css/about.css'
<%_ } _%>