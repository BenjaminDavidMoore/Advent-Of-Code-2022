const fs = require('fs');
const { clone } = require('../utils/misc');

const data = fs.readFileSync('./input.txt', 'utf8');
// const data = fs.readFileSync('./test_input2.txt', 'utf8');

const tailPositions = new Set();

const movements = data.split(/\n/);

const moveHead1 = (startPosition, direction) => {
    let currentX = startPosition[0];
    let currentY = startPosition[1];

    let distance = 1;
    
    switch(direction) {
       case 'U': currentY += distance; break;
       case 'D': currentY -= distance; break;
       case 'L': currentX -= distance; break;
       case 'R': currentX += distance; break;
    }

    return [currentX, currentY];
}

const areEqual = (a, b) => {
    return a[0] === b[0] && a[1] === b[1];
}

const getNextKnotLocation = ((pH, cH, pT, direction) => {
    console.log('PAST HEAD    :', pH)
    console.log('CURRENT HEAD :', cH)
    console.log('PAST TAIL    :', pT)
    
    // If the last head didn't move, the tail shouldn't move either
    if(areEqual(pH, cH)) return pT;

    let cT = clone(pT);
    const distanceX = Math.abs((cH[0] - cT[0]));
    const distanceY = Math.abs((cH[1] - cT[1]));
    const ropeLength = Math.sqrt((distanceX * distanceX) + (distanceY * distanceY));
    
    const areTouching = areEqual(cH, pT);
    
    // If they aren't touching and aren't in the same row or column, move the tail diagonally towards the head
    if(!areTouching && cH[0] !== pT[0] && cH[1] !== pT[1] && (distanceX === 2 || distanceY === 2)) {
        let moveUp = cH[1] > pT[1];
        let moveDown = cH[1] < pT[1];
        let moveLeft = cH[0] < pT[0];
        let moveRight = cH[0] > pT[0];

        if(moveUp) cT = moveHead1(cT, 'U');
        if(moveDown) cT = moveHead1(cT, 'D');
        if(moveLeft) cT = moveHead1(cT, 'L');
        if(moveRight) cT = moveHead1(cT, 'R');
    }
    // If the last one moved at a 90 degree angle
    else if(ropeLength >= 2) {
        let horizontalMove = cH[1] === pT[1];
        let vertMove = cH[0] === pT[0];

        if(vertMove) cT[1] = pH[1];
        if(horizontalMove) cT[0] = pH[0];
    }

    return cT;
});

const printGrid = (positions) => {
    const minX = Math.min(...Object.values(positions).map(letter => letter[0]));
    const maxX = Math.max(...Object.values(positions).map(letter => letter[0]), 0);
    const minY = Math.min(...Object.values(positions).map(letter => letter[1]), 0);
    const maxY = Math.max(...Object.values(positions).map(letter => letter[1]));

    for(let y = maxY; y >= minY; y--) {
        let rowString = '';
        let lettersInThisRow = Object.keys(positions).reverse().filter(letter => positions[letter][1] === y);
        for(let x = minX; x <= maxX; x++) {
            const letterInCell = lettersInThisRow.reduce((l, letter) => {
                if(positions[letter][0] === x) l = letter;
                return l;
            }, '.');
            rowString += letterInCell;
        }
        console.log(rowString)
    }
    console.log('-----------------------------------------------------')
}

let startingPositions = { 
    H: [0,0], // Previous Head Location
    // A: [0,0], // Previous A
    // B: [0,0], // Previous B
    // C: [0,0], // Previous C
    // D: [0,0], // Previous D
    // E: [0,0], // Previous E
    // F: [0,0], // Previous F
    // G: [0,0], // Previous G
    // I: [0,0], // Previous I -- Becasue H represents the tail
    T: [0,0], // Previous Tail Location
};
movements.forEach((movement) => {
    const distance = Number(movement.slice(2));
    const direction = movement[0];
    
    startingPositions = Array.from(Array(distance)).reduce((startingPositions, _, index) => {
        let oldStartingPositions = clone(startingPositions);
        Object.keys(startingPositions).forEach((letter, index, letters) => {
            let previousLetter = letters[index - 1];

            // If it's the head, just move it according to the movement for this cycle
            if(letter === 'H') startingPositions.H = moveHead1(oldStartingPositions.H, direction);
            else {
                let oldPreviousLetter = oldStartingPositions[previousLetter];
                let currentPreviousLetter = startingPositions[previousLetter];
                let oldLetter = oldStartingPositions[letter];

                startingPositions[letter] = getNextKnotLocation(oldPreviousLetter, currentPreviousLetter, oldLetter, direction);
                
                if(letter === 'T') tailPositions.add(startingPositions.T.join(','));
            }
        });
        printGrid(startingPositions);
        return startingPositions;
    }, startingPositions);
});

console.log('Tail Locations', tailPositions.size);