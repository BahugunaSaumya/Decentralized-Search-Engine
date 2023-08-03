const http = require('https');
const url = require('url');
const querystring = require('querystring');
const Web3 = require('web3');
const fs = require('fs');
const { spawn } = require('child_process');
const { Worker } = require('worker_threads');

// Connect to a local Ethereum node
const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://127.0.0.1:8543'));

// Read the contract ABI from the file
const contractABI = JSON.parse(fs.readFileSync('./blockchain/build/contracts/Blockchain.json', 'utf8')).abi;

// Address of the contract you want to listen to
const contractAddress = '0x3F2B0C6F1462BB4198695582cfea18C7ba7301CE';

// Create an instance of the contract using the ABI and address
const contractInstance = new web3.eth.Contract(contractABI, contractAddress);

// Define a function to handle the Received event


// Listen for the Received event
const Gun = require('gun');
const peers = [
  
 'http://localhost:8081/gun'
];




const gun = Gun( {peers,file:'data'} );
    
const queriesMap = gun.get('queries');


contractInstance.events.Recieved()
  .on('data', async (event) => {
    console.log('Received event emitted:', event.returnValues);


   
    var q=[] ;
    queriesMap.map().once((fruit) => {
      q.push(fruit);
    });
    const { spawn } = require('child_process');
    
    const pythonProcess = spawn('python', ['./server/search.py', JSON.stringify(q), JSON.stringify(event.returnValues.queries)]);
    
    pythonProcess.stdout.on('data', (data) => {
    const parsedData = JSON.parse(data);
    console.log(parsedData)
    if(parsedData!={}){
    queriesMap.put({})
      queriesMap.put(parsedData);
    }
    });
    
    pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
    });
    
    pythonProcess.on('close', (code) => {
    console.log(`Python script exited with code ${code}`);
    });
  });
