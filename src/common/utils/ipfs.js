const IPFS = require('ipfs')
const Room = require('ipfs-pubsub-room')
const ipfsOptions = {
  EXPERIMENTAL: {
    pubsub: true
  },
  repo: '/ipfs.only/chatme/browser/ipfs/0.9.4',
  start: true,
  config: {
    Addresses: {
      Swarm: [
        '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star'
      ]
    }
  }
}
export async function initIPFS () {
  // Create IPFS instance
  let timeout = null
  const ipfs = new IPFS(ipfsOptions)
  return new Promise((resolve, reject) => {
    ipfs.on('error', (e) => {
      resolve(false)
    })
    ipfs.on('ready', async (event) => {
      try {
        const room = Room(ipfs, 'ipfs-pubsub.chatme.locations')
        room.on('subscribed', (peer) => {
          resolve({ room, ipfs })
        })
      } catch (err) {
        clearTimeout(timeout)
        timeout = null
        resolve(false)
      }
    })
    timeout = setTimeout(() => {
      clearTimeout(timeout)
      timeout = null
      resolve(false)
    }, 30000)
  })
}

export async function stopAll (ipfs, room) {
  if (ipfs) {
    ipfs.stop()
  }
  if (room) {
    room.leave()
  }
}
