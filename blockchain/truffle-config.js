module.exports = {
  
networks: {
    development: {
      host: "127.0.0.1",
      websokets:true,
      port: 8543,
      network_id: "58343",
      from: "0xab5F9830f4295b5D3523f93F635842A54d0AB284",
      gas: 20000000
    },
    compilers: {
      solc: {
        version: "0.8.0"
      }
    }
  }
}


