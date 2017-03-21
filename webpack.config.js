const webpack = require('webpack');

module.exports = {
  output: {
    libraryTarget: 'commonjs2'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ],

  node: {
    fs: 'empty'
  }
};
