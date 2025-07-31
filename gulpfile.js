const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const flatten = require('gulp-flatten');
const del = require('del');

// Compile SCSS
function styles() {
    return gulp.src('src/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(flatten())
        .pipe(gulp.dest('assets/'))
        .pipe(browserSync.stream());
}

// Copy JS
function scripts() {
    return gulp.src('src/**/*.js')
        .pipe(uglify())
        .pipe(flatten())
        .pipe(gulp.dest('assets/'))
        .pipe(browserSync.stream());
}

// Clean assets folder
function clean() {
    return del(['assets/**/*']);
}

// Browser Sync
function serve() {
    browserSync.init({
        proxy: "your-site.local", // Change this to your local WordPress URL
        files: [
            "**/*.php",
            "assets/**/*.css",
            "assets/**/*.js"
        ]
    });
}

// Watch files
function watchFiles() {
    gulp.watch('src/**/*.scss', styles);
    gulp.watch('src/**/*.js', scripts);
    gulp.watch('**/*.php').on('change', browserSync.reload);
}

// Tasks
gulp.task('default', gulp.series(clean, gulp.parallel(styles, scripts)));
gulp.task('watch', gulp.series(clean, gulp.parallel(styles, scripts), gulp.parallel(serve, watchFiles)));