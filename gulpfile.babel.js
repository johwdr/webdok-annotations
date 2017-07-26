import gulp from 'gulp';
import babel from 'gulp-babel';
import gutil from 'gulp-util';
import removeLog from 'gulp-remove-logging';
import inject from 'gulp-inject';
import prompt from 'gulp-prompt';
import webpack from 'webpack';
import webpackConfig from './webpack.config.babel';
import webpackDevConfig from './webpack.dev.config.babel';
import WebpackDevServer from 'webpack-dev-server';

gulp.task('default', ['watch'], () => {

});

gulp.task('serve', ['webpack-dev-server'], () => {

});

gulp.task('build', ['assets:dist', 'index:dist'], () => {

});

gulp.task('stage', ['build'], () => {

  const pathArray = __dirname.split('/');
  const folder = pathArray[pathArray.length -1];

  return gulp.src('dist/**/*')
  .pipe(gulp.dest('/Volumes/visuel/staging/' + folder + ''));

})

gulp.task('assets:dev', () => {
  gulp.src('src/assets/**/*')
  .pipe(gulp.dest('dev/assets'))
})

gulp.task('assets:dist', () => {
  gulp.src('src/assets/**/*')
  .pipe(gulp.dest('dist/assets'))

})

gulp.task('watch:assets:dev', () => {
    return gulp.watch(['src/assets/**'], ['assets:dev']);
});

gulp.task('deploy', ['build'], () => {

  const pathArray = __dirname.split('/');
  const folder = pathArray[pathArray.length -1];
  const path = '/Volumes/2017/';
  const msg = 'Vil du deploye "' + folder + '" til produktion i mappen ' + path + '?'

  return gulp.src('dist/**/*')
  .pipe(prompt.confirm({
        message: msg,
        default: true
  }))
  .pipe(gulp.dest(path + folder + ''));

})


gulp.task('index:dev', ['webpack:dev'], function () {
  var target = gulp.src('src/index.html');
  var sources = gulp.src(['**/*.js'], {read: false, cwd: __dirname + '/dev'});
  return target.pipe(inject(sources, {addRootSlash:false}))
    .pipe(gulp.dest('dev'));
});


gulp.task('babel:dev', () => {
    gulp.src('src/**/*.scss')
        .pipe(gulp.dest('temp'));

    return gulp.src('src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('temp'));
});

gulp.task('webpack:dev', ['babel:dev'], (callback) =>{
    const myConfig = Object.create(webpackDevConfig);

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
  return target.pipe(inject(sources, {addRootSlash:false}))
    .pipe(gulp.dest('dist'));
});

gulp.task('babel:dist', () => {
    gulp.src('src/**/*.scss')
        .pipe(gulp.dest('temp'));

    return gulp.src('src/**/*.js')
        .pipe(babel())
        .pipe(removeLog())
        .pipe(gulp.dest('temp'));
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

    const myConfig = Object.create(webpackDevConfig);

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
    gulp.start('webpack-dev-server');
    gulp.watch(['src/assets/**'], ['assets:dev']);
    return gulp.watch(['src/**'], ['webpack-dev-server']);
});