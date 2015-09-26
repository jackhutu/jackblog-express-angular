// Karma configuration
var wiredep = require('wiredep')({
    exclude: [/bootstrap.js$/, /bootstrap-sass-official\/.*\.js/, /bootstrap\.css/],
    directory: 'bower_components',
    dependencies: true,
    devDependencies: true   
});

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine','angular-filesort'],
    files: wiredep.js.concat([
        'src/**/*.js',
        'src/**/*.html',
        'test_karma/**/*.spec.js'
    ]),
    //karma-angular-filesort 对文件排序
    angularFilesort: {
      whitelist: [
        'src/**/*.js'
      ]
    },
    //排除文件
    exclude: [
    ],
    preprocessors: {
        'src/**/*.js': ['coverage'],
        'src/**/*.html': ['ng-html2js']
    },
    ngHtml2JsPreprocessor: {
      stripPrefix: 'src/',
      moduleName: 'templates'
    },
    plugins : [
      'karma-phantomjs-launcher',
      'karma-angular-filesort',
      'karma-jasmine',
      'karma-ng-html2js-preprocessor',
      'karma-coverage'
    ],
    //测试结果报告,默认只有progress,其它的需要手动添加.
    reporters: ['progress','coverage'],
    // 配置覆盖率报告
    coverageReporter: {
      //type : 'html',
      type:'text-summary',
      dir : 'test_karma_coverage/'
    },
    port: 9876,
    colors: true,
    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true
  })
}
