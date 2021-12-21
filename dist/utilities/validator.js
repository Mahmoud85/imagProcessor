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
const imageProcessing_1 = require("../utilities/imageProcessing");
const lodash_1 = __importDefault(require("lodash"));
const validator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let errorMsg = "Error occured processing your image:";
    const fileName = (req.query.filename);
    const height = (req.query.height);
    const width = (req.query.width);
    if (!req.query.filename) {
        errorMsg += "'Image file name is missing'";
        res.status(404);
        return res.send(errorMsg);
    }
    else {
        const imageChek = yield (0, imageProcessing_1.isImageExists)(fileName, height, width);
        if (!imageChek.exists) {
            res.status(404);
            return res.send('Oops! image could not be found');
        }
    }
    if (!height || !width || lodash_1.default.isNaN(Number(width)) || lodash_1.default.isNaN(Number(height))) {
        errorMsg += "'image height/width is missing or invalid'";
        res.status(404);
        return res.send(errorMsg);
    }
    next();
});
exports.default = validator;
