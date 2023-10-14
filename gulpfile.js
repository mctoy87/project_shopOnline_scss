// импортируем gulp из папки node_modules
import gulp from 'gulp';
import browserSync from 'browser-sync';
import sassPkg from 'sass';
import gulpSass from 'gulp-sass';
import gulpCssimport from 'gulp-cssimport';
import {deleteAsync} from 'del'; 

const prepros = true;
const sass = gulpSass(sassPkg);

// задачи


export const html = () => gulp
  .src('src/*.html')
  .pipe(gulp.dest('dist'))
  .pipe(browserSync.stream()); //событие - перезагрузка страницы на слушателя в server


export const style = () => {
  if(prepros) {
    return gulp
      .src('src/scss/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/css'))
      .pipe(browserSync.stream());
  }

  return gulp
    .src('src/css/index.css')
    .pipe(gulpCssimport({
      extensions: ["css"], // process only css
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}

export const js = () => gulp
  .src('src/script/**/*.js')
  .pipe(gulp.dest('dist/script'))
  .pipe(browserSync.stream());

export const copy = () => gulp
  .src([
    'src/fonts/**/*',
    'src/images/**/*'
  ], {
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
  gulp.watch('./src/script/**/*.js', js);
  gulp.watch(['./src/images/**/*', 'src/fonts/**/*'], copy);
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
export const base = gulp.parallel(html, style, js, copy);

  // сборка build
export const build = gulp.series(clear, base);
// сборка dev
export default gulp.series(base, server);