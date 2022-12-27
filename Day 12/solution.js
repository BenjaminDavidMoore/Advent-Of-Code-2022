const fs = require('fs');
const { clone } = require('../utils/misc');
const data = fs.readFileSync('./input.txt', 'utf8');
// const data = fs.readFileSync('./test_input.txt', 'utf8');

const alpha = 'SabcdefghijklmnopqrstuvwxyzE';

let lines = data.split(/\n/);

class PriorityQueue {
    queue = [];

    constructor(startNode) {
        startNode.traveledLength = 0;
        this.queue.push(startNode);
    }

    push(elements) {
        this.queue.push(...elements);
        this.sort();
        let deDuped = new Map(); 
        this.queue.forEach(element => deDuped.set(`${element.location[0]},${element.location[1]}`, element));
        this.queue = [...deDuped.values()]
    }

    sort() {
        this.queue.sort((a, b) => a.totalWeight - b.totalWeight);
    };

    pop() {
        return this.queue.shift()
    }
}

const getNodeAtLocation = ([x, y]) => {
    if(y < 0 || y >= lines.length) return undefined;
    return lines[y][x];
}

const findLocation = (letter = 'E') => {
    let location = [];
    lines.forEach((line, index) => {
        if(line.includes(letter)) location[1] = index;
    });
    location[0] = lines[location[1]].indexOf(letter);
    return location;
}
// determine the distance between the active letter and the finish to make sure
// each step is making positive progress instead of blind searching
const distanceToFinish = (location) => {
    let distanceX = Math.abs(finishLocation[0] - location[0]);
    let distanceY = Math.abs(finishLocation[1] - location[1]);
    return Math.sqrt((distanceX*distanceX) + (distanceY*distanceY));
}

// [{ letter: 'a', location: [0, 1] }];
const getSurroundingNodes = ([x, y]) => {
    const up = getNodeAtLocation([x, y - 1]);
    const down = getNodeAtLocation([x, y + 1]);
    const left = getNodeAtLocation([x - 1, y]);
    const right = getNodeAtLocation([x + 1, y]);
    
    return [up, down, left, right];
}

const determineIfValid = (activeNode, potentialNode) => {
    if(!potentialNode) return false;
    
    let isCloseEnough = alpha.indexOf(potentialNode.letter) <= (alpha.indexOf(activeNode.letter) + 1)

    return isCloseEnough && !!potentialNode.letter && !potentialNode.explored;
}

// Sets the provided value on the provided property on the node at the given location 
const setProperty = (location, property, value) => {
    if(!location) return;
    lines[location[1]][location[0]][property] = value;
}

// Turn the input from just letters into actual nodes
const transform = (letter, location) => {
    return {
        location,
        explored: false,
        letter,
        traveledFrom: [],
        traveledLength: Number.POSITIVE_INFINITY,
        distanceToFinish: distanceToFinish(location),
        totalWeight: Number.POSITIVE_INFINITY
    }
}

const printGrid = () => {
    console.log('________')
    lines.forEach(line => console.log(line.map(node => {
        if(node.explored) {
            if(node.location[0] === activeNode.location[0] && node.location[1] === activeNode.location[1]) {
                return '_'
            } else return node.letter.toUpperCase()
        } else return node.letter;
    }).join('')));
    console.log('________')
}

const formatNode = (node) => {
    if(!node) return;
    return `letter: ${node.letter}, location: ${node.location[0]}, ${node.location[1]}, totalWeight: ${node.totalWeight}, traveledLength: ${node.traveledLength}, traveledFrom: ${node.traveledFrom[0]}, ${node.traveledFrom[1]}`;
} 

let startLocation = findLocation('S');
// let startLocation = [0, 20]
let finishLocation = findLocation('E');

// Go ahead and pre-transorm all of the letters into Nodes
lines = lines.map((line, yCoord) => line.split('').map((letter, xCoord) => transform(letter, [xCoord, yCoord])));
let startNode = lines[startLocation[1]][startLocation[0]];

let priorityQueue = new PriorityQueue(startNode);

let activeNode;
// console.time('A')
while(!!priorityQueue.queue.length) {
// console.log('QUEUE', priorityQueue.queue.map(formatNode));
    let lastNode = activeNode;
    // Choose the next node to explore, which should just be the top of the queue
    activeNode = priorityQueue.pop();
    
    setProperty(activeNode.location, 'explored', true);
    
    // printGrid();

// console.log('ACTIVE NODE', formatNode(activeNode))

    if(activeNode.letter === 'E') {
        activeNode.traveledFrom = lastNode.location;
        break;
    }

    // Find all of the possible nodes to go to
    const possibleNextNodes = getSurroundingNodes(activeNode.location);
// console.log('POSSIBLE NODES', possibleNextNodes.map(formatNode))
    // Filter out any invalid ones
    let validNodes = possibleNextNodes.filter(candidateNode => determineIfValid(activeNode, candidateNode));

// console.log('VALID NODES', validNodes.map(formatNode));

    // Update totalWeight for all of the possible nodes
    let updatedNodes = validNodes.map(candidateNode => {
        if(candidateNode.traveledLength > activeNode.traveledLength + 1) {
            candidateNode.traveledLength = activeNode.traveledLength + 1;
            candidateNode.totalWeight = distanceToFinish(candidateNode.location) + activeNode.traveledLength + 1;
            candidateNode.traveledFrom = activeNode.location;
        }
        return candidateNode;
    });

// console.log('UPDATED NODES', updatedNodes.map(formatNode));

    // Add the newly updated nodes to the priority queue. It should sort and dedupe it for us
    priorityQueue.push(updatedNodes);
// console.log('=================================================')
}

let shortestPath = [];
doneBacktracking = false;
let currentBacktrackNode = activeNode;
while(true) {
    if(currentBacktrackNode.letter === 'S') break;
    // console.log('CURERENT BACKTRACK NODE', currentBacktrackNode)
    shortestPath.push(currentBacktrackNode.location);

    currentBacktrackNode = getNodeAtLocation(currentBacktrackNode.traveledFrom);
}
// console.log('Shortest Path', shortestPath)
console.log('Shortest Path', shortestPath.length)

let newLines = data.split(/\n/);
console.log('========');
newLines.map((line, yCoord) => {
    let cellsToUpdate = shortestPath.filter(cell => cell[1] === yCoord).map(c => c[0]);
    // let newCells = line.split('').map((cell, xCoord) => cellsToUpdate.includes(xCoord) ? cell.toUpperCase() : cell);
    let newCells = line.split('').map((cell, xCoord) => cellsToUpdate.includes(xCoord) ? '_' : cell);
    console.log(newCells.join(''));
})
console.log('========');

// console.log('PRIORITY QUEUE', priorityQueue.queue);
// console.log('PROCESSED NODES', processedNodes)