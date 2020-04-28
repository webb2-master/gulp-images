const gulp = require("gulp");
const sass = require("gulp-sass");
const responsive = require("gulp-responsive");

const origin = "src";
const destination = "dist";

// Parse html to dist
function html(cb) {
  gulp.src(`${origin}/*.html`).pipe(gulp.dest(`${destination}/`));

  cb();
}

// Generate images responsive
function images() {
  gulp
    .src(`${origin}/assets/images/*.{png,jpg}`)
    .pipe(
      responsive(
        // Config
        {
          // JPEGS
          "*.jpg": [
            { width: 500, rename: { prefix: "500px-" } },
            { width: 1000, rename: { prefix: "1000px-" } },
            { width: 1600, rename: { prefix: "1600px-" } },
          ],

          // PNGS
          "*.png": [
            { width: 500, rename: { prefix: "500px-" } },
            { width: 1000, rename: { prefix: "1000px-" } },
            { width: 1600, rename: { prefix: "1600px-" } },
          ],

          // All images
          "*": { width: 250, height: 250, rename: { prefix: "thumbnail-" } },
        },

        // Options
        {
          quality: 60,
          progressive: true,
          compressionLevel: 6,
          withMetadata: false,
        }
      )
    )
    .pipe(gulp.dest(`${destination}/assets/images`));

  cb();
}

function sassCompile() {
  return gulp
    .src(`${origin}/sass/*.scss`)
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest(`${destination}/css`));
}

exports.default = gulp.series(html, sassCompile, images);
