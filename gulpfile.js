var del = require('del');
var gulp = require('gulp');
var sass = require('gulp-sass');
var nano = require('gulp-cssnano');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var postcss = require('gulp-postcss');
var imagemin = require('gulp-imagemin');
var autoprefixer = require('autoprefixer');

var paths = {
  styles: 'src/assets/css/**/*.sass',
  scripts: 'src/assets/js/*.js',
  images: 'src/assets/images/**/*',
  php: 'src/**/*.php',
  fonts: 'src/assets/fonts/**/*'
};

// Clean dist directory
gulp.task('clean', function() {
  return del.sync(['dist']);
});

// Minify and copy SASS files
gulp.task('styles', function() {
  return gulp.src(paths.styles)
    .pipe(sass({outputStyle: 'expanded', sourceComments: true}).on('error', sass.logError))
    .pipe(concat('subscribe-popup.css'))
    .pipe(postcss([ autoprefixer({browsers: ['> 1%']}) ]))
    .pipe(gulp.dest('dist/css'))
    .pipe(nano())
    .pipe(rename('subscribe-popup.min.css'))
    .pipe(gulp.dest('dist/css'));
});

// Minify and copy all JavaScript
gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(concat('subscribe-popup.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(uglify())
    .pipe(rename('subscribe-popup.min.js'))
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

// Copy all fonts
gulp.task('fonts', function() {
  return gulp.src(paths.fonts, {base: 'src/assets/fonts'})
    .pipe(gulp.dest('dist/fonts'));
});

// Run building all files
gulp.task('build', ['clean', 'scripts', 'images', 'styles', 'php', 'fonts']);

// Rerun the task when a file changes
gulp.task('default', ['build'], function() {
  gulp.watch('src/**/*', ['build']);
});
