const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf8');
// const data = fs.readFileSync('./test_input.txt', 'utf8');
console.time('Problem 1')
const priorities = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8,
    i: 9,
    j: 10,
    k: 11,
    l: 12,
    m: 13,
    n: 14,
    o: 15,
    p: 16,
    q: 17,
    r: 18,
    s: 19,
    t: 20,
    u: 21,
    v: 22,
    w: 23,
    x: 24,
    y: 25,
    z: 26,

    A: 27,
    B: 28,
    C: 29,
    D: 30,
    E: 31,
    F: 32,
    G: 33,
    H: 34,
    I: 35,
    J: 36,
    K: 37,
    L: 38,
    M: 39,
    N: 40,
    O: 41,
    P: 42,
    Q: 43,
    R: 44,
    S: 45,
    T: 46,
    U: 47,
    V: 48,
    W: 49,
    X: 50,
    Y: 51,
    Z: 52
}


const rucksacks = data.split(/\n/);
const prioritySum = rucksacks.reduce((prioritySum, rucksack) => {
    const firstHalf = rucksack.slice(0, (rucksack.length/2));
    const secondHalf = rucksack.slice(rucksack.length/2);

    for (let item in firstHalf) {
        if(secondHalf.includes(firstHalf[item])) {
            return prioritySum += priorities[firstHalf[item]]
        }
    }
}, 0);
console.timeEnd('Problem 1')
console.log('Answer 1', prioritySum)
console.time('Problem 2')
// Group the rucksacks into groups of 3
const groupedRucksacks = rucksacks.reduce((grouped, rucksack, index) => {
    if(index % 3 === 0) grouped.push([rucksack, rucksacks[index + 1], rucksacks[index + 2]])
    return grouped;
}, []);

const totalPriority = groupedRucksacks.reduce((runningSum, group) => {
    const firstRucksack = group[0];
    for (let item in firstRucksack) {
        if(group[1].includes(firstRucksack[item]) && group[2].includes(firstRucksack[item])) {
            return runningSum += priorities[firstRucksack[item]];
        }
    }

}, 0);
console.timeEnd('Problem 2')
console.log('Answer 2', totalPriority);