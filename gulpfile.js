const gulp = require('gulp');
const handlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');
const concatCss = require('gulp-concat-css');

gulp.task('copy_images', function() {
    return gulp.src(['blocks/**/**/images/*', 'bundles/**/images/*'])
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest('public/images'));
});

gulp.task('copy_fonts', function() {
    return gulp.src('bundles/**/fonts/*')
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest('public/fonts'));
});

gulp.task('index_bundle_css', function () {
    return gulp.src('bundles/index/css/index.css')
        .pipe(concatCss('css/index.css', {
            includePaths: ['blocks/index'],
            rebaseUrls: false
        }))
        .pipe(gulp.dest('public/'));
});

gulp.task('index_compile', function () {
    const templateData = {};
    const options = {
        batch : ['./blocks']
    };

    return gulp.src('bundles/index/index.hbs')
        .pipe(handlebars(templateData, options))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('public'));
});

gulp.task('task_bundle_css', function () {
    return gulp.src('bundles/task/css/task.css')
        .pipe(concatCss('css/task.css', {
            includePaths: ['blocks/task', 'blocks/index/footer'],
            rebaseUrls: false
        }))
        .pipe(gulp.dest('public/'));
});
gulp.task('task_compile', function () {
    const templateData = {};
    const options = {
        batch : ['./blocks']
    };

    return gulp.src('bundles/task/task.hbs')
        .pipe(handlebars(templateData, options))
        .pipe(rename('task.html'))
        .pipe(gulp.dest('public'));
});

gulp.task('default', [
    'index_compile', 'task_compile', 'index_bundle_css', 'task_bundle_css', 'copy_images', 'copy_fonts'
]);