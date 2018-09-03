const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const c = require('ansi-colors');
const notifier = require('node-notifier');
const browserSync = require('browser-sync').create();



function showError(err){
 
  notifier.notify({
    title: 'Halo! Bląd kompilacji CSS',
    message: err.messageFormatted
  });
  
  console.log(c.red("========================"));
  console.log(c.red(err.messageFormatted));
  console.log(c.red("========================"));
  this.emit('end');
}

gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "./"
      },
      notify: false, //czy pokazywać tooltipa
      // host: "192.168.0.24", //IPv4 Address Wirless LAN adapter WiFi from ipconfig
      // port: 3000, //port na którym otworzy
      // browser: "google chrome" //jaka przeglądarka ma być otwierana - zaleznie od systemu - https://stackoverflow.com/questions/24686585/gulp-browser-sync-open-chrome-only
  });
});

gulp.task('sass', function(){
  return gulp.src('./scss/main.scss')
  .pipe(plumber({
    errorHandler : showError
  }))
  .pipe(sourcemaps.init())
  .pipe(sass({
    outputStyle: 'compressed'
  }))
  .pipe(autoprefixer({
    browsers: ['last 2 versions']
  }))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('./css'))
  .pipe(browserSync.stream());
})

gulp.task('watch', function(){
  gulp.watch('./scss/**/*.scss', ['sass']);
  gulp.watch("*.html").on('change', browserSync.reload);
})

gulp.task('default', function(){
  console.log(c.yellow('----Rozpoczecie pracy-----'));
  gulp.start(['browser-sync', 'sass', 'watch']);  
})