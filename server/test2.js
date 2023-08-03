const Gun = require('gun');
const peers = [

  'http://localhost:8081/gun'
];

const gun = Gun( 'http://localhost:8081/gun',{file:'data.json'} );

const queriesMap = gun.get('queries');

var q=[] ;
queriesMap.map().once((fruit, id) => {
  q.push(fruit);
});
console.log(q);
const { spawn } = require('child_process');

const pythonProcess = spawn('python', ['./server/search.py', JSON.stringify(q), JSON.stringify(['hello', 'hello', 'hello', 'hello', 'hello', 'hello', 'hello', 'hello', 'micahel', 'king'])]);

pythonProcess.stdout.on('data', (data) => {

// Upload the data received from search.py to the gun database

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