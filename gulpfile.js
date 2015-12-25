
var gulp = require('gulp');
var gulpbabel = require('gulp-babel');

function babel() {
    return gulpbabel({
        presets: ['es2015']
    });
}

gulp.task('es2015', function jsBackground_Task() {
    return gulp.src('script-execution.js').pipe(babel()).pipe(gulp.dest('build'))
})


gulp.task('default', ['es2015']);
