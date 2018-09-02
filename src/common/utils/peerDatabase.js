import firebase from './firebase'
const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')

const ipfsOptions = {
  EXPERIMENTAL: {
    pubsub: true
  },
  repo: '/orbitdb/chatme/browser/ipfs/0.9.2',
  start: true,
  config: {
    Addresses: {
      Swarm: [
        // Use IPFS dev signal server
        // '/dns4/star-signal.cloud.ipfs.team/wss/p2p-webrtc-star',
        '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star'
        // Use local signal server
        // '/ip4/0.0.0.0/tcp/9090/wss/p2p-webrtc-star',
      ]
    }
  }
}
export let peerInstance = null
export let ipfs = null
let timeout = null
export async function initPeer () {
  if (peerInstance) {
    await peerInstance.disconnect()
  }
  if (ipfs) {
    await ipfs.stop()
  }
  // Create IPFS instance
  ipfs = new IPFS(ipfsOptions)
  return new Promise((resolve, reject) => {
    ipfs.on('error', (e) => {
      console.error(e)
      resolve(null)
    })
    ipfs.on('ready', async () => {
      try {
        const orbitdb = new OrbitDB(ipfs)
        // // Create / Open a database
        const db = await orbitdb.open('chatme.users.locations.0.1.0', {
          // If database doesn't exist, create it
          sync: true,
          create: true,
          // overwrite: true,
          // Load only the local version of the database,
          // don't load the latest from the network yet
          localOnly: false,
          type: 'feed',
          // If "Public" flag is set, allow anyone to write to the database,
          // otherwise only the creator of the database can write
          write: ['*']
        })
        timeout = setTimeout(() => {
          console.log('PEER_DATABASE_TIMEOUT')
          clearTimeout(timeout)
          timeout = null
          peerInstance = null
          resolve(null)
        }, 30000)
        // Load locally persisted database
        await load(db, resolve)
      } catch (err) {
        clearTimeout(timeout)
        timeout = null
        resolve(null)
      }
    })
  })
}

const load = async (db, resolve) => {
  db.events.on('ready', () => console.log('db ready'))
  // When database gets replicated with a peer, display results
  db.events.on('replicated', () => console.log('db replicated'))
  db.events.on('write', () => console.log('db write'))

  db.events.on('replicate.progress', () => console.log('db replicate.progress'))

  // Hook up to the load progress event and render the progress
  let maxTotal = 0
  db.events.on('load.progress', (address, hash, entry, progress, total) => {
    maxTotal = Math.max.apply(null, [progress, maxTotal, progress, 0])
    total = Math.max.apply(null, [progress, maxTotal, total, 0])
    console.log(`Loading database... ${maxTotal} / ${total}`)
  })

  db.events.on('ready', () => {
    // Set the status text
    setTimeout(() => {
      clearTimeout(timeout)
      timeout = null
      peerInstance = db
      resolve(true)
    }, 100)
  })

  // Load locally persisted database
  await db.load()
}
