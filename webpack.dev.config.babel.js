import path from 'path';
// import ExtractTextPlugin from'extract-text-webpack-plugin';

module.exports = {
	entry: {
        main: path.resolve('./src/scripts/main.js')
	},
	devtool:'source-map',
    module:{
        rules:[
            {
                test: /\.scss$/,
                loaders:['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap'],
                include: [path.resolve(__dirname, 'src/styles')]
            }
        ]
    },
	output: {
		path: path.join(__dirname, 'dev'),
		publicPath: 'dev',
		filename: 'drn-[name].test.bundle.js',
		chunkFilename: '[id].test.bundle.js'
	},
    resolve: {
        extensions: [ '.js', '.jsx' ]
    },
	plugins:[
		//new ExtractTextPlugin({filename:'styles.css'})
	]
};