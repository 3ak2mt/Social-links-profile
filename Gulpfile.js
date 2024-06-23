import gulp from "gulp";
import { rimraf } from "rimraf";
import gulpImageMin from "gulp-imagemin";
import gulpHtmlMin from "gulp-htmlmin";

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
        .src("src/index.html")
        .pipe(gulpHtmlMin(minifOptions))
        .pipe(gulp.dest("dist/"));
};

const build = gulp.series(clean, gulp.parallel(processImages, processHtml));

export {
    clean,
    build,
    processImages as "process-images",
    processHtml as "process-html",
    build as default,
};
