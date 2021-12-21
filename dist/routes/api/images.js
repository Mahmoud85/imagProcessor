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
const express_1 = __importDefault(require("express"));
const imageProcessing_1 = require("../../utilities/imageProcessing");
const validator_1 = __importDefault(require("../../utilities/validator"));
const images = express_1.default.Router();
images.get('/', validator_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filename, height, width } = req.query;
    const image = yield (0, imageProcessing_1.getResizedImage)(filename, height, width);
    return res.sendFile(image);
}));
exports.default = images;
