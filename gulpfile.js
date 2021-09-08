const { src, task } = require("gulp");
const clean = require("gulp-clean");

task("clean:output", () => {
  return src("packages/**/*.{js,d.ts,js.map,d.ts.map}", {
    read: false
  }).pipe(clean());
});
