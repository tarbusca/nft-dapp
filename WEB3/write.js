const Web3 = require('web3');
require("dotenv").config();
var Tx = require('@ethereumjs/tx').Transaction;   //ethereumjs-tx doesn't work

const web3 = new Web3('http://127.0.0.1:7545');
const contractABI = require("./abi.js");
const contractAddress = "0x238Ce0f872C9db39fad945d574EAf75a041e0D10"; //ERC721 contract on ganache

const account1 = '0x19328ce4A5Df286c956DeEA7252b2a2923aC9694';
const buyerAccount = '0x218e85dD4B2aa105cC8e3e88Bb1e9d780c0c032C';
const privateKey1 = process.env["PK"];

const privateKey1Buffer = Buffer.from(privateKey1,"hex");

const contractWriteMethodAsync = async() => {
    try{
        let txCount = await web3.eth.getTransactionCount(account1);
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        const txObject = {
            to:       contractAddress,
            nonce:    web3.utils.toHex(txCount),
            gasLimit: web3.utils.toHex(5000000), // Raise the gas limit to a much higher amount
            gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
            data:     contract.methods.buyNFT(buyerAccount).encodeABI(),
            value:    web3.utils.toHex(web3.utils.toWei('0.01','ether'))
          }
          
        const tx = new Tx(txObject);  
        const signedTrx = tx.sign(privateKey1Buffer);
        const serializedTx = signedTrx.serialize();
        const raw = '0x' + serializedTx.toString('hex');
        let signedTransaction= await web3.eth.sendSignedTransaction(raw);      
        
        console.log("The transaction was successful    : ", signedTransaction.status);
        console.log("Transaction Hash :",signedTransaction.transactionHash);

        let contractBalance = await contract.methods.contractBalance().call();
        console.log("Contract Balance is    : ", web3.utils.fromWei(contractBalance, 'ether'));
        let lastToken = await contract.methods.lastTokenID().call();
        console.log("ID of Last Token is    : ", lastToken);
    }
    catch(error){
        console.log(error);
    }
}
contractWriteMethodAsync()