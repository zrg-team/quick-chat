var UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = function override(config, env) {
  // if (env === 'production') {
  //   // Remove UglifyJsPlugin
  //   config.plugins.splice(3, 1);
  //   config.plugins.push(new UglifyJsPlugin({
  //     parallel: true,
  //     sourceMap: false
  //     // uglifyOptions: {
  //     //   // compress: {
  //     //   //   warnings: false,
  //     //   //   // Disabled because of an issue with Uglify breaking seemingly valid code:
  //     //   //   // https://github.com/facebookincubator/create-react-app/issues/2376
  //     //   //   // Pending further investigation:
  //     //   //   // https://github.com/mishoo/UglifyJS2/issues/2011
  //     //   //   comparisons: false
  //     //   // },
  //     //   // mangle: {
  //     //   //   safari10: true
  //     //   // },
  //     //   // output: {
  //     //   //   comments: false,
  //     //   //   // Turned on because emoji and regex is not minified properly using default
  //     //   //   // https://github.com/facebookincubator/create-react-app/issues/2488
  //     //   //   ascii_only: true
  //     //   // },
  //     //   sourceMap: false
  //     // }
  //   }))
  // }
  config.plugins.splice(3, 1);
  config.plugins.push(new UglifyJsPlugin({
    parallel: true,
    sourceMap: false
  }))
  return config;
};