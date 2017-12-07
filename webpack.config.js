module.exports = {
    entry: './src/game',
    resolve: {
        extensions: [".ts", ".js"]
    },
    output: {
        path: __dirname + "/dist",
        filename: "flappy.js"
    },
    module: {
        loaders: [{
            test: /\.ts$/,
            loader: "ts-loader"
        }]
    }
};