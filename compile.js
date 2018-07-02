const path = require('path'); // cross platform path compile building
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

console.log(solc.compile(source, 1)); // run with "node compile"
module.exports = solc.compile(source, 1).contracts[':Inbox'];