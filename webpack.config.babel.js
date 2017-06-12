import path from 'path';


module.exports = {
	entry: {
        main: path.resolve('./temp/scripts/main.js')
	},
    module:{
        rules:[
            {
                test:/\.scss$/,
                loaders:['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap'],
                include: [path.resolve(__dirname, 'temp/styles')]
            }
        ]
    },
    output: {
		path: path.join(__dirname, 'dist'),
		publicPath: 'dist',
		filename: 'drn-[name].bundle.js',
		chunkFilename: '[id].bundle.js'
	},
    resolve: {
        extensions: [ '.js', '.jsx' ]
    },
};