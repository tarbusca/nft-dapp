const fs = require('fs');
const jsonFile = "./contractabi.json";
const jsonObj = JSON.parse(fs.readFileSync(jsonFile));
const contractABI = jsonObj.abi; 
const contractAddress = jsonObj.contractAddress;

module.exports = contractABI;
