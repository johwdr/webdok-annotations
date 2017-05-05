import gulp from 'gulp';
import babel from 'gulp-babel';
import gutil from 'gulp-util';
import removeLog from 'gulp-remove-logging';
import webpack from 'webpack';
import webpackConfig from './webpack.config.babel';
import webpackTestConfig from './webpack.test.config.babel';
import WebpackDevServer from 'webpack-dev-server';

gulp.task('default', () => {
});
gulp.task('dev', ['webpack:dev', 'webpack-dev-server'], () => {
    // to be watched in the dev process
});
gulp.task('prod', ['webpack'], ()=>{
   // Distribution script
});
gulp.task('babel:dev', () => {
    gulp.src('src/*.scss')
        .pipe(gulp.dest('temp/test'));

    return gulp.src('src/*.js')
        .pipe(babel())
        .pipe(gulp.dest('temp/test'));
});

gulp.task('webpack:dev', ['babel:dev'], (callback) =>{
    let myConfig = Object.create(webpackTestConfig);

    webpack(myConfig, (err, stats)=>{
        if(err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString({
            colors:true,
            progress:true
        }));
        callback();
    })
});

gulp.task('babel', () => {
    gulp.src('src/*.scss')
        .pipe(gulp.dest('temp/prod'));

    return gulp.src('src/*.js')
        .pipe(babel())
        .pipe(removeLog())
        .pipe(gulp.dest('temp/prod'));
});

gulp.task('webpack', ['babel'], (callback) =>{
    let myConfig = Object.create(webpackConfig);
    myConfig.plugins = [
        // new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ];

    webpack(myConfig, (err, stats)=>{
        if(err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString({
            colors:true,
            progress:true
        }));
        callback();
    })
});

gulp.task('webpack-dev-server', function(callback) {
    // modify some webpack config options
    
    var myConfig = Object.create({
        entry: "."
    }); //webpackConfig
    myConfig.devtool = 'eval';


    // Start a webpack-dev-server
    new WebpackDevServer(webpack(myConfig), {
        publicPath: '/',
        stats: {
            colors: true
        },
        contentBase: 'dev/'
    }).listen(8080, 'localhost', function(err) {
        if(err) throw new gutil.PluginError('webpack-dev-server', err);
        gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');
        //proxy.run();
    });
});

gulp.task('watch', () => {
    return gulp.watch(['src/**'], ['dev']);
});