import gulp from "gulp";
import { rimraf } from "rimraf";

const clean = async () => {
    return rimraf("dist/");
};

const build = async () => {
    return console.log("test");
};

export { clean, build as default };
