const path = require("path");

const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");

const OUTPUT_PATH = "./dist";

let plugins = [new FixStyleOnlyEntriesPlugin()];

module.exports = {
  context: __dirname,
  target: "web",
  mode: "development",
  entry: {
    index: "./src/scripts/index.js",
    main: "./src/styles/main.scss",
  },
  output: {
    filename: "scripts/[name].min.js",
    path: path.resolve(__dirname, OUTPUT_PATH),
  },
  performance: {
    hints: false,
  },
  devtool: "source-map",
  plugins: plugins,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                corejs: {
                  version: "3.6",
                  proposals: true,
                },
                targets: {
                  browsers: ["> 0.2%", "last 2 versions", "not dead"],
                },
                useBuiltIns: "usage",
              },
            ],
          ],
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].css",
              context: "./",
              outputPath: "/styles",
            },
          },
          {
            loader: "extract-loader",
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                precision: 8,
              },
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
};
