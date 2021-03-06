/* ***** ----------------------------------------------- ***** **
/* ***** Gulp - Styles
/* ***** ----------------------------------------------- ***** */

import autoprefixer from 'gulp-autoprefixer';
import browserSync from 'browser-sync';
import cleanCSS from 'gulp-clean-css';
import concat from 'gulp-concat';
import config from '../config';
import gif from 'gulp-if';
import gulp from 'gulp';
import gutil from 'gulp-util';
import header from 'gulp-header';
import plumber from 'gulp-plumber';
import postcss from 'gulp-postcss';
import purgecss from 'gulp-purgecss';
import rename from 'gulp-rename';
import reporter from 'postcss-reporter';
import sass from 'gulp-sass';
import scss from 'postcss-scss';
import size from 'gulp-size';
import sourcemaps from 'gulp-sourcemaps';
import stylelint from 'stylelint';

// Environment variables
const isProduction = !!gutil.env.production;
const isStaging = !!gutil.env.staging;
const isDevelopment = !isProduction && !isStaging;

/*
** -- Lint scss files with Stylelint
** -- Add Bower files to the build
** -- Create sourcemaps if in development mode (use gulp --production or gulp --staging to disable soucemaps)
** -- Compile scss files
** -- Autoprefix necessary properties
** -- Minify
** -- Add ByMattLee header to bundled file
** -- Print bundled file size
** -- Inject styles into page
*/
function stylesMain() {
  return gulp.src(config.styles.mainSrc)
    .pipe(plumber())
    .pipe(
      postcss([
        stylelint(),
        reporter({
          clearMessages: true
        })
      ], {
        syntax: scss 
      })
    )
    .pipe(gif(isDevelopment, sourcemaps.init()))
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(cleanCSS({
        inline: ['all'],
        rebase: false
      }))
      .pipe(concat('main.css'))
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(header(config.fileHeader.join('\n')))
      .pipe(gif(isProduction, purgecss({
        content: config.styles.purgeContent,
        whitelistPatternsChildren: config.styles.purgeWhitelistPatterns
      })))
      .pipe(size({
        title: 'Compressed File Size:',
        showFiles: true
      }))
    .pipe(gif(isDevelopment, sourcemaps.write('./')))
    .pipe(gulp.dest(config.styles.dest))
    .pipe(browserSync.stream({
      match: '**/*.css'
    }));
}

/*
** -- Lint scss file with Stylelint
** -- Create sourcemaps if in development mode (use gulp --production or gulp --staging to disable soucemaps)
** -- Compile scss files
** -- Autoprefix necessary properties
** -- Minify
** -- Add ByMattLee header to bundled file
** -- Print bundled file size
** -- Inject styles into page
*/
function stylesEditor() {
  return gulp.src(config.styles.editorSrc)
    .pipe(plumber())
    .pipe(
      postcss([
        stylelint(),
        reporter({
          clearMessages: true
        })
      ], {
        syntax: scss 
      })
    )
    .pipe(gif(isDevelopment, sourcemaps.init()))
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(cleanCSS({
        inline: ['all'],
        rebase: false
      }))
      .pipe(concat('editorStyles.css'))
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(header(config.fileHeader.join('\n')))
      .pipe(size({
        title: 'Compressed File Size:',
        showFiles: true
      }))
    .pipe(gif(isDevelopment, sourcemaps.write('./')))
    .pipe(gulp.dest(config.styles.dest))
    .pipe(browserSync.stream({
      match: '**/*.css'
    }));

}

const styles = gulp.parallel(stylesMain, stylesEditor);

export { stylesMain, stylesEditor, styles };
