"use strict";
const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const server = require('browser-sync').create();
const autoprefixer = require('autoprefixer');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const {series} = require('gulp');
const imgMin = require('gulp-imagemin');
const svgMin = require('gulp-svgmin');
const minJS  = require('gulp-uglify');


function Sass(){
    return gulp.src(['src/scss/style.scss'],{base:'scss'})
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(sourcemaps.write())
        .pipe(rename('style.css'))
        .pipe(gulp.dest('build/css'))
        .pipe(server.stream());
}


function Svg(){
    return gulp.src(['src/svg/*.svg'])
        .pipe(svgMin())
        .pipe(gulp.dest('build/svg'))
}

function Images(){
    return gulp.src(['src/img/*.{jpg,png}'])
        .pipe(imgMin())
        .pipe(gulp.dest('build/img'))
}

function JS(){
    return gulp.src(['src/js/*.js'])
        .pipe(plumber())
        .pipe(minJS())
        .pipe(gulp.dest('build/js'))
}


function Server(){
    server.init({server:"./",browser:'chrome'});
    gulp.watch('src/scss/**/*.scss',gulp.series(Sass));
    gulp.watch('index.html').on('change',server.reload);
}



exports.start = series(Sass,Svg,Images,JS,Server);