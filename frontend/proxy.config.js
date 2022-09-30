const proxy = [
    {
      context: [''],
      target: 'http://localhost:8080/',
      secure: false,
      logLevel: 'debug',
      //pathRewrite: {'^/api': '' },
    }
];

module.exports = proxy;