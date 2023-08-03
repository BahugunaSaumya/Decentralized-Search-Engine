const Gun = require('gun');
const peers = [
  
  'http://localhost:8081/gun'
];

const gun = Gun({ peers,file:'data'} );

const queriesMap = gun.get('queries')
console.log(queriesMap)



queriesMap.get('this is dumb').on(data => {console.log(typeof data["results"]);console.log(JSON.parse(data["results"]))});