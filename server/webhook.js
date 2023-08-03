// server.js

const WebSocket = require('ws');
const Gun = require('gun');
const peers = [
  'http://localhost:8081/gun'
];
const gun = Gun({ peers, file: 'data' });
const queriesMap = gun.get('queries');

const wss = new WebSocket.Server({ port: 5000 });
console.log("Started server on port 5000");

wss.on('connection', (ws) => {
  let callback;
  
  ws.on('message', (message) => {
    const searchQuery = JSON.parse(message)["query"];
    console.log("Received a search query: " + searchQuery);
    
    // Kill old callbacks for this client
    if (callback) {
      queriesMap.off(callback);
    }
    
    // Add a new query to the Gun database
    callback = queriesMap.get(searchQuery).on((data) => {
      console.log(typeof data);
      console.log(JSON.parse(data["results"]));
      res.send(result);
      const payload = JSON.stringify({ query: searchQuery, results: JSON.stringify(data) });
      console.log("Sending results for query: " + searchQuery);
      
      ws.send(payload, (error) => {
        if (error) {
          console.error(error);
        } else {
          console.log("Results sent for query: " + searchQuery);
        }
      });
    });
  });
  
  ws.on('close', () => {
    // Kill the callback for this client when it disconnects
    if (callback) {
      queriesMap.off(callback);
    }
  });
});
