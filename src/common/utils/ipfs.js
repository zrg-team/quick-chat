const IPFS = require('ipfs')
const ipfsOptions = {
  EXPERIMENTAL: {
    pubsub: true
  },
  repo: '/ipfs.only/chatme/browser/ipfs/0.9.6',
  start: true,
  config: {
    Addresses: {
      Swarm: [
        '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star'
      ]
    }
  }
}
const DEFAULT_TOPIC = 'chatme.locations.ipfs.room.{{$1}}'
class IpfsBridge {
  constructor () {
    this.topic = DEFAULT_TOPIC.replace('{{$1}}', 'all')
    this.instance = null
    this.listener = null
    this.timeout = null
    this.onMessage = null
  }
  // Get IPFS instance
  getIpfs () {
    if (this.instance) {
      return {
        ipfs: this.instance,
        topic: this.topic
      }
    }
    return this.listener || null
  }
  // Create IPFS instance
  initIPFS () {
    const ipfs = new IPFS(ipfsOptions)
    this.listener = new Promise((resolve, reject) => {
      ipfs.on('error', (e) => {
        reject(new Error(e))
      })
      ipfs.on('ready', async (event) => {
        const result = await this.subscribe()
        if (result) {
          resolve({ ipfs, topic: this.topic })
        }
        reject(new Error('CAN_NOT_SUBSCRIBE'))
      })
      this.timeout = setTimeout(() => {
        reject(new Error('TIME_OUT'))
      }, 30000)
    })
    .catch((err) => {
      console.error('IPFS', err)
      if (this.listener) {
        this.listener = null
      }
      clearTimeout(this.timeout)
      this.timeout = null
      return false
    })
    return this.listener
  }
  setOnMessage (callback) {
    if (typeof callback === 'function') {
      this.onMessage = callback
    }
  }
  async subscriptions () {
    try {
      const result = await this.instance.pubsub.ls()
      return result
    } catch (err) {
      console.err('subscriptions', err)
      return false
    }
  }
  async peers () {
    try {
      const result = await this.instance.pubsub.peers(this.topic)
      return result
    } catch (err) {
      console.err('peers', err)
      return false
    }
  }
  async unsubscribe () {
    try {
      if (this.instance) {
        await this.instance.pubsub.unsubscribe(this.topic, () => {})
        return true
      }
      return false
    } catch (err) {
      console.error('unsubscribe', err)
      return false
    }
  }
  async subscribe () {
    try {
      const result = await this.instance.pubsub.subscribe(this.topic, (data) => {
        this.onMessage && this.onMessage(data)
      })
      if (result) {
        return result
      }
    } catch (err) {
      console.error('subscribe', err)
      return false
    }
  }
}

export default new IpfsBridge()
