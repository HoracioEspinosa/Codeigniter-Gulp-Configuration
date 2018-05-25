var gulp = require('gulp');
var sass = require('gulp-sass');
var build = require('./build');
var imagemin = require('gulp-imagemin');
var imageminPngquant = require('imagemin-pngquant');
var imageminZopfli = require('imagemin-zopfli');
var imageminMozjpeg = require('imagemin-mozjpeg');
var imageminGiflossy = require('imagemin-giflossy');

gulp.task('watch', function () {
    gulp.watch([build.config.path.src + '/sass/**/*.scss', build.config.path.src + '/js/**/*.js'], ['build-bundle']);
});

gulp.task('watch:scss', function () {
    gulp.watch(build.config.path.src + '/sass/**/*.scss', ['build-bundle']);
});

gulp.task('watch:js', function () {
    gulp.watch(build.config.path.src + '/js/**/*.js', ['build-bundle']);
});

gulp.task('minify-images', function() {
    build.config.output = "./assets";
    
    return gulp.src(build.config.path.src + "/img/**/*.{jpg,png,svg,gif}")
    .pipe(imagemin([
        //png
        imageminPngquant({ speed: 1, quality: 98 }),
        imageminZopfli({ more: true }),
        //gif
        imageminGiflossy({ optimizationLevel: 3, optimize: 3, lossy: 2 }),
        //svg
        imagemin.svgo({ plugins: [{ removeViewBox: false }] }),
        //jpg lossless
        imagemin.jpegtran({ progressive: true }),
        //jpg very light lossy, use vs jpegtran
        imageminMozjpeg({ quality: 90 })
    ]))
    .pipe(gulp.dest(build.config.output + "/img/"));
});