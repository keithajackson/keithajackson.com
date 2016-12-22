module.exports = require('./webpack.make')({
  outputPath: './dist-development',
  sourcemap: true,
  extractCss: true,
  optimize: false,
  devserver: true,
});
