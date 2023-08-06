const eslint = require('gulp-eslint-new')
const gulp = require('gulp')
const htmllint = require('gulp-htmllint')
const fancyLog = require('fancy-log')
const colors = require('ansi-colors')

const htmllintReporter = (filepath, issues) => {
  if (issues.length > 0) {
    issues.forEach(function (issue) {
      fancyLog(
        colors.cyan('[gulp-htmllint] ') +
        colors.white(filepath + ' [' + issue.line + ',' + issue.column + ']: ') +
        colors.red('(' + issue.code + ') ' + issue.msg)
      )
    })
    process.exitCode = 1
  }
}

gulp.task('lint:html', () => {
  return gulp
    .src('docs/*.html')
    .pipe(htmllint({}, htmllintReporter))
})

gulp.task('lint:script', () => {
  return src(['scripts/*.js'])
    .pipe(eslint({ fix: true }))
    .pipe(eslint.failAfterError())
})
