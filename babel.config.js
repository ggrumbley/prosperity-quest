module.exports = function (api) {
  api.cache(true);

  const presets = ["@babel/env"];
  const plugins = [
    "@babel/plugin-transform-spread",
    "@babel/proposal-class-properties",
    "@babel/proposal-object-rest-spread",
  ];

  return {
    presets,
    plugins,
  };
};
