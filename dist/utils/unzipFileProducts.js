"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const zlib_1 = __importDefault(require("zlib"));
const readline_1 = __importDefault(require("readline"));
const unzipFileProducts = async (dirnameFileProductsZip) => {
    return new Promise((resolve, reject) => {
        const dirnameFileProductsUnzip = dirnameFileProductsZip.slice(0, -3);
        const readStream = fs_1.default.createReadStream(`${dirnameFileProductsZip}`);
        const writerStreamFileUnzip = fs_1.default.createWriteStream(`${dirnameFileProductsUnzip}`);
        const unzipStream = zlib_1.default.createGunzip();
        readStream.pipe(unzipStream).pipe(writerStreamFileUnzip);
        writerStreamFileUnzip.on('finish', () => {
            fs_1.default.unlink(dirnameFileProductsZip, (err) => { if (err) {
                throw new Error(err.message);
            } });
        });
        const rl = readline_1.default.createInterface({
            input: readStream.pipe(unzipStream),
            crlfDelay: Infinity
        });
        let lineCount = 1;
        const products = [];
        rl.on('line', (line) => {
            if (lineCount < 100) {
                products.push(line);
                lineCount++;
            }
            else {
                rl.close();
                readStream.destroy();
                unzipStream.end();
                writerStreamFileUnzip.end();
            }
        });
        rl.on('close', () => {
            resolve(products);
        });
        rl.on('error', (err) => {
            reject(err);
        });
    });
};
exports.default = unzipFileProducts;
