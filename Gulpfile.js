import gulp from "gulp";
import { rimraf } from "rimraf";
import gulpImageMin from "gulp-imagemin";
import gulpHtmlMin from "gulp-htmlmin";
import gulpCleanCss from "gulp-clean-css";

const processCss = async () => {
    return gulp
        .src("src/assets/css/**/*.css", { sourcemaps: true })
        .pipe(gulpCleanCss())
        .pipe(gulp.dest("dist/assets/css/", { sourcemaps: "." }));
};

const clean = async () => {
    return rimraf("dist/");
};

const processImages = async () => {
    return gulp
        .src("src/assets/images/**/*.{jpg,png}", { removeBOM: false })
        .pipe(gulpImageMin())
        .pipe(gulp.dest("dist/assets/images/"));
};

const processHtml = async () => {
    const minifOptions = {
        removeComments: true,
        collapseWhitespace: true,
        removeOptionalTags: true,
    };

    return gulp
        .src("src/index.html", { sourcemaps: true })
        .pipe(gulpHtmlMin(minifOptions))
        .pipe(gulp.dest("dist/", { sourcemaps: "." }));
};

const processFonts = async () => {
    return gulp
        .src("src/assets/fonts/**/*.woff2", { removeBOM: false })
        .pipe(gulp.dest("dist/assets/fonts/"));
};

const build = gulp.series(
    clean,
    gulp.parallel(processCss, processFonts, processImages, processHtml)
);

export {
    clean,
    build,
    processCss as "process-css",
    processImages as "process-images",
    processFonts as "process-fonts",
    processHtml as "process-html",
    build as default,
};
