import gulp from 'gulp';
import babel from 'gulp-babel';
import gutil from 'gulp-util';
import removeLog from 'gulp-remove-logging';
import inject from 'gulp-inject';
import webpack from 'webpack';
import webpackConfig from './webpack.config.babel';
import webpackTestConfig from './webpack.test.config.babel';
import WebpackDevServer from 'webpack-dev-server';

gulp.task('default', ['webpack-dev-server'], () => {

});

gulp.task('serve', ['webpack-dev-server'], () => {

});

gulp.task('build', ['index:dist'], () => {

});


gulp.task('index:dev', ['webpack:dev'], function () {
  var target = gulp.src('src/index.html');
  var sources = gulp.src(['**/*.js'], {read: false, cwd: __dirname + '/temp'});
  return target.pipe(inject(sources))
    .pipe(gulp.dest('temp'));
});


gulp.task('babel:dev', () => {
    gulp.src('src/*.scss')
        .pipe(gulp.dest('temp'));

    return gulp.src('src/*.js')
        .pipe(babel())
        .pipe(gulp.dest('temp'));
});

gulp.task('webpack:dev', ['babel:dev'], (callback) =>{
    const myConfig = Object.create(webpackTestConfig);

    webpack(myConfig, (err, stats)=>{
        if(err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString({
            colors:true,
            progress:true
        }));

        callback();
    })
});

gulp.task('index:dist', ['webpack:dist'], function () {
  var target = gulp.src('src/index.html');
  var sources = gulp.src(['**/*.js'], {read: false, cwd: __dirname + '/dist'});
  return target.pipe(inject(sources))
    .pipe(gulp.dest('dist'));
});

gulp.task('babel:dist', () => {
    gulp.src('src/*.scss')
        .pipe(gulp.dest('dist'));

    return gulp.src('src/*.js')
        .pipe(babel())
        .pipe(removeLog())
        .pipe(gulp.dest('dist'));
});

gulp.task('webpack:dist', ['babel:dist'], (callback) =>{
    const myConfig = Object.create(webpackConfig);
    myConfig.plugins = [
        // new webpack.optimize.DedupePlugin(),
        //new webpack.optimize.UglifyJsPlugin()
    ];

    return webpack(myConfig, (err, stats)=>{
        if(err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString({
            colors:true,
            progress:true
        }));
        callback();
    })
});

gulp.task('webpack-dev-server', ['index:dev'], function(callback) {

    const myConfig = Object.create(webpackTestConfig);

    // Start a webpack-dev-server
    new WebpackDevServer(webpack(myConfig), {
        publicPath: '/',
        stats: {
            colors: true
        },
        contentBase: 'temp/'
    }).listen(8080, 'localhost', function(err) {
        if(err) throw new gutil.PluginError('webpack-dev-server', err);
        gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');
        //proxy.run();
    });
});

gulp.task('watch', () => {
    return gulp.watch(['src/**'], ['webpack-dev-server']);
});