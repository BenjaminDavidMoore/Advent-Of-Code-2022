const fs = require('fs');
const { clone } = require('../utils/misc');
const data = fs.readFileSync('./input.txt', 'utf8');
// const data = fs.readFileSync('./test_input.txt', 'utf8');

const parseInput = () => {
    let monkeys = data.split(/\n\n/);
    
    monkeys = monkeys.map(monkey => {
        let sanitizedMonkey = {
            name: '',
            itemsInspected: 0,
            items: [],
            inspect: () => {},
            testIfDivisibleBy: 1,
            monkeyIfTrue: '',
            monkeyIfFalse: '',
        }

        let lines = monkey.split(/\n/);
        lines.forEach(line => {
            // Set the name
            if(line.includes('Monkey ')) sanitizedMonkey.name = line.replace('Monkey ', '').replace(':', '');
            
            // Set the starting items
            if(line.includes('Starting items:')) sanitizedMonkey.items = line.replace('Starting items:', '').split(',').map(i => Number(i));
            
            // Set the inspection function
            if(line.includes('Operation:')) {
                let operation = line.replace('  Operation: new = old ', '');

                switch(operation) {
                    case '+ 1': sanitizedMonkey.inspect = (old) => (old + 1); break;
                    case '+ 2': sanitizedMonkey.inspect = (old) => (old + 2); break;
                    case '+ 3': sanitizedMonkey.inspect = (old) => (old + 3); break;
                    case '+ 6': sanitizedMonkey.inspect = (old) => (old + 6); break;
                    case '+ 7': sanitizedMonkey.inspect = (old) => (old + 7); break;
                    case '+ 8': sanitizedMonkey.inspect = (old) => (old + 8); break;
                    case '* 7': sanitizedMonkey.inspect = (old) => (old * 7); break;
                    case '* 11': sanitizedMonkey.inspect = (old) => (old * 11); break;
                    case '* 19': sanitizedMonkey.inspect = (old) => (old * 19); break;
                    case '* old': sanitizedMonkey.inspect = (old) => (old * old); break;
                }
            }

            // Set the test value
            if(line.includes('Test: ')) sanitizedMonkey.testIfDivisibleBy = Number(line.replace('  Test: divisible by ', ''))

            // Set the monkeyIfTrue and monkeyIfFalse
            if(line.includes('If true: ')) sanitizedMonkey.monkeyIfTrue = Number(line.replace('    If true: throw to monkey ', ''));
            if(line.includes('If false: ')) sanitizedMonkey.monkeyIfFalse = Number(line.replace('    If false: throw to monkey ', ''));
        })

        return sanitizedMonkey;
    });

    return monkeys;
}

const simulateRounds = (numRounds) => {
    let monkeys = parseInput();
    let commonTestNumber = monkeys.map(m => m.testIfDivisibleBy).reduce((p, d) => p*d);
    console.log('COMMON TEST NUMBER', commonTestNumber);

    for(let round = 0; round < numRounds; round++) {

        monkeys.forEach(monkey => {
            monkey.items.forEach(worryLevel => {
                monkey.itemsInspected++;
                let newWorryLevel = monkey.inspect(worryLevel) % commonTestNumber;
                let isDivisble = newWorryLevel % monkey.testIfDivisibleBy === 0;
                if(isDivisble) monkeys[monkey.monkeyIfTrue].items.push(newWorryLevel);
                else monkeys[monkey.monkeyIfFalse].items.push(newWorryLevel);
            });
            monkey.items = [];
        });
    };
    return monkeys;
}

let monkeys = simulateRounds(10000);

console.log(monkeys.map(monkey => ({ [monkey.name]: monkey.items })));
const inspectedItems = monkeys.map(monkey => monkey.itemsInspected).sort((a,b) => b - a);
console.log('INSPECTED', inspectedItems);
console.log('Answer 2', inspectedItems[0] * inspectedItems[1]);