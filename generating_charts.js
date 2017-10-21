const fs = require('fs');
const readline = require('readline');
const stream = require('stream');
const plotly = require('plotly')("cmdrafa", "0wPDTRb1m3mHTul4NSBy");
const _ = require('lodash');


const instream = fs.createReadStream('./result.txt')

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
    //console.log('Total', total)
    const objPlot = _.omit(jsonData, ['Entrys']);
    console.log('ObjPlot', objPlot);
    const x = _.keys(objPlot);
    const y = _.values(objPlot);

    console.log('y', y);

    const data = [
        {
            x: x,
            y: y/100,
            type: "bar"
        }
    ];
    const graphOptions = {
        filename: "coverage-graph",
        fileopt: "overwrite"
    };
    plotly.plot(data, graphOptions, (err, msg) => {
        console.log(msg);
    })

    //console.log(x);
    //console.log(y);

    //console.log(jsonData);
});