var UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = function override(config, env) {
  console.log('config', config, env)
  if (env === 'production') {
    // Remove UglifyJsPlugin
    config.plugins.splice(3, 1);
    config.plugins.push(new UglifyJsPlugin({
      parallel: true,
      uglifyOptions: {
        ie8: false,
        ecma: 6,
        warnings: true,
        mangle: true, // debug false
        output: {
          comments: false,
          beautify: false  // debug true
        }
      },
      sourceMap: false
    }))
  }
  return config;
};