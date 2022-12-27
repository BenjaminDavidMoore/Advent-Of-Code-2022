const fs = require('fs');
const { clone } = require('../utils/misc');
// const data = fs.readFileSync('./input.txt', 'utf8');
const data = fs.readFileSync('./test_input.txt', 'utf8');
// const data = fs.readFileSync('./test_input2.txt', 'utf8');

let commands = data.split(/\n/);
let image = [
    Array(40).fill('.'),
    Array(40).fill('.'),
    Array(40).fill('.'),
    Array(40).fill('.'),
    Array(40).fill('.'),
    Array(40).fill('.')
];

const draw = (rows) => {
    console.log('========================================');
    rows.forEach(row => {
        console.log(row.join(''))
    });
    console.log('========================================');
    console.log('\n');
}

const convertToPixel = (pixel) => {
    let pixelRow = Math.floor(pixel / 40);
    let pixelColumn = pixel % 40;

    return [pixelRow, pixelColumn];
}

const areEqual = (a, b) => (a[0] === b[0]) && (a[1] === b[1]);

const updateImage = (image, cycle, x) => {
    let currentPixel = convertToPixel(cycle - 1);
    let spriteLeftEdge = x - 1;
    let spriteCenter = x;
    let spriteRightEdge = x + 1;

    console.log('CURRENT PIXEL', currentPixel)
    console.log('SPRITE LEFT EDGE', spriteLeftEdge)
    console.log('SPRITE CENTER', spriteCenter)
    console.log('CURRENT RIGHT EDGE', spriteRightEdge)

    let pixelBrightness = '.'

    if(
        currentPixel[1] === spriteLeftEdge ||
        currentPixel[1] === spriteCenter || 
        currentPixel[1] === spriteRightEdge
    ) pixelBrightness = '#';

    image[currentPixel[0]][currentPixel[1]] = pixelBrightness;
    
    return image;
}

const findX = (cycle) => {
    let x = 1;
    let currentCycle = 1;
    
    commands.every(command => {
        if(currentCycle === cycle) return false;    // Return false is effectivly a "break" in the loop

        if(command.includes('noop')) currentCycle++;
        else if(command.includes('addx')) {
            currentCycle++; // This is effectivly a noop
            if(currentCycle === cycle) return false;
            x += Number(command.replace('addx ', ''));
            currentCycle++;
        }

        if(currentCycle === cycle) return false;

        return true;
    })

    return x;
}

for(let cycle = 1; cycle < 240; cycle++) {
    let x = findX(cycle);
    console.log(`Cycle: ${cycle}, X: ${x} -----------------------`);
    
    image = updateImage(image, cycle, x);
}

draw(image);
console.log(cycleValues);