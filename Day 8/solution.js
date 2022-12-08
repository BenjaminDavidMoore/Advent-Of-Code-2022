const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf8');
// const data = fs.readFileSync('./test_input.txt', 'utf8');

const rows = data.split(/\n/);
let visibleCount = 0;
let topScenicScore = 0;
rows.forEach((row, index, rows) => {
    row.split('').forEach((treeHeight, rowIndex, row) => {
        const treesInColumn = rows.map(row => row[rowIndex]);
        const treesAboveIt = treesInColumn.slice(0, index)
        const treesBelowIt = treesInColumn.slice(index + 1, rows.length);
        const treesToTheLeft = row.slice(0, rowIndex);
        const treesToTheRight = row.slice(rowIndex + 1, row.length);

        if(
            treesAboveIt.length === 0 ||
            treesBelowIt.length === 0 ||
            treesToTheLeft.length === 0 ||
            treesToTheRight.length === 0
        ) visibleCount++;
        else if(
            !treesAboveIt.some(tree => Number(tree) >= Number(treeHeight)) ||
            !treesBelowIt.some(tree => Number(tree) >= Number(treeHeight)) ||
            !treesToTheLeft.some(tree => Number(tree) >= Number(treeHeight)) ||
            !treesToTheRight.some(tree => Number(tree) >= Number(treeHeight))
        ) visibleCount++

        const viewDistanceUp = findViewDistance(treesAboveIt.reverse(), treeHeight);
        const viewDistanceDown = findViewDistance(treesBelowIt, treeHeight);
        const viewDistanceLeft = findViewDistance(treesToTheLeft.reverse(), treeHeight);
        const viewDistanceRight = findViewDistance(treesToTheRight, treeHeight);
        const scenicScore = viewDistanceUp * viewDistanceDown * viewDistanceLeft * viewDistanceRight;

        if(topScenicScore < scenicScore) topScenicScore = scenicScore
        // if(isOnEdge || isVisibleFromTop || isVisibleFromBottom || isVisibleFromLeft || isVisibleFromRight) visibleCount++;
    })
})

function findViewDistance(otherTrees, candidateTree) {
    let NumberOfBiggerTrees = otherTrees.findIndex(tree => tree >= candidateTree) + 1;
    if(NumberOfBiggerTrees === 0) NumberOfBiggerTrees = otherTrees.length;
    return NumberOfBiggerTrees;
}

console.log('Answer 1', visibleCount);
console.log('Answer 2', topScenicScore);