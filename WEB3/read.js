const Web3 = require('web3');
var Tx = require('ethereumjs-tx');
const web3 = new Web3('http://127.0.0.1:7545');

const contractABI = require("./abi.js");
const contractAddress = "0x238Ce0f872C9db39fad945d574EAf75a041e0D10";
//ERC721 contract on ganache

const readContractAsync = async() => {
    try{
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        let tokenName = await contract.methods.name().call();
        console.log("Name of Token          : ", tokenName);
        let tokenSymbol = await contract.methods.symbol().call();
        console.log("Symbol of Token        : ", tokenSymbol);
        let tokenOwner = await contract.methods.owner().call();
        console.log("Onwer Address of Token : ", tokenOwner);
        let contractBalance = await contract.methods.contractBalance().call();
        console.log("Contract Balance is    : ", contractBalance);
        let maxSupply = await contract.methods._maxSupply().call();
        console.log("Max Supply of Token is : ", maxSupply);
        let nftPrice = await contract.methods.getNFTPrice().call();
        nftPrice = web3.utils.fromWei(nftPrice, 'ether');
        console.log("Price of Token is      : ", nftPrice+' Ether');
        let lastToken = await contract.methods.lastTokenID().call();
        console.log("ID of Last Token is    : ", lastToken);
    }
    catch(error){
        console.log(error);
    }
}
readContractAsync()