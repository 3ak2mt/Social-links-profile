import gulp from "gulp";
import { rimraf } from "rimraf";
import gulpImageMin from "gulp-imagemin";

const clean = async () => {
    return rimraf("dist/");
};

const processImages = async () => {
    return gulp
        .src("src/assets/images/**/*.{jpg,png}", { removeBOM: false })
        .pipe(gulpImageMin())
        .pipe(gulp.dest("dist/assets/images/"));
};

const build = async () => {
    return console.log("test");
};

export { clean, processImages as "process-images", build as default };
