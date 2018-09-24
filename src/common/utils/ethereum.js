import web3 from './web3'
const Abi = require('ethereumjs-abi')

export function getDataSmartContract ({ functionName, typeParams, params }) {
  return Abi
    .methodID(functionName, typeParams)
    .toString('hex') + Abi.rawEncode(typeParams, params)
    .toString('hex')
}

export function getAccount () {
  return new Promise((resolve, reject) => {
    web3.instance.eth.getAccounts(function (err, accounts) {
      if (err != null) {
        resolve({ error: true })
      } else if (accounts.length === 0) {
        resolve({ error: false, message: 'Please login your MetaMask !' })
      } else {
        resolve({ error: false, address: web3.instance.eth.accounts[0] })
      }
    })
  })
}

export function sendTransaction (defaultAccount, data) {
  console.log('defaultAccount', defaultAccount)
  if (!web3 || !web3.instance || !web3.injected || !defaultAccount) {
    const url = `https://www.myetherwallet.com/?to=${data.to}&value=${web3.instance.toWei(data.value, 'ether')}&gasLimit=300000&#send-transaction`
    window.open(url, '_blank')
    return false
  }
  return new Promise((resolve, reject) => {
    web3.instance.eth.sendTransaction({
      to: data.to,
      from: defaultAccount,
      value: web3.instance.toWei(data.value, 'ether')
    }, function (err, transactionHash) {
      if (err) {
        reject(err)
      } else {
        resolve(transactionHash)
      }
    })
  })
}

export function getTransactionLink (txID) {
  // FIXME: all config for ropsten, rinkeby, or mainnet
  return `https://ropsten.etherscan.io/tx/${txID}`
}
