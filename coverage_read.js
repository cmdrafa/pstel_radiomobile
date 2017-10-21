const fs = require('fs');
const readline = require('readline');
const stream = require('stream');

const instream = fs.createReadStream(process.argv[2]);
const resultpath = fs.openSync(process.argv[3]);
resultpath.isTTY = true;

const rl = readline.createInterface({
    input: instream,
    output: resultpath,
    terminal: false
});

let lineNumber = 0;
let n0dB = 0;
let n8dB = 0;
let n14dB = 0;
let n20dB = 0;
let n28dB = 0;
let n34dB = 0;
let n40dB = 0;
let n48dB = 0;

rl.on('line', (line) => {
    lineNumber++;

    if (lineNumber > 8) {
        let fields = line.split(',');
        let temprxValue_1 = fields[2];
        if (temprxValue_1) {
            let temprxValue_2 = temprxValue_1.substring(5, temprxValue_1.length)
            let rxValue = Number(temprxValue_2);

            if (rxValue < 0) {
                n0dB++;
            }
            if (rxValue < 8) {
                n8dB++;
            }
            if (rxValue < 14) {
                n14dB++;
            }
            if (rxValue < 20) {
                n20dB++;
            }
            if (rxValue < 28) {
                n28dB++;
            }
            if (rxValue < 34) {
                n34dB++;
            }
            if (rxValue < 40) {
                n40dB++;
            }
            if (rxValue < 48) {
                n48dB++;
            }
            //console.log('n48db', n48dB);
        }
    }
}).on('close', () => {
    let result = `Entrys:${lineNumber}\r\n00db:${n0dB}\r\n08db:${n8dB}\r\n14db:${n14dB}\r\n20db:${n20dB}\r\n28db:${n28dB}\r\n34db:${n34dB}\r\n40db:${n40dB}\r\n48db:${n48dB}`;
    fs.write(resultpath, result, () => {
        fs.close(resultpath, () => {
            console.log(`Result written to ${process.argv[3]}`);
        });
    });
});
