const Blockchain = artifacts.require('Blockchain')
const Web3 = require('web3');
module.exports = async function (deployer) {
  await web3.eth.personal.unlockAccount("0xab5F9830f4295b5D3523f93F635842A54d0AB284", '897988');
  await deployer.deploy(Blockchain)
  console.log("is deployed");

  

 
 
}