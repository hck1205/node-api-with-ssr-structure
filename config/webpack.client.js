const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const LoadablePlugin = require("@loadable/webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const createStyledComponentsTransformer = require("typescript-plugin-styled-components")
  .default;

const devMode = process.env.NODE_ENV !== "production";
const styledComponentsTransformer = createStyledComponentsTransformer();
const hotMiddlewareScript = `webpack-hot-middleware/client?name=web&path=/__webpack_hmr&timeout=20000&reload=true`;

const getEntryPoint = (target) => {
  if (target === "node") {
    return ["./src/client/App.tsx"];
  }
  return devMode
    ? [hotMiddlewareScript, "./src/client/index.tsx"]
    : ["./src/client/index.tsx"];
};

const getConfig = (target) => ({
  mode: devMode ? "development" : "production",

  name: target,

  target,

  entry: getEntryPoint(target),

  output: {
    path: path.resolve(__dirname, `../dist/${target}`),
    filename: "[name].js",
    publicPath: "/web/",
    libraryTarget: target === "node" ? "commonjs2" : undefined,
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          "babel-loader",
          {
            loader: "ts-loader",
            options: {
              getCustomTransformers: () => ({
                before: [styledComponentsTransformer],
              }),
            },
          },
        ],
      },
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },

  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      pages: path.resolve("src/client/pages/"),
      components: path.resolve("src/client/components/"),
      actions: path.resolve("src/client/store/actions/"),
      reducers: path.resolve("src/client/store/reducers/"),
      utils: path.resolve("src/client/utils/"),
      lib: path.resolve("src/client/lib/"),
      moment$: "moment/moment.js",
    },
  },

  plugins:
    target === "web"
      ? [
          new LoadablePlugin(),
          new MiniCssExtractPlugin(),
          new webpack.HotModuleReplacementPlugin(),
          // new webpack.IgnorePlugin(/\.\/locale$/),
        ]
      : [new LoadablePlugin(), new MiniCssExtractPlugin()],

  externals:
    target === "node" ? ["@loadable/component", nodeExternals()] : undefined,
});

module.exports = [getConfig("web"), getConfig("node")];
