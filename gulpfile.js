// default modules
const fs = require('fs');
// for gulp plugins
const gulp = require('gulp'),
    watch = require('gulp-watch'),
    minify = require('gulp-minify')
    dirSync = require('gulp-directory-sync'),
    rollup = require('rollup-stream'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    sourcemaps = require('gulp-sourcemaps'),
    cl = require('node-cl-log'),
    babel = require('rollup-plugin-babel'),
    commonJs = require('rollup-plugin-commonjs'),
    resolveNodeModules = require('rollup-plugin-node-resolve'),
    rollupJS = (inputFile, options) => {
      return () => {
        return rollup({
          input: options.basePath + inputFile,
          format: options.format,
          sourcemap: options.sourcemap,
          plugins: [
            babel(babelConfig),
            resolveNodeModules(),
            commonJs()
          ]
        })
      .pipe(source(inputFile, options.basePath))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(options.distPath));
  };
};
// plugins for tests
const mocha = require('gulp-mocha');
// jasmine test
const Jasmine = require('jasmine'),
      jasmine = new Jasmine(),
      jasmineConfig = require('./configs/jasmine/jasmine.json');
// jasmine reporter
const JasmineConsoleReporter = require('jasmine-console-reporter'),
      jasmineReporterConfig = require('./configs/jasmine/jasmineReporter.json'),
      reporter = new JasmineConsoleReporter(jasmineReporterConfig);
// plugins for validations
const eslint = require('gulp-eslint');
// plugins for documentation
const jsdoc = require('gulp-jsdoc3');

// configs
const path = require('./configs/path.json');
const jsDocconfig = require(path.configs.jsDoc);
const babelConfig = require(path.configs.babel);
const minifyConfig = require(path.configs.minify);

gulp.task('js', rollupJS('index.js', {
  basePath: path.src.js,
  format: 'cjs',
  distPath: path.build.js + path.build.endFileJs,
  sourcemap: true
}));

gulp.task('watch', function () {
    gulp.watch(path.watch.js, ['js', 'validation:js']);
});

gulp.task('minification:js', function() {
  gulp.src(path.build.js + path.src.startFileJs)
    .pipe(minify(minifyConfig))
    .pipe(gulp.dest('./'))
});

gulp.task('validation:js', () => {
  return gulp.src([path.src.startFileJs,'!node_modules/**'])
    .pipe(eslint({
      fix: true       // редактирует ошибки если может
    }))
    .pipe(eslint.format())
    gulp.dest(jsFixedLinterOutput)
    .pipe(eslint.results(results => {
        console.log(`Total Results: ${results.length}`);
        console.log(`Total Warnings: ${results.warningCount}`);
        console.log(`Total Errors: ${results.errorCount}`);
    }))
  cl.cya('End validation');
});

/*
	В случае если данные не входят в js код, но необходимы для работы синхронизируеться директория data
	в директорию с публикуемым кодом.

*/
// gulp.task('dataSync', function () {
// 	return gulp.src('')
// 		.pipe(dirSync(path.src.data, path.build.data, {printSummary: true}))
// });

/*
    В моем проекте стоит стандарт airbnb,под свои проект можно сконфигурировать файл заново
    командой:
    ./node_modules/.bin/eslint --init

*/
/*
             Main tasks

*/
gulp.task('test:mocha', () =>
    gulp.src(path.tests.mocha) //
        .pipe(mocha())
);

gulp.task('test:jasmine', () => {
  jasmine.loadConfig(jasmineConfig);
  jasmine.jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
  jasmine.env.clearReporters();
  jasmine.addReporter(reporter);
  jasmine.execute();
});

gulp.task('documentation:bundler', function (cb) {
    cl.cya('End generation documentation with the help mark-down bundler');
});


gulp.task('documentation:jsDoc', function (cb) {
    gulp.src([path.docs.jsDoc, `${path.build.js}index.js`], {read: false})
    .pipe(jsdoc(jsDocconfig, cb));
    cl.cya('End generation documentation with the help jsDoc ');
});

gulp.task('default', ['minification:js', 'validation:js' ] );



// test:unit - юнит тесты
// test:e2e - 2e2 тесты

// "gulp documentation" - запуск генерации всех типов документации
// documentation:bundleReadme - сборка реадме по сусекам ?? Или на прямую использовать апи моего модуля

// documentation:license - генерация лицензии ?? Или на прямую использовать апи моего модуля
//     // "test": "gulp test",


