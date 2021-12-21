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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const imageProcessing_1 = require("../utilities/imageProcessing");
const request = (0, supertest_1.default)(index_1.default);
describe('Test endpoint responses', () => {
    it('get api response for resized image', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=fjord&height=300&width=320');
        expect(response.status).toBe(200);
    }));
    it('should return 404 for invalid endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=invalid&width=200&height=200');
        expect(response.status).toBe(404);
    }));
});
describe("Test image processing utility", () => {
    it("get resized image", () => __awaiter(void 0, void 0, void 0, function* () {
        const image = yield (0, imageProcessing_1.getResizedImage)('fjord', '200', '200');
        expect(image).toBeTruthy();
    }));
});
