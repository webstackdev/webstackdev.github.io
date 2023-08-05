import eslint from 'gulp-eslint-new'
import gulp from 'gulp'
import htmlmin from 'gulp-htmlmin'
import htmllint from 'gulp-htmllint'
import fancyLog from 'fancy-log'
import colors from 'ansi-colors'

const htmlMinifierOptions = {
  collapseWhitespace: true,
}

gulp.task('minify', () => {
  return gulp
    .src('.cache/*.html')
    .pipe(htmlmin(htmlMinifierOptions))
    .pipe(gulp.dest('dist'))
})

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
