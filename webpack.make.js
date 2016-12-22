const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const pkg = require('./package.json');
const debug = require('debug')(`${pkg.name}:webpack.config:`);
const debugVerbose = require('debug')(`${pkg.name}:webpack.config:verbose:`);

const prettyPrintJson = JsObject => JSON.stringify(JsObject, null, 2);

function makePreLoaderConfig() {
  const preLoaderConfig = [];

  debugVerbose('Pre-loader config:', prettyPrintJson(preLoaderConfig));
  return preLoaderConfig;
}

function makeLoaderConfig(options) {
  const loaderConfig = [{
    // ES6 -> ES5 through Babel
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel',
    query: {
      presets: ['es2015'],
      plugins: ['transform-runtime', 'ng-inject'],
    },
  }, {
    // Favicon - must be saved at site root to work
    test: /favicon\.ico$/,
    loader: 'file?name=[name].[ext]',
  }, {
    // Images
    test: /\.(png|jpg|gif|svg|woff|woff2|ttf|eot|pdf)/,
    loader: 'file',
  }, {
    // HTML (inject directly into js that require()s)
    test: /\.html$/,
    loader: 'raw',
  }, {
    // JSON files
    test: /\.json$/,
    loader: 'json',
  }, {
    // SASS stylesheets
    test: /\.scss$/,
    loader: (options.extractCss) ? ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!resolve-url!sass')
      : 'style!css!postcss!resolve-url!sass',
  }];

  debugVerbose('Loader config:', prettyPrintJson(loaderConfig));
  return loaderConfig;
}

function makePluginConfig(options) {
  const pluginConfig = [
    // Inject script tags into HTML automatically
    new HtmlWebpackPlugin({
      template: options.baseHtml,
      showErrors: true,
      inject: 'body',
    }),
    // Group shared/universal modules into a single file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js',
    }),
  ];

  // Extract CSS to external file rather than serving as part of the HTML
  if (options.extractCss) {
    pluginConfig.push(new ExtractTextPlugin('[name].[hash].css'));
  }

  // Only optimize if we ask for it - increases build time
  if (options.optimize) {
    pluginConfig.push(
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
    );
  }

  debugVerbose('Plugin config:', prettyPrintJson(pluginConfig));
  return pluginConfig;
}

function makeDevServerConfig(options) {
  let devServerConfig = {};
  if (options.devserver) {
    devServerConfig = {
      contentBase: `${__dirname}/devserver-tmp`,
      stats: {
        modules: false,
        cached: false,
        colors: true,
        chunk: false,
      },
    };
  }

  debugVerbose('Dev-server config:', prettyPrintJson(devServerConfig));
}

module.exports = function makeWebpackConfig(unsafeOptions) {
  // Default config is production
  const options = Object.assign({
    entrypoint: './src/app.js',
    baseHtml: './src/index.html',
    outputPath: './dist',
    sourcemap: false,
    extractCss: true,
    optimize: true,
    devserver: false,
  }, unsafeOptions);

  debug('Creating Webpack Config using options', prettyPrintJson(options));
  debugVerbose('Options passed in:', prettyPrintJson(unsafeOptions));

  const config = {
    entry: {
      app: options.entrypoint,
    },
    output: options.outputPath,
    vendor: ['angular', 'oclazyload', 'angular-ui-router'],

    // Randomize JS filenames for cachebusting
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',

    // Generate a sourcemap if desired (development only)
    devtool: (options.sourcemap) ? 'inline-source-map' : 'eval',

    module: {
      preLoaders: makePreLoaderConfig(options),
      loaders: makeLoaderConfig(options),
    },

    postcss: [
      autoprefixer({ browsers: ['last 2 versions'] }),
    ],

    plugins: makePluginConfig(options),

    resolve: {},

    devServer: makeDevServerConfig(options),
  };

  debug('Created Webpack config', prettyPrintJson(config));

  return config;
};
