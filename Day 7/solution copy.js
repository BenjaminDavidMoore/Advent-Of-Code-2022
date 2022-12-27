const fs = require('fs');
// const data = fs.readFileSync('./input.txt', 'utf8');
const data = fs.readFileSync('./test_input.txt', 'utf8');

const lines = data.split(/\n/);

const directory = {};
lines.forEach((line, index, allLines) => {
    // If it is just an output, ignore it
    if(!line.includes('$')) return;
    console.log('-----------------------')
    // Figure out what your latest directory is
    const pwd = allLines.slice(0, index) // Grab all of the commands that happened before
        .filter(line => line.includes('$ cd')) // Filter out the non-cd commands
        .reduce((pwd, line) => {
            if(line.includes('..')) pwd.pop();
            else { pwd.push(line.replace('$ cd ', '')) }
            return pwd;
        }, [])
    console.log(line, pwd);

    if(line.includes('ls')) {
        // Iterate over each of the lines of the output
        allLines.slice(index + 1).every(line => {
            // Stop once you get to the next command
            if(line.includes('$')) return false;

            // Grab the latest object for the pwd
            let activeDir = directory;
            pwd.forEach(dir => {
                activeDir = activeDir[dir];
            });

            const updatedDir = {}
            // Update the activeDir with the outputs
            if(line.includes('dir')) {
                const newDirName = line.replace('dir ', '');
                updatedDir[newDirName] = {};
            } else {
                const newFileSize = line.split(' ')[0];
                const newFileName = line.split(' ')[1];
                updatedDir[newFileName] = newFileSize;
            }
            
            console.log('LS OUTPUT', line);
            ['e', 'a']
            // Reassign it back to the main directory
            let activeDir = directory;
            pwd.reverse().forEach((dir, index) => {
                if(index === 0) 
                
                
                activeDir = activeDir[dir];
                
            })
            return true;
        })
    }
    
    // if(line.includes('cd')) {
    //     if(line.includes('..')) {

    //     } else {

    //     }
    // }
});

console.log('DIRECTORY', directory)

// {
//     a: {},
//     b: 2234234
//     c: 2342342,
//     d: {}
// }