const fetch = require("node-fetch");
const xlsx = require("xlsx");
const words = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew', 'kiwi', 'lemon'];
const characters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const array1 = [];
for (let i = 0; i < 1; i++) {
  const index = Math.floor(Math.random() * words.length);
  let query = words[index];
  if (Math.random() < 0.5) {
    const charIndex = Math.floor(Math.random() * characters.length);
    query += characters[charIndex];
  } else {
    const wordIndex = Math.floor(Math.random() * words.length);
    query += words[wordIndex];
  }
  array1.push(query);
}

const array2 = [];
for (let i = 0; i < 2; i++) {
  const index = Math.floor(Math.random() * words.length);
  let query = words[index];
  if (Math.random() < 0.5) {
    const charIndex = Math.floor(Math.random() * characters.length);
    query += characters[charIndex];
  } else {
    const wordIndex = Math.floor(Math.random() * words.length);
    query += words[wordIndex];
  }
  array2.push(query);
}

const array3 = [];
for (let i = 0; i < 3; i++) {
  const index = Math.floor(Math.random() * words.length);
  let query = words[index];
  if (Math.random() < 0.5) {
    const charIndex = Math.floor(Math.random() * characters.length);
    query += characters[charIndex];
  } else {
    const wordIndex = Math.floor(Math.random() * words.length);
    query += words[wordIndex];
  }
  array3.push(query);
}
const queries = [
array1,array2,array3
];
const arrays = [
  { name: "Array 1", data: array1, size: 1 },
  { name: "Array 2", data: array2, size: 2 },
  { name: "Array 3", data: array3, size: 3 },
];

const headers = ["Query", "Response Time"];
const rows = [];

arrays.forEach(({ name, data, size }) => {
 

  const promises = [];

  data.forEach((query) => {
    promises.push(
        fetch(`http://localhost:4000/deposit/${query}`)
        .then(() => {
          const startTime = new Date().getTime();
          return fetch(`http://localhost:4000/update/${query}`).then(() => {
            const endTime = new Date().getTime();
            const responseTime = endTime - startTime;
            console.log(responseTime);
            rows.push([query, responseTime]);
          });
        })
        .catch((error) => {
          console.error(error);
        })
    );
  });

  Promise.all(promises).then(() => {
    console.log(`Finished querying ${name}`);
    const totalQueries = data.length;
    const totalTime = rows.filter(([, responseTime]) => !isNaN(responseTime)).reduce((total, [, responseTime]) => total + responseTime, 0);
    rows.push(["", ""], ["Total Queries:", totalQueries], ["Total Time:", totalTime]);
    if (rows.length === totalQueries * 2 + 3 * arrays.length) {
      const workbook = xlsx.utils.book_new();
      const worksheet = xlsx.utils.aoa_to_sheet([headers, ...rows]);
      xlsx.utils.book_append_sheet(workbook, worksheet, "Query Results");
      xlsx.writeFile(workbook, "query-results.xlsx");
      console.log("Query results written to query-results.xlsx");
    }
  });
});