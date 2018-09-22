import web3 from './web3'
const Abi = require('ethereumjs-abi')

export function getDataSmartContract ({ functionName, typeParams, params }) {
  return Abi
    .methodID(functionName, typeParams)
    .toString('hex') + Abi.rawEncode(typeParams, params)
    .toString('hex')
}

export function sendTransaction (data) {
  if (!web3 || !web3.instance || !web3.injected) {
    const url = `https://www.myetherwallet.com/?to=${data.to}&value=${web3.instance.toWei(data.value, 'ether')}&gasLimit=300000&#send-transaction`
    window.open(url, '_blank')
    return false
  }
  const defaultAccount = web3.instance.eth.accounts[0]
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
