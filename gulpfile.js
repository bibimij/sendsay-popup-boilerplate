var del = require('del');
var gulp = require('gulp');
var sass = require('gulp-sass');
var nano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var postcss = require('gulp-postcss');
var imagemin = require('gulp-imagemin');
var autoprefixer = require('autoprefixer');

var paths = {
  styles: 'src/assets/css/**/*.sass',
  scripts: 'src/assets/js/*.js',
  images: 'src/assets/images/**/*',
  php: 'src/**/*.php'
};

// Cleans dist directory
gulp.task('clean', function() {
  return del.sync(['dist']);
});

// Minify and copy SASS files
gulp.task('styles', function() {
  return gulp.src(paths.styles)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('subscribe-popup.css'))
    .pipe(postcss([ autoprefixer({browsers: ['> 1%']}) ]))
    .pipe(nano())
    .pipe(gulp.dest('dist/css'));
});

// Minify and copy all JavaScript
gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(uglify())
    .pipe(concat('subscribe-popup.min.js'))
    .pipe(gulp.dest('dist/js'));
});

// Copy all static images
gulp.task('images', function() {
  return gulp.src(paths.images)
    // Pass in options to the task
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('dist/images'));
});

// Copy all php
gulp.task('php', function() {
  return gulp.src(paths.php, {base: 'src'})
    .pipe(gulp.dest('dist'));
});

// Run building all files
gulp.task('build', ['clean', 'scripts', 'images', 'styles', 'php']);

// Rerun the task when a file changes
gulp.task('default', function() {
  gulp.watch('src/**/*', ['build']);
});
