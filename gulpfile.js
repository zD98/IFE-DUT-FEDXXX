var connect = require('gulp-connect');
var order = require('gulp-order');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');

gulp.task('script', function() {
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
gulp.task('gl',function(){
  gulp.src('task_2_28/js/gl/*.js')
    .pipe(order([
      "Vector.js",
      "Matrix.js",
      "geometry.js",
      "gl.js"
    ]))
    .pipe(concat("zgl.js"))
    .pipe(gulp.dest("task_2_28/dist/"));
});
gulp.task('airship',function(){
  gulp.src('task_2_28/js/airship/*.js')
    .pipe(order([
      "airship/AirShip.js",
      "airship/AirShipFactory.js",
      "airship/DynamicSystem.js",
      "airship/EnergySystem.js"
    ]))
    .pipe(concat("airship.js"))
    .pipe(gulp.dest("task_2_28/dist/"));
});
gulp.task('planet',function(){
  gulp.src('task_2_28/js/planet/*.js')
      .pipe(order([
        "planet/monitor-view.js",
        "planet/Monitor.js",
        "planet/DataCenter.js",
        "planet/Planet.js",
        "planet/director.js",
        "planet/director-view.js"
      ]))
    .pipe(concat("planet.js"))
    .pipe(gulp.dest("task_2_28/dist/"));
});
gulp.task('common',function(){
  gulp.src('task_2_28/js/*.js')
      .pipe(order([
        "BUS.js",
        "Emitter.js",
        "Receiver.js",
        "adapter.js"
      ]))
    .pipe(concat("common.js"))
    .pipe(gulp.dest("task_2_28/dist/"));
});

gulp.task('watch',function(){
    gulp.watch(['task_2_43/index.html','task_2_43/src/*.js'],['html','js-babel']);
});
gulp.task('js-babel',function(){
   
    gulp.src('task_2_43/src/*.js')
         .pipe(babel({
            presets:['es2015']
        }))
        .pipe(gulp.dest('task_2_43/dist/'))
        .pipe(connect.reload());
});
gulp.task('html',function (){
    gulp.src('task_2_43/index.html')
        .pipe(connect.reload());
})

gulp.task('connect',function(){
    connect.server({
        root:'task_2_43',
        livereload:true});
});

gulp.task('default',['connect','watch']);

