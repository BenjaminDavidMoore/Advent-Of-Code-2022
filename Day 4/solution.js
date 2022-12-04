const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf8');
// const data = fs.readFileSync('./test_input.txt', 'utf8');

const pairs = data.split(/\n/);

let totalOverlapCount = 0;
let partialOverlapCount = 0;

pairs.forEach((pair) => {
    const ranges = pair.split(',');
    const firstPairFirstNumber = Number(ranges[0].split('-')[0]);
    const firstPairSecondNumber = Number(ranges[0].split('-')[1]);
    const secondPairFirstNumber = Number(ranges[1].split('-')[0]);
    const secondPairSecondNumber = Number(ranges[1].split('-')[1]);

    if(firstPairFirstNumber <= secondPairFirstNumber && firstPairSecondNumber >= secondPairSecondNumber) totalOverlapCount++;
    else if(secondPairFirstNumber <= firstPairFirstNumber && secondPairSecondNumber >= firstPairSecondNumber) totalOverlapCount++;

    if(firstPairSecondNumber >= secondPairFirstNumber && firstPairFirstNumber <= secondPairSecondNumber) partialOverlapCount++;
});

console.log('Total Overlap Count:', totalOverlapCount);
console.log('Partial Overlap Count:', partialOverlapCount);