import { ipfs, peerInstance } from '../../common/utils/peerDatabase'

export const updateLocation = async (user, location, lastHash) => {
  if (!peerInstance) {
    return false
  }
  const time = new Date().toISOString()
  if (user.uid) {
    try {
      await peerInstance.del(user.uid)
    } catch (err) {
      console.log('NO_DELETE')
    }
  }
  const hash = await peerInstance.put({
    _id: user.uid,
    uid: user.uid,
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
  // peerInstance.events.on('replicated', (evt) => {
  //   console.log('db replicated', evt)
  // })
  peerInstance.events.on('replicated', async (value) => {
    const networkPeers = await ipfs.swarm.peers()
    // const databasePeers = await ipfs.pubsub.peers(peerInstance.address.toString())
    // const data = peerInstance.iterator({ limit: 100 }).collect()
    const data = await peerInstance
      .query(() => true)
    syncProcess({ networkPeers, data })
  })
}
