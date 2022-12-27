const fs = require('fs');
const { clone } = require('../utils/misc');
const data = fs.readFileSync('./input.txt', 'utf8');
// const data = fs.readFileSync('./test_input.txt', 'utf8');
// const data = fs.readFileSync('./test_input2.txt', 'utf8');

let x = 1;
let cycleCount = 1;
let commands = data.split(/\n/);
let values = {};
let cycleTargets = [20, 60, 100, 140, 180, 220];
commands.forEach(command => {
    const prevCycleCount = clone(cycleCount);
    
    if(cycleTargets.includes(cycleCount)) {
        values[cycleCount] = (x * cycleCount);
        console.log(`ADDING ${cycleCount} * ${x} = ${x * cycleCount}`);
    }
    
    const slightlyOffTarget = cycleTargets.some(cycleTarget => (prevCycleCount < cycleTarget && (prevCycleCount + 2) > cycleTarget)) // If the target is inbetween the previous and current cycle counts
    if(slightlyOffTarget) {
        console.log('SLIGHTLY OFF TARGET', slightlyOffTarget);
        let target = cycleTargets.filter(cycleTarget => (prevCycleCount < cycleTarget && (prevCycleCount + 2) > cycleTarget)).pop();
        values[target] = (x * target);
        console.log(`ADDING ${target} * ${x} = ${x*target}`);
    }

    if(command.includes('noop')) cycleCount++;
    else if(command.includes('addx')) {
        cycleCount += 2;
        x += Number(command.replace('addx ', ''));
    }

    console.log(`CYCLE ${cycleCount}: X = ${x}`);
});

console.log('VALUES', values);
const sum = Object.values(values).reduce((sum, value) => sum += value, 0);
console.log('SUM', sum);