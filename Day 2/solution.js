const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf8');

console.time('Problem 1');
// Includes round outcome score and choice score. 
const scoringKeyProb1 = {
    'A X': 3 + 1,
    'A Y': 6 + 2,
    'A Z': 0 + 3,
    
    'B X': 0 + 1,
    'B Y': 3 + 2,
    'B Z': 6 + 3,

    'C X': 6 + 1,
    'C Y': 0 + 2,
    'C Z': 3 + 3,
}


const rounds = data.split(/\n/);
const problem1Score = rounds.reduce((score, round) => score + scoringKeyProb1[round], 0);
console.timeEnd('Problem 1');

console.log('Problem 1 Score:', problem1Score);

console.time('Problem 2');
const scoringKeyProb2 = {
                     // them -> you
    'A X': 0 + 3,    // rock -> scissors
    'A Y': 3 + 1,    // rock -> rock
    'A Z': 6 + 2,    // rock -> paper
    
    'B X': 0 + 1,    // paper -> rock
    'B Y': 3 + 2,    // paper -> paper 
    'B Z': 6 + 3,    // paper -> scissors

    'C X': 0 + 2,    // scissors -> paper
    'C Y': 3 + 3,    // scissors -> scissors
    'C Z': 6 + 1,    // scissors -> rock
}
const problem2Score = rounds.reduce((score, round) => score + scoringKeyProb2[round], 0);
console.log('Problem 2 Score:', problem2Score);
console.timeEnd('Problem 2');