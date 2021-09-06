const { src, task } = require("gulp");
const clean = require("gulp-clean");

task("clean:output", () => {
  return src(
    [`packages/**/*.js`, `packages/**/*.d.ts`, `packages/**/*.js.map`, `packages/**/*.d.ts.map`],
    {
      read: false
    }
  ).pipe(clean());
});
