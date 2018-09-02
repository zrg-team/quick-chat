module.exports = function override(config, env) {
  if (env === 'production') {
    // Remove UglifyJsPlugin
    config.plugins.splice(3, 1);
  }
  return config;
};