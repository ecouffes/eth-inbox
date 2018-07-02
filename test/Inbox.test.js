const assert = require('assert'); //node.js
const ganache = require('ganache-cli');
const Web3 = require('web3');
// interface is ABI: intermediation between solidity and javascript
const { interface, bytecode } = require('../compile');

// Provider is the communication layer between Ethreum network layer and application layer
// ganache has unlocked accounts
const provider = ganache.provider();
const web3 = new Web3(provider);

let accounts;
let inbox;
const INITIAL_STRING = 'Hello Contract!';

// Run before each callback of "it" method
beforeEach(async () => {
  // Get a list of all unlocked accounts
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy the contract
  // 1: Teaches web3 about what methods an Inbox contract has
  // 2: Tells web3 that we want to deploy a new copy of this contract
  // 3: Instructs web3 to send out a TX that creates this contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: '0x' + bytecode,
      arguments: [INITIAL_STRING]
    })
    .send({
      from: accounts[0],
      gas: '1000000'
    });

  inbox.setProvider(provider);
});


describe('Inbox', () => {
  it('deploys a contract', () => {
    // console.log(accounts);
    // console.log(inbox);

    //assert.ok(boolean);
    assert.ok(inbox.options.address);
  });

  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, INITIAL_STRING);
  });

  it('can change the message', async () => {
    const receipt = await inbox.methods.setMessage('Bonjour Contract!').send({ from: accounts[0] });
    // console.log(receipt)
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Bonjour Contract!');
  })


});
