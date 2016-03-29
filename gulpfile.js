var gulp = require('gulp');
var order = require('gulp-order');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('script',function(){
  gulp.src('task_2_36/js/*.js')
    .pipe(order([
      "point.js",
      "a.search.js",
      "analysis.js",
      "map.js",
      "wall.js",
      "hero.js",
      "editor.js",
      "app.js"
    ]))
    .pipe(concat("app.js"))
    .pipe(uglify())
    .pipe(gulp.dest("task_2_36/dist/"));
});