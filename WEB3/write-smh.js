const Web3 = require("web3");
const Tx = require('ethereumjs-tx').Transaction;

const rpcURL = "HTTP://127.0.0.1:7545";
const web3 = new Web3(rpcURL);

const senderAccount = "0xeDa305261918669540b973BF117D6942bfFe7d84";
const pvtKey = "47d984abf17dc0ac48466b7d0ae920242ce826b167e676f43d18e20a94f74ecd";
const senderPrivateKey = Buffer.from(pvtKey, 'hex');

const recipientAccount = "0x33CE18b4A7d3a50D860C003a14a0cFB57EA2b271";

//const abi = require('./abi.json');
//const contractAddress = "0x4cbf00331f4F10C13Df7064ade46d1D3cB663c21";
//const contract = new web3.eth.Contract(abi, contractAddress);

const writeContract = async () => {
    
        try {
            
            const txNonce = await web3.eth.getTransactionCount(senderAccount);

        // Build a transaction object
        const txObject = {
            nonce: web3.utils.toHex(txNonce),
            to: recipientAccount,
            value: web3.utils.toHex(web3.utils.toWei('5', 'ether')),
            gasLimit: web3.utils.toHex(21000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
        }

        // Sign the transaction
        const tx = new Tx(txObject, { 'chain': 'development' });
        tx.sign(senderPrivateKey);

        // Broadcast the transaction
        const serializedTx = tx.serialize();
        const raw = '0x' + serializedTx.toString('hex');
        const response = await web3.eth.sendSignedTransaction(raw);
        console.log('Transaction Hash: ', response.transactionHash);
        } catch (e) {
            console.log('Error: ', e);
        }
    }
    
    writeContract();
