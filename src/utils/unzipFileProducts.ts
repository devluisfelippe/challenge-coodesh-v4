import fs from "fs";
import zlib from "zlib";
import readline from "readline";

const unzipFileProducts = async (dirnameFileProductsZip): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        const dirnameFileProductsUnzip = dirnameFileProductsZip.slice(0, -3);
        const readStream = fs.createReadStream(`${dirnameFileProductsZip}`);
        const writerStreamFileUnzip = fs.createWriteStream(`${dirnameFileProductsUnzip}`);
        const unzipStream = zlib.createGunzip();
        readStream.pipe(unzipStream).pipe(writerStreamFileUnzip);

        writerStreamFileUnzip.on('finish', () => {
            fs.unlink(dirnameFileProductsZip, (err) => { if (err) { throw new Error(err.message); } });
        });

        const rl = readline.createInterface({
            input: readStream.pipe(unzipStream),
            crlfDelay: Infinity
        });

        let lineCount = 1;
        const products = [];
        rl.on('line', (line) => {
            if (lineCount < 100) {
                products.push(line);
                lineCount++;
            } else {
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

export default unzipFileProducts;