const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf8');
// const data = fs.readFileSync('./test_input.txt', 'utf8');

let stacks = data.split(/\n/);
let instructions = stacks.pop().split(',');
stacks = stacks.map(stack => stack.split(','));
console.log('stacks', stacks);
// move 1 from 2 to 1

const groomedInstructions = instructions.map(instruction => instruction
    .replace('move ', '')
    .replace(' from ', ',')
    .replace(' to ', ',')
    .split(',')
    .map(Number)
);
console.log('Instructions', groomedInstructions);

// Problem 1
// groomedInstructions.forEach(instruction => {
//     const numberOfBoxesToMove = instruction[0];
//     const fromPile = instruction[1];
//     const toPile = instruction[2];
    
//     Array.from(Array(numberOfBoxesToMove)).forEach(() => {
//         const itemToMove = stacks[fromPile - 1].shift();
//         stacks[toPile -1].unshift(itemToMove);
//     });
// });

// Problem 2
groomedInstructions.forEach(instruction => {
    const numberOfBoxesToMove = instruction[0];
    const fromPile = instruction[1];
    const toPile = instruction[2];

    const itemsToMove = stacks[fromPile - 1].splice(0, numberOfBoxesToMove);
    stacks[toPile - 1] = itemsToMove.concat(stacks[toPile - 1]);
    console.log('stacks', stacks);
});

console.log('STACKS', stacks.map(stack => stack.shift()).join(''));