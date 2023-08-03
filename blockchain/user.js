const Web3 = require('web3');

const sendEther = async (to, amount,raw) => {
    const accounts = await web3.eth.getAccounts();
    const from = accounts[1]; // replace with your sender account
  
    const tx = {
      from,
      to: to.address,
      data:web3.utils.utf8ToHex("hello"),
      value: web3.utils.toWei(amount.toString(), 'ether')
    };
    web3.eth.personal.unlockAccount(accounts[1], '8979').then(console.log("true")).catch(console.error);
    // replace with your sender private key
    //const receipt = await web3.eth.sendTransaction(tx);
  //  console.log(`Transaction hash: ${receipt.transactionHash}`);
    await web3.eth.getTransaction(receipt.transactionHash,(error,transaction)=>{
        if(!error){
          console.log(web3.utils.hexToUtf8(transaction.input));
        }
        else{
          console.log(error);
        }
        
       })
      .then(console.log);
    balances()
    sign(raw);
    console.log(await web3.eth.getBalance(account.address))
  }
  
// 5. Call balances function

        const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://127.0.0.1:8543'));

        // set up the user's account
        const account = web3.eth.accounts.create();
        console.log(account);
        // send a transaction to a random miner
        var miners;
        var minerAddress;
        web3.eth.defaultAccount = account.address;
         web3.eth.getAccounts().then(k=>{
            console.log(k)
            console.log(web3.eth.defaultAccount)
      

        minerAddress = k[0];}
         );
         web3.eth.getBlock('latest', (error, result) => {
            if (error) {
              console.error(error);
            } else {
              console.log('Latest block gas limit:', result);
            }
          })

        const raw={
            from: account.address,
            to: "0xc93ADa145Ef2961d1BBC061F629bB511d02E6e1a",
            value: 0,
            data: web3.utils.utf8ToHex('Hello, miner!'),
           chainId:10,
            gas:22000,
            gasprice:0,
           
        };
        console.log(raw);
      // sign(raw); // web3.eth.accounts.signTransaction(
        //     raw,
        //     account.privateKey
        //  );
         
                 
         sendEther(account.address,200,raw)
         const balances = async () => {
            const addressFrom = account.address
const addressTo = "0xc93ADa145Ef2961d1BBC061F629bB511d02E6e1a";
            // 4. Fetch balance info
            const balanceFrom = await web3.eth.getBalance(addressFrom)
            const balanceTo = await web3.eth.getBalance(addressTo);
          
            console.log(`The balance of ${addressFrom} is: ${balanceFrom} ETH`);
            console.log(`The balance of ${addressTo} is: ${balanceTo} ETH`);
          };
     
async function sign(raw){
    const signedTransaction = await web3.eth.accounts.signTransaction(
        raw,
        account.privateKey
      )
console.log(signedTransaction.rawTransaction);
web3.eth.sendSignedTransaction(signedTransaction).then(console.log).catch(console.error);
      return signedTransaction;

}


// 3. Create balances function
