import gulp from "gulp";
import { rimraf } from "rimraf";
import gulpImageMin from "gulp-imagemin";
import gulpHtmlMin from "gulp-htmlmin";
import gulpCleanCss from "gulp-clean-css";
import gulpAutoprefixer from "gulp-autoprefixer";
import gulpConcat from "gulp-concat";

const paths = {
    html: {
        src: "src/index.html",
        dest: "dist/",
    },

    css: {
        src: "src/assets/css/**/*.css",
        dest: "dist/assets/css/",
    },

    images: {
        src: "src/assets/images/**/*.{jpg,png}",
        dest: "dist/assets/images/",
    },

    fonts: {
        src: "src/assets/fonts/**/*.woff2",
        dest: "dist/assets/fonts/",
    },
};

const processHtml = async () => {
    const minifyOptions = {
        removeComments: true,
        collapseWhitespace: true,
        removeOptionalTags: true,
    };

    return gulp
        .src(paths.html.src)
        .pipe(gulpHtmlMin(minifyOptions))
        .pipe(gulp.dest(paths.html.dest));
};

const processCss = async () => {
    return gulp
        .src(paths.css.src, { sourcemaps: true })
        .pipe(gulpConcat("styles.css"))
        .pipe(gulpAutoprefixer())
        .pipe(gulpCleanCss())
        .pipe(gulp.dest(paths.css.dest, { sourcemaps: "." }));
};

const processImages = async () => {
    return gulp
        .src(paths.images.src, { removeBOM: false })
        .pipe(gulpImageMin())
        .pipe(gulp.dest(paths.images.dest));
};

const processFonts = async () => {
    return gulp
        .src(paths.fonts.src, { removeBOM: false })
        .pipe(gulp.dest(paths.fonts.dest));
};

const clean = async () => {
    return rimraf("dist/");
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
