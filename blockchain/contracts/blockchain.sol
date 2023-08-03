pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;
// SPDX-License-Identifier: MIT

contract Blockchain {

    mapping(address => uint) public balances;
    mapping(address=> string) public query;
   address[] myKeys_balances= new address[](10);
    string[] strings;
    uint[] balance ;
   

  
        function send()private {
            
            emit Recieved(strings,balance);
                delete strings;
                delete balance;
                count=0;

        }



function keylength() public view returns(uint){
return myKeys_balances.length;
}
function valuelength() public view returns(uint){
return strings.length;
}
function balanceslength() public view returns(uint){
return balance.length;
}
 
    event Deposit(address sender, uint amount,string  data);
    event Recieved(string[] queries, uint[] amount);
   // event Transfer(address sender, address receiver, uint amount,string  data);
    uint count=0;



    function deposit(string memory data) public payable {
       
        //emit Deposit(msg.sender, msg.value,data);
        balances[msg.sender] += msg.value;
        query[msg.sender]=data;
     
         strings.push(data);
            balance.push(msg.value);
if(count==9){
    send();
}
else{
       count++;}
    }
function getcount() public view  returns(uint){

    return count;
}
}
