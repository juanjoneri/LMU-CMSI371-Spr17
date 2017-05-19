/* eslint indent: ["error", 2] */
module.exports = function (config) {
  config.set({
    frameworks: [
      "jasmine"
    ],

    files: [
      "vector.js",
      "matrix.js",
      "polygon.js",
      "test/**/*.js"
    ],

    preprocessors: {
      "*.js": ["coverage"]
    },

    browsers: [
      "Chrome"
    ],

    reporters: [
      "dots",
      "coverage"
    ]
  });
};
