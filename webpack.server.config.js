const path = require('path');

module.exports = {
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.js'],
        modules: ['./node_modules']
    },
    target: 'node',
    resolveLoader: {
        modules: ['./node_modules']
    },
    entry: {
        api: './server/app.ts'
    },
    output: {
        path: path.join(process.cwd(), 'server/dist'),
        // publicPath: './dist',
        filename: '[name].server.bundle.js',
        chunkFilename: '[id].server.chunk.js'
    },
    module: {
        exprContextCritical: false,
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    configFile: 'tsconfig.server.json'
                }
            }
        ]
    }
};
