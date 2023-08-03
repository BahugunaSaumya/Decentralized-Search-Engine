const express = require('express');
const app = express();
const fs = require('fs');
const Web3 = require('web3');
const filePath = './search_results.json';
const path= require('path')
const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://127.0.0.1:8543'));
const contractAddress = '0x3F2B0C6F1462BB4198695582cfea18C7ba7301CE';
let publicPath = path.resolve(__dirname, "../client")
app.use(express.static(publicPath));
const Gun = require('gun')
require('gun/lib/server')


const server2 = require('http').createServer().listen(8081)
 const gun=Gun({ web: server2, file:'data' ,peers: [`http://localhost:8081/gun`] })

// Read the ABI from a local file
const contractABI = JSON.parse(fs.readFileSync('./blockchain/build/contracts/Blockchain.json', 'utf8')).abi;
console.log(contractABI);
const contract = new web3.eth.Contract(contractABI, contractAddress);
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'), (err) => {
    if (err) {
      res.status(500).send(`Error loading index.html: ${err}`);
    }
  });
});
app.get('/deposit/:data', async (req, res) => {
  const data = req.params.data;
  console.log(contract.methods);
console.log(data);
  const accounts = await web3.eth.getAccounts();
  console.log(await web3.eth.getBalance(accounts[0]));
  await web3.eth.personal.unlockAccount(accounts[0], '897988')
  
  .then(async () => {
    let retries = 0;
const maxRetries = 3;

while (retries < maxRetries) {
  try {
    const result = await contract.methods.deposit(data)
      .send({ from: accounts[0], value: 2 });
    console.log(result);
    res.send(result);
    break;
  } catch (error) {
    console.error(error);
    if (error.message.includes("Transaction has been reverted")) {
      console.log("Transaction reverted, retrying...");
      retries++;
      continue;
    }
    throw error;
  }
}

if (retries >= maxRetries) {
  console.log("Max retries exceeded, unable to complete transaction.");
}
    })
    .catch((error) => 
    {console.log(error); 
      res.send(error); })
});
app.get('/index', (req, res) => {
  res.sendFile(`./client/index.html`);
});
app.get('/update/:data', async (req, res) => {
  const search = req.params.data;
  console.log(`Looking for ${search}`);
  const queriesMap = gun.get('queries');
  try {
    const callback = queriesMap.get(search).on((data) => {
   
      console.log(data);
      console.log(JSON.parse(data["results"]));
     
      
      res.json(data);
      console.log("Responded");
      queriesMap.off(callback);
    });
  } catch (error) {
    console.log(`Error: ${error}`);
    res.sendStatus(500);
  }
});
app.get('/balanceslength', async (req, res) => {
  const result = await contract.methods.balanceslength().call();
  console.log(result);
  res.send(result);
});

app.get('/keylength', async (req, res) => {
  const result = await contract.methods.keylength().call();
  console.log(result);
  res.send(result);
});

app.get('/valuelength', async (req, res) => {
  const accounts = await web3.eth.getAccounts();
  console.log(await web3.eth.getBalance(accounts[0]));
  await web3.eth.personal.unlockAccount(accounts[0], '897988').then(async () => {
    const result = await contract.methods.valuelength().call({from:accounts[0]});
    console.log(result);
    res.send(result);
  }).catch((error) => {
    console.log(error);
    res.send(error);
  });
});

// app.get('/without/:data', async (req, res) => {
//   const data = req.params.data;


//   const accounts = await web3.eth.getAccounts();

  
//   try {
//     await web3.eth.personal.unlockAccount(accounts[0], '897988');
//     const result = await contract.methods.deposit(data)
//       .send({ from: accounts[0], value: 2 });
//    console.log("done for " +data)
//     res.send(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: 'Something went wrong.' });
//   }
// });


app.listen(4000, () => {
  console.log('Server started on port 3000');
});

async function watchFileForChanges(keyToWatch) {
  // Read initial contents of the file
  let previousData = JSON.parse(fs.readFileSync(filePath));

  // Wrap fs.watchFile in a Promise for easier handling of asynchronous operations
  const watchFilePromise = () => new Promise((resolve, reject) => {
   var listen= fs.watchFile(filePath, (current, previous) => {
      // Check if the file was modified
      if (current.mtimeMs !== previous.mtimeMs) {
        // Read the updated contents of the file
        const newData = JSON.parse(fs.readFileSync(filePath));

        // Check if the value for the key we're interested in has changed
        if (newData[keyToWatch] !== previousData[keyToWatch]) {
          console.log(`The value for "${keyToWatch}" has been updated to`);
         
          resolve(newData[keyToWatch]);
          console.log(` closing listening "${keyToWatch}"`);
          fs.unwatchFile(filePath, listen);
        }

        // Update the previous data with the new data
        previousData = newData;
      }
    });
    
  });
  const response = await watchFilePromise();
  return response;
}