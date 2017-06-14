var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry:  {
    index: path.resolve(__dirname, './pages/index')
  },
  output: {
    path: path.join(__dirname, 'pages'),
    filename: '[name].bundle.js'
  },
  watch:true,
  resolve: {
    alias: {
         "jquery": path.join(__dirname, "./libs/jquery-stub.js")
    }
  },
  module:{
    loaders:[
      {
        test: /.jsx?$/, //check for all the jsx file
        exclude: /node_modules/,
        use:{
          loader: 'babel-loader', //use babel-loader for these files
          options:{
            presets:['es2015','react','stage-0'],
            plugins: [require('babel-plugin-transform-object-rest-spread')]
          }
        },
      },
      {
        test:/\.s?css$/,
        exclude: /node_modules/,
        loader:'style-loader!css-loader!sass-loader'
      }
    ]
  },
};
