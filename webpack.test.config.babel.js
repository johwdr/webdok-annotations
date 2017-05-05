import path from 'path';
// import ExtractTextPlugin from'extract-text-webpack-plugin';

module.exports = {
	entry: {
        dilemmaslider: path.resolve('./temp/test/main.js')
	},
	devtool:'source-map',
    module:{
        rules:[
            {
                test:/\.scss$/,
                loaders:['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap']
            }
        ]
    },
	output: {
		path: path.join(__dirname, 'dev'),
		publicPath: '../dev/',
		filename: 'dr-[name].test.bundle.js',
		chunkFilename: '[id].test.bundle.js'
	},
    resolve: {
        extensions: [ '.js', '.jsx' ]
    },
	plugins:[
		// new ExtractTextPlugin({filename:'styles.css'})
	]
};