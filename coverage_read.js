const fs = require('fs');
const readline = require('readline');
const stream = require('stream');

const instream = fs.createReadStream('./1pixel_coverage.txt');
const outstream = new stream;
outstream.readable = true;
outstream.writable = true;

const rl = readline.createInterface({
    input: instream,
    output: outstream,
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

    if (lineNumber > 6) {
        let fields = line.split(',');
        let temprxValue_1 = fields[2];
        let temprxValue_2 = temprxValue_1.substring(5, temprxValue_1.length)
        //console.log('TemprxValue_2', temprxValue_2);
        let rxValue = Number(temprxValue_2);
        //console.log(typeof(rxValue));

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

        console.log('n48db',n48dB);

        //console.log(lineNumber, rxValue);
    }


})
