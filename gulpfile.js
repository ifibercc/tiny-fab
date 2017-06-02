var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');

gulp.task('browser-sync', ['sass'], function() {
  var files = ['**/*.html', '**/*.css', '**/*.js', '*.html'];
  browserSync.init(files, {
    server: "./"
  });
  gulp.watch("src/scss/*.scss", ['sass']);
  gulp.watch(["*.html", "./*.js"]).on('change', reload);
});
gulp.task('sass', function() {
  return gulp.src("src/scss/*.scss").pipe(plumber({
    errorHandler: function(err) {
      console.log(err);
      this.emit('end')
    }
  })).pipe(sass()).pipe(gulp.dest("src/css")).pipe(reload({stream: true}));
});

gulp.task('default', ['browser-sync']);
