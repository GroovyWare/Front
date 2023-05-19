const { override, addWebpackModuleRule, addWebpackResolve } = require('customize-cra');

module.exports = override(
  addWebpackModuleRule({
    test: /\.mjs$/,
    include: /node_modules/,
    type: 'javascript/auto',
  }),
  addWebpackResolve({
    fallback: {
      "path": require.resolve("path-browserify"),
      "util": require.resolve("util/"),
      "buffer": require.resolve("buffer/"),
      "stream": require.resolve("stream-browserify/")
    },
  })
);