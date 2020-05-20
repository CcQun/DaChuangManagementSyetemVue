module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:10000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}