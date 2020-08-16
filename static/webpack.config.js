
const config = {
    entry:  ["babel-polyfill", __dirname + '/js/index.jsx'],
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
    module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options : {
                presets : [
                  "@babel/preset-react",
                  "@babel/preset-env"
                ],
                plugins: [
                  "@babel/plugin-syntax-dynamic-import",
                  "@babel/plugin-proposal-class-properties"
                ]
              }
            }
          }, 
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"]
          },
          {
            test: /\.(woxff|woff2|eot|ttf|otf)$/,
            use : ["url-loader"]
          }, 
          {
            test: /\.(png|svg|jpg|gif)$/,
            use : ["url-loader"]
          }
        ]
      }
};
module.exports = config;
