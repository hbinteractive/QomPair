var gulp = require('gulp');
var livereload = require('gulp-livereload');
var nodemon = require('gulp-nodemon');
var notify = require('gulp-notify');

gulp.task('watch', function(){
	livereload.listen();
	nodemon({
		script: 'app.js',
		ext: 'js, html'
	}).on('restart', function(){
		gulp.src('app.js')
			.pipe(livereload())
			.pipe(notify("Loading..."));
	})
});

gulp.task('default',['watch'], function(){

});
