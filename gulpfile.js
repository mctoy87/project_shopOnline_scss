// импортируем gulp из папки node_modules
import gulp from 'gulp';
import browserSync from 'browser-sync';
import sassPkg from 'sass';
import gulpSass from 'gulp-sass';
import gulpCssimport from 'gulp-cssimport';
import {deleteAsync} from 'del';
import htmlmin from 'gulp-htmlmin'; 
import cleanCSS from 'gulp-clean-css';
import gulpif from 'gulp-if';
import rename from 'gulp-rename';
import plumber from 'gulp-plumber';
import terser from 'gulp-terser';
import webpackStream from 'webpack-stream';
import webpack from 'webpack';
import sourcemaps from 'gulp-sourcemaps';
import gulpImg from 'gulp-image';
import gulpWebp from 'gulp-webp'
import gulpAvif from 'gulp-avif';
import { stream as critical} from 'critical';

const prepros = true;

let dev = false;

const sass = gulpSass(sassPkg);

const allJS = [
  'src/script/modules/timer.js',
  'src/script/modules/menu.js',
  'src/script/modules/blog.js',
  'src/script/modules/article.js',
];


// задачи


export const html = () => gulp
  .src('src/*.html')
  .pipe(htmlmin({
    removeComments: true,
    collapseWhitespace: true,
  }))
  .pipe(gulp.dest('dist'))
  .pipe(browserSync.stream()); //событие - перезагрузка страницы на слушателя в server


export const style = () => {
  if(prepros) {
    return gulp
      .src('src/scss/**/*.scss')
      .pipe(gulpif(dev, sourcemaps.init()))
      .pipe(sass().on('error', sass.logError))
      .pipe(cleanCSS({
        2: {
          specialComments: 0,
        }
      }))
      .pipe(gulpif(dev,sourcemaps.write('../maps')))
      .pipe(gulp.dest('dist/css'))
      .pipe(browserSync.stream());
  }

  return gulp
    .src('src/css/index.css')
    .pipe(gulpif(dev, sourcemaps.init()))
    .pipe(gulpCssimport({
      extensions: ["css"], // process only css
    }))
    .pipe(cleanCSS({
      2: {
        specialComments: 0,
      }
    }))
    .pipe(gulpif(dev,sourcemaps.write('../maps')))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}

// js

const webpackConf = {
  mode: dev ? 'development' : 'production',
  devtool: dev ? 'eval-source-map' : false,
  optimization: {
    minimize: false,
  },
  output: {
    filename: 'index.js',
  },
  module: {
    rules: [],
  },
};

if (!dev) {
  webpackConf.module.rules.push({
    test: /\.(js)$/,
    exclude: /(node_modules)/,
    loader: 'babel-loader',
  });
}

export const js = () => gulp
  .src([...allJS, 'src/script/**/*.js'])
  .pipe(gulpif(dev, sourcemaps.init()))
  .pipe(plumber())
  .pipe(webpackStream(webpackConf, webpack))
  .pipe(gulpif(!dev, gulp.dest('dist/script')))
  .pipe(gulpif(!dev, terser()))
  .pipe(
    rename({
      suffix: '.min',
    }),
  )
  .pipe(gulpif(dev,sourcemaps.write('../maps')))
  .pipe(gulp.dest('dist/script'))
  .pipe(browserSync.stream());

export const img = () => gulp
  .src('src/images/**/*.{jpg,jpeg,png,svg,gif}')
  .pipe(gulpif(!dev, gulpImg({
    optipng: ['-i 1', '-strip all', '-fix', '-o7', '-force'],
    pngquant: ['--speed=1', '--force', 256],
    zopflipng: ['-y', '--lossy_8bit', '--lossy_transparent'],
    jpegRecompress: ['--strip', '--quality', 'medium', '--min', 40, '--max', 80],
    mozjpeg: ['-optimize', '-progressive'],
    gifsicle: ['--optimize'],
    svgo: true,
  })))
  .pipe(gulp.dest('dist/images'))
  .pipe(browserSync.stream());

export const webp = () => gulp
  .src('src/images/**/*.{jpg,jpeg,png}')
  .pipe(gulpWebp({
    quality: 60,
  }))
  .pipe(gulp.dest('dist/images'))
  .pipe(browserSync.stream());

  export const avif = () => gulp
  .src('src/images/**/*.{jpg,jpeg,png}')
  .pipe(gulpAvif({
    quality: 50,
  }))
  .pipe(gulp.dest('dist/images'))
  .pipe(browserSync.stream());


export const critCSS = () => gulp
  .src('dist/*.html')
  .pipe(critical({
    base: 'dist',
    inline: true,
    css: ['dist/css/index.css']
  }))
  .on('error', err => {
    console.error(err.message);
  })
  .pipe(gulp.dest('dist'));

export const copy = () => gulp
  .src('src/fonts/**/*', {
    base: 'src' //отслеживание путей файлов чтобы их складывать также
  })
  .pipe(gulp.dest('dist')) //кладем его в dev
  .pipe(browserSync.stream({
    once: true //запустить только один раз
  }));


export const server = () => {
  browserSync.init({
    ui: false,
    notify: false,
    // tunnel: true, //исп-ть если нужно показать сайт кому-л.
    server: {
      baseDir: 'dist',
    }
  })
  // слушатели на изменения в любых файлах
  gulp.watch('./src/**/*.html', html);
  gulp.watch(prepros ? './src/scss/**/*.scss' : './src/css/**/*.css', style);
  gulp.watch('src/images/**/*.{jpg, jpeg, png, svg, gif}', img);
  gulp.watch('./src/script/**/*.js', js);
  gulp.watch('src/fonts/**/*', copy);
  gulp.watch('src/images/**/*.{jpg, jpeg, png}', webp);
  gulp.watch('src/images/**/*.{jpg, jpeg, png}', avif);
}
//очищает dist для dev и build
export const clear = (done) => {
  deleteAsync('dist/**/*', {
    force: true,
  });
  done();
};

  // Запуск

  // повторяющиеся базовые операции

export const develop = async() => {
  dev = true;
}

export const base = gulp.parallel(html, style, js, img, avif, webp, copy);

  // сборка build
export const build = gulp.series(clear, base, critCSS);
// сборка dev
export default gulp.series(develop, base, server);