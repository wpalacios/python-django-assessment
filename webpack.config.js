module.exports = {
    entry: './react/index.js',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/moviesapp/static/js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ]
    }
  };