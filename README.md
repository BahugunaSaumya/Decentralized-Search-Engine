# Decentralized Search Engine: Enhancing Privacy, Security, and Transparency in Web Searches

## Overview
This project presents a decentralized search engine designed to enhance privacy, security, and transparency in web searches. By employing blockchain technology, smart contracts, a peer-to-peer (P2P) network architecture, and technologies like GunDB, the system offers an innovative approach to web searching that prioritizes user privacy.

The decentralized search engine addresses the concerns of data collection and manipulation that are prevalent in traditional centralized search engines. For a detailed explanation of the problem statement, methodology, implementation, results, and conclusion, please refer to the pdf document.

## Dependencies
- Node.js
- npm
- Geth
- Python
- GunDB

## Setup and Running the Project

### Installation
Please ensure the following dependencies are installed:
- Node.js
- npm
- Geth
- Python
- GunDB

### Starting the Geth Node
Start the Geth node by running the following command:

\`\`\`
geth --port 3000 --networkid 58343 --datadir=./blkchain --maxpeers=5  --ws --ws.port 8543 --ws.addr 127.0.0.1 --ws.origins "*" --ws.api "eth,net,web3,clef,personal,miner" --http --http.port 8543 --http.addr 127.0.0.1 --http.corsdomain "*" --http.api "eth,net,web3,clef,personal,miner" --mine --miner.etherbase=0xab5F9830f4295b5D3523f93F635842A54d0AB284 --nat extip:10.10.15.162  --allow-insecure-unlock  console 2>>eth.log  
\`\`\`

### Running the Server
1. Run \`Main.js\`.
2. Run \`list.js\`.
3. Navigate to \`localhost:3000\` in your web browser.

### Emulating a Busy Website
To make the process fast and emulate a busy website, run \`script.js\`.

### Logs
The logs are available in the \`eth.log\` file.
