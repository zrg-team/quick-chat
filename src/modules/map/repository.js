import { ipfs, peerInstance } from '../../common/utils/peerDatabase'

export const updateLocation = async (user, location, lastHash) => {
  if (!peerInstance) {
    return false
  }
  const time = new Date().toISOString()
  if (lastHash) {
    await peerInstance.remove(lastHash)
  }
  const hash = await peerInstance.add({
    location,
    updated: time,
    user
  })
  return hash
}

export const watchLocations = async (syncProcess) => {
  if (!peerInstance) {
    return false
  }
  // When we update the database, display result
  // peerInstance.events.on('write', async (value) => {
  //   console.log('value', value, peerInstance.address.toString())
  //   const networkPeers = await ipfs.swarm.peers()
  //   const databasePeers = await ipfs.pubsub.peers(peerInstance.address.toString())
  //   console.log('networkPeers', networkPeers)
  //   console.log('databasePeers', databasePeers)
  // })
  peerInstance.events.on('replicated', async (value) => {
    const networkPeers = await ipfs.swarm.peers()
    const databasePeers = await ipfs.pubsub.peers(peerInstance.address.toString())
    const data = peerInstance.iterator({ limit: 100 }).collect()
    syncProcess({ networkPeers, databasePeers, data })
  })
}
