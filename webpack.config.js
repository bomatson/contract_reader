module.exports = {
  entry: './client.jsx',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" },
      { test: /\.json$/, loader: 'json-loader' },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
