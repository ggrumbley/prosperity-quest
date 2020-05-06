module.exports = function (api) {
  api.cache(true);

  const presets = ["@babel/env", "@babel/typescript"];
  const plugins = [
    "@babel/plugin-transform-spread",
    "@babel/proposal-class-properties",
    "@babel/proposal-object-rest-spread",
    "const-enum",
  ];

  return {
    presets,
    plugins,
  };
};
