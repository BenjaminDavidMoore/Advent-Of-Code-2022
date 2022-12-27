const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf8');
// const data = fs.readFileSync('./test_input.txt', 'utf8');

const tailPositions = new Set()

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

const getTailLocation = ((pH, cH, pT) => {
    console.log('PAST HEAD    :', pH)
    console.log('CURRENT HEAD :', cH)
    
    let cT = pT;
    const distanceX = Math.abs((cH[0] - cT[0]));
    const distanceY = Math.abs((cH[1] - cT[1]));
    const ropeLength = Math.sqrt((distanceX*distanceX) + (distanceY*distanceY))
    
    // If it was just moving in a straight line
    if(ropeLength >= 2) cT = pH;
    
    console.log('PAST TAIL    :', pT)
    console.log('CURRENT TAIL :', cT)
    console.log('DISTANCES', distanceX, distanceY);
    console.log('ROPE LENGTH:', ropeLength);
    console.log('---------------------')

    return cT;
});

let startingPositions = { 
    pH: [0,0], // Previous Head Location
    // cH: [0,0], // Current Head Location
    pT: [0,0], // Previous Tail Location
    // cT: [0,0]  // Current Tail Location
};
movements.forEach((movement) => {
    console.log('MOVEMENT', movement);
    const distance = Number(movement.slice(2));
    const direction = movement[0];

    startingPositions = Array.from(Array(distance)).reduce(({ pH, pT }, _, index) => {
        let cH = moveHead1(pH, direction);
        let cT = getTailLocation(pH, cH, pT);
        
        tailPositions.add(cT.join(','));

        return { pH: cH, pT: cT };
    }, startingPositions);
    console.log('*******************************************************')
});

console.log('Tail Locations', tailPositions);