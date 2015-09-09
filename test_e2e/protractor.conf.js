// conf.js
exports.config = {
	allScriptsTimeout: 11000,

  framework: 'jasmine2',
  //seleniumAddress: 'http://localhost:8080',
  specs: ['spec.js'],
  capabilities: {
    browserName: 'chrome'
  },
  baseUrl: 'http://localhost:8080',
  // multiCapabilities: [{
  //   browserName: 'firefox'
  // }, {
  //   browserName: 'chrome'
  // }]
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  },
  //gulp-protractor 配置
  seleniumServerJar: '../node_modules/protractor/selenium/selenium-server-standalone-2.45.0.jar',
  chromeDriver: '../node_modules/protractor/selenium/chromedriver'
}