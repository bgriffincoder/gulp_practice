'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var validate = require('gulp-w3c-css');
var htmlhint = require("gulp-htmlhint");
var babel = require('gulp-babel');
var beautify = require('gulp-beautify');
var imagemin = require('gulp-imagemin');
var notify = require('gulp-notify');



gulp.task('sass', function() {
    return gulp.src('./assets/sass/**/*.scss')
      .pipe(sass())
      .pipe(gulp.dest('./assets/css/'))
      .pipe(notify({ message: 'Sass task complete' }));
  });

  gulp.task('watch', function () {
    gulp.watch('./assets/sass/**/*.scss', ['sass'])
  });

  gulp.task('validate', function() {
    return gulp.src('./assets/css/**/*.css')
      .pipe(validate())
      .pipe(gulp.dest('./assets/css'))
      .pipe(notify({ message: 'Validate task complete' }));
  });

  gulp.task('htmlhint', function() {
    return gulp.src('*.html')
      .pipe(htmlhint())
      .pipe(notify({ message: 'Sass task complete' }));
  });

  gulp.task('babel', function() {
    return gulp.src('./assets/js/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('./assets/js/dist'))
        .pipe(notify({ message: 'Babel task complete' }));
  });

gulp.task('beautify', function() {
    gulp.src('./assets/js/**/*.js')
      .pipe(beautify({indent_size: 2}))
      .pipe(gulp.dest('./assets/js/public/'))
      .pipe(notify({ message: 'Beautify task complete' }));
  });

  gulp.task('images', function() {
    return gulp.src('./assets/images/**/*')
      .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
      .pipe(gulp.dest('dist/assets/images'))
      .pipe(notify({ message: 'Images task complete' }));
  });

gulp.task('csstasks', ['sass','validate']);
gulp.task('htmltasks', ['htmlhint']);
gulp.task('jstasks', ['babel','beautify']);

gulp.task('default', ['sass', 'watch','csstasks','htmltasks','jstasks','images']);