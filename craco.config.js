const path = require('path')

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const resolve = dir => {
  return path.join(__dirname, dir)
}

module.exports = {
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: ['.ts', '.js']
  },
  webpack: {
    alias: {
      '@': resolve('./src')
    }
  },
  babel: {
    plugins: ['babel-plugin-styled-components']
  }
}