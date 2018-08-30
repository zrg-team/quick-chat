const cryptoJS = require('crypto-js')

export function getMe (data, shared) {
  const bytes = cryptoJS.AES.decrypt(`${data}`, `${shared}`)
  return bytes.toString(cryptoJS.enc.Utf8)
}

export function cryptMe (data, shared) {
  return cryptoJS.AES.encrypt(`${data}`, `${shared}`).toString()
}
