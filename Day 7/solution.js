const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf8');
// const data = fs.readFileSync('./test_input.txt', 'utf8');

const lines = data.split(/\n/);

const directory = [];
lines.forEach((line, index, allLines) => {
    // Figure out what your latest directory is
    const pwd = allLines.slice(0, index) // Grab all of the commands that happened before
        .filter(line => line.includes('$ cd')) // Filter out the non-cd commands
        .reduce((pwd, line) => {
            if(line.includes('..')) pwd.pop();
            else { pwd.push(line.replace('$ cd ', '')) }
            return pwd;
        }, [])

    // It's a file
    if(Number(line[0]) > 0) {
        const newFileSize = line.split(' ')[0];
        const newFileName = line.split(' ')[1];
        const filePath = pwd.join('/');
        directory.push([filePath, Number(newFileSize)])
    }
});

const uniqueDirPaths = new Set();
directory.forEach(dir => {
    uniqueDirPaths.add(dir[0]);
});

let dirSizes = {}
for(const dir of uniqueDirPaths) {
    const filtered = directory.filter((direc, index) => {    
        console.log('DIR', direc[0])    
        return direc[0].includes(dir)
    })
    .reduce((sum, direc) => {
        return sum+= Number(direc[1]) 
    }, 0);
    dirSizes[dir] = filtered
}

// Find the directories which have less than 100000 file size and add them up
const sub100kDirs = Object.values(dirSizes).filter(value => value < 100000);
const answer1 = sub100kDirs.reduce((sum, value) => { return Number(sum + value) }, 0)
console.log(answer1);