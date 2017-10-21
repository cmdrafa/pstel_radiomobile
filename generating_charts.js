const fs = require('fs');
const readline = require('readline');
const stream = require('stream');
const plotly = require('plotly')("cmdrafa", "0wPDTRb1m3mHTul4NSBy");
const _ = require('lodash');


const instream = fs.createReadStream(process.argv[2]);

const rl = readline.createInterface({
    input: instream
})

let jsonData = {};
let key;
let value;

rl.on('line', (line) => {
    let fields = line.split(':');

    key = fields[0];
    value = fields[1]
    jsonData[key] = value;

}).on('close', () => {
        const total = jsonData.Entrys;

        const objPlot = _.omit(jsonData, ['Entrys']);

        const x = _.keys(objPlot);
        const y = _.values(objPlot);
        let ytoPlot = [];

        y.forEach((element) => {
            ytoPlot.push(element / total);
        });

        console.log(ytoPlot);

        const data = [
            {
                x: x,
                y: ytoPlot,
                type: "bar"
            }
        ];
        const graphOptions = {
            filename: "coverage-graph",
            fileopt: "overwrite"
        };
        plotly.plot(data, graphOptions, (err, msg) => {
            console.log(msg);
        });
    });