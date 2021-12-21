"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResizedImage = exports.isImageExists = void 0;
const fs_1 = __importDefault(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
const getimagePath = (filename, height, width, cached) => {
    if (cached) {
        return `../assets/cached/${filename}-${height}-${width}.jpg`;
    }
    else {
        return `../assets/full/${filename}.jpg`;
    }
};
const isImageExists = (fileName, height, width) => __awaiter(void 0, void 0, void 0, function* () {
    const path = require('path');
    try {
        const cachedurl = getimagePath(fileName, height, width, true);
        const fullurl = getimagePath(fileName);
        const cachedImage = fs_1.default.existsSync(path.resolve(__dirname, cachedurl));
        const fullImage = fs_1.default.existsSync(path.resolve(__dirname, fullurl));
        if (cachedImage) {
            return { exists: true, cached: true };
        }
        if (fullImage) {
            return { exists: true, cached: false };
        }
        else {
            return { exists: false, cached: false };
        }
    }
    catch (e) {
        return { exists: false, cached: false };
    }
});
exports.isImageExists = isImageExists;
const createCache = (filename, height, width) => __awaiter(void 0, void 0, void 0, function* () {
    const path = require('path');
    const srcFilePath = path.resolve(__dirname, getimagePath(filename, height, width));
    const dstFilePath = path.resolve(__dirname, getimagePath(filename, height, width, true));
    yield (0, sharp_1.default)(srcFilePath)
        .resize(Number(width), Number(height))
        .toFormat('jpeg')
        .toFile(dstFilePath);
});
const getResizedImage = (filename, height, width) => __awaiter(void 0, void 0, void 0, function* () {
    const imageCheck = yield isImageExists(filename, height, width);
    const path = require('path');
    if (!imageCheck.cached) {
        yield createCache(filename, height, width);
    }
    const dstFilePath = path.resolve(__dirname, getimagePath(filename, height, width, true));
    return dstFilePath;
});
exports.getResizedImage = getResizedImage;
