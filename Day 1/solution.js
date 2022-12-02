const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf8');

const sections = data.split(/\n\n/);

const sums = sections.map(section => {
    return section
        .split(/\n/)
        .reduce((sum, num) => sum + Number(num), 0);
});

sums.sort((a, b) => a - b);
console.log('Answer 1', sums[sums.length - 1]);

const top3 = sums.slice(-3);

console.log('Answer 2', top3.reduce((sum, num) => sum + Number(num), 0));