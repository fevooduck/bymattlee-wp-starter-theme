/* ***** ----------------------------------------------- ***** **
/* ***** Gulp - Scripts
/* ***** ----------------------------------------------- ***** */

import addSrc from 'gulp-add-src';
import babel from 'rollup-plugin-babel';
import browserSync from 'browser-sync';
import concat from 'gulp-concat';
import commonjs from 'rollup-plugin-commonjs';
import config from '../config';
import eslint from 'gulp-eslint';
import gif from 'gulp-if';
import gulp from 'gulp';
import gutil from 'gulp-util';
import header from 'gulp-header';
import json from 'rollup-plugin-json';
import modernizr from 'gulp-modernizr';
import nodeResolve from 'rollup-plugin-node-resolve';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import rollup from 'gulp-better-rollup';
import size from 'gulp-size';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';

// Environment variables
const isProduction = !!gutil.env.production;
const isStaging = !!gutil.env.staging;
const isDevelopment = !isProduction && !isStaging;

// Create a custom Modernizr build by crawling the .scss and .js files
function scriptsModernizr() {
  return gulp.src(config.scripts.modernizr.src)
    .pipe(plumber())
    .pipe(modernizr(config.scripts.modernizr.options))
    .pipe(concat('modernizr.js'))
    .pipe(gulp.dest(config.scripts.modernizrDest));
}

// Lint files with ESLint
function scriptsLint() {
  return gulp.src(config.scripts.watchSrc)
    .pipe(eslint())
    .pipe(eslint.format());
}

/*
** -- Create sourcemaps if in development mode (use gulp --production or gulp --staging to disable soucemaps)
** -- Bundle all files
** -- Minify all files
** -- Add ByMattLee header to bundled file
** -- Print bundled file size
** -- Reload browser
*/
function scriptsMain() {
  return gulp.src(config.scripts.src)
    .pipe(plumber())
    .pipe(addSrc.prepend(config.scripts.modernizrFileSrc))
    .pipe(gif(isDevelopment, sourcemaps.init()))
      .pipe(rollup({
        plugins: [
          babel({
            exclude: 'node_modules/**'
          }),
          nodeResolve(),
          commonjs(),
          json()
        ]
      }, 'umd'))
      .pipe(uglify())
      .pipe(concat('main.js'))
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(header(config.fileHeader.join('\n')))
      .pipe(size({
        title: 'Compressed File Size:',
        showFiles: true
      }))
    .pipe(gif(isDevelopment, sourcemaps.write('./')))
    .pipe(gulp.dest(config.scripts.dest))
    .pipe(browserSync.stream());
}

const scriptsBuild = gulp.series(scriptsModernizr, scriptsLint, scriptsMain);
const scriptsWatch = gulp.series(scriptsLint, scriptsMain);

export { scriptsBuild, scriptsWatch };
