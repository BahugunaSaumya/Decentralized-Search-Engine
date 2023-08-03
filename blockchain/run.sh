#!/bin/bash

# Start the blockchain node in a separate terminal
gnome-terminal -- sh -c 'geth --port 3000 --networkid 58343 --datadir=./blkchain --maxpeers=5  --ws --ws.port 8543 --ws.addr 127.0.0.1 --ws.origins "*" --ws.api "eth,net,web3,clef,personal,miner" --http --http.port 8543 --http.addr 127.0.0.1 --http.corsdomain "*" --http.api "eth,net,web3,clef,personal,miner" --mine --miner.etherbase=0xab5F9830f4295b5D3523f93F635842A54d0AB284 --nat extip:10.10.15.162  --allow-insecure-unlock  console 2>>eth.log'

# Wait for the blockchain node to start
sleep 5

# Attach to the geth instance in another terminal
gnome-terminal -- geth attach http://localhost:8543 --exec "miner.start(20)"

# Execute everything else in a single terminal
gnome-terminal -- sh -c 'node main.js; node list.js; sleep 5; sleep 5; xdg-open https://localhost:8081'
