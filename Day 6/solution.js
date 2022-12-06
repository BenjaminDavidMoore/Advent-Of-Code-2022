const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf8');
// const data = fs.readFileSync('./test_input.txt', 'utf8');

let packetStartIndex;
let messageStartIndex;
for (let i = 4; i < data.length + 1; i++) {
    const last4 = data.slice(i - 4, i);
    const last14 = data.slice(i - 14, i);
    
    if(!packetStartIndex) {
        const packetStart = [...last4].some((letter, index , allLetters) => allLetters.lastIndexOf(letter) != index);
        if(!packetStart) packetStartIndex = i;
    }
    const messageStart = [...last14].some((letter, index , allLetters) => allLetters.lastIndexOf(letter) != index);
    
    if(!messageStart) messageStartIndex = i;
}
console.log('Packet Start:', packetStartIndex);
console.log('Message Start:', messageStartIndex);