/* eslint-disable @typescript-eslint/no-var-requires */
const { src, dest } = require("gulp");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");

function defaultTask() {
  return src("src/**/**.ts")
    .pipe(babel())
    .pipe(
      uglify({ sourceMap: false, toplevel: true, mangle: true, compress: true })
    )
    .pipe(dest("dist/"));
}

exports.default = defaultTask;
