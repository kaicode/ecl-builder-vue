module.exports = {
    devServer: {
      port: 8085,
      proxy: {
        '^/snowstorm': {
          target: 'http://localhost:9080/'
        }
      }
    }
  }
