const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8');
const rows = input.trim().split('\n');

const sampleInput = `
2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
`;

const pairs = sampleInput.trim().split('\n');

let count = 0;

rows.forEach((pair) => {
  const elfOne = pair.split(',')[0];
  const elfTwo = pair.split(',')[1];
  const elfOneStart = +elfOne.split('-')[0];
  const elfOneEnd = +elfOne.split('-')[1];
  const elfTwoStart = +elfTwo.split('-')[0];
  const elfTwoEnd = +elfTwo.split('-')[1];

  console.log(elfOneStart, elfOneEnd);
  console.log(elfTwoStart, elfTwoEnd);

  if (elfOneStart >= elfTwoStart && elfOneEnd <= elfTwoEnd) {
    count++;
    return;
  }
  if (elfTwoStart >= elfOneStart && elfTwoEnd <= elfOneEnd) {
    count++;
  }
});

console.log(count);

let count2 = 0;

rows.forEach((pair) => {
  const elfOne = pair.split(',')[0];
  const elfTwo = pair.split(',')[1];
  const elfOneStart = +elfOne.split('-')[0];
  const elfOneEnd = +elfOne.split('-')[1];
  const elfTwoStart = +elfTwo.split('-')[0];
  const elfTwoEnd = +elfTwo.split('-')[1];
  if (elfOneStart <= elfTwoStart && elfOneEnd >= elfTwoStart) {
    count2++;
    return;
  }
  if (elfTwoStart <= elfOneStart && elfTwoEnd >= elfOneStart) {
    count2++;
    return;
  }
});

console.log(count2);