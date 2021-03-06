const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const config = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
            watch: true,
        },
        compress: true,
        port: 8080,
        hot: true,
        open: true,
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [],
};

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        config.devtool = 'source-map';
    }

    if (argv.mode === 'production') {
        config.plugins.push(
            new CopyPlugin({
                patterns: [
                    {
                        from: 'public',
                        to: '',
                        transform(content) {
                            return content.toString().replace('/main.js', 'main.js');
                        },
                    },
                ],
            }),
        )
    }

    return config;
};
