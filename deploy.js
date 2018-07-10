const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');
const { interface, bytecode } = require('./compile');

const mnemonic = process.env.MNEMONIC;
const accessToken = process.env.INFURA_ACCESS_TOKEN;
const provider = new HDWalletProvider(
  mnemonic,
  "https://rinkeby.infura.io/" + accessToken
);
const web3 = new Web3(provider);


(async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: '0x' + bytecode,
      arguments: ['Hello Contract!']
    })
    .send({
      from: accounts[0],
      // gas: '1000000'
    });

  console.log('Contract deployed to', inbox.options.address);
})();


// run with "node deploy"