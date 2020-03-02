// eslint-disable-next-line
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      "@babel/plugin-proposal-class-properties",
      [
        "babel-plugin-import",
        {
          "libraryName": "date-fns",
          "libraryDirectory": "",
          "camel2DashComponentName": false
        },
        "date-fns"
      ],
    ]
  };
};
