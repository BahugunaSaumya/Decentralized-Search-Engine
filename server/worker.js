const http = require('https');
const { parentPort } = require('worker_threads');

function handleReceivedEvent(event) {
  console.log('Received event emitted:', event.returnValues);

  const uintArray = event.returnValues.queries;
  const stringArray = event.returnValues.amount;

  // Do something with the arrays here
  console.log('Received uint array:');
  console.log(uintArray);
  console.log('Received string array:');
  console.log(stringArray);

  // Create a new thread of the code in 1 for each search query in the array
  uintArray.forEach(query => {
    const queryUrl = `https://api.duckduckgo.com/?q=${query}&format=json`;

    http.get(queryUrl, apiRes => {
      let apiData = '';

      apiRes.on('data', chunk => {
        apiData += chunk;
      });

      apiRes.on('end', () => {
        const data = JSON.parse(apiData);
console.log("printng data:");
        console.log(data);

        if (data) {
          displaySearchResults(data);
        } else {
          displaySearchResults([]);
        }
      });
    }).on('error', error => {
      console.error('Error fetching search results:', error);
      displaySearchResults([]);
    });

    function displaySearchResults(results) {
      console.log('Search results for query:', query);

      if (results.length === 0) {
        console.log('No results found.');
      } else {
        results.forEach(result => {
          console.log(`Title: ${result.title}`);
          console.log(`URL: ${result.url}`);
          console.log(`Abstract: ${result.abstract}`);
        });
      }
    }
  });
}

parentPort.on('message', (event) => {
  handleReceivedEvent(event);
});

module.exports = {
  handleReceivedEvent,
};