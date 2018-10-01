import storeAccessible from '../../common/utils/storeAccessible'
import { MODULE_NAME as MODULE_MAP, MESSAGE_TYPES } from './models'
import ipfsBridge from '../../common/utils/ipfs'

export const updateLocation = async (user, location, message = '') => {
  const { ipfs, topic } = await ipfsBridge.getIpfs()
  if (!ipfs || !topic) {
    return false
  }

  const time = new Date().toISOString()
  return ipfs.publish(topic, Buffer.from(JSON.stringify({
    location,
    updated: time,
    // user,
    data: {
      message
    },
    type: MESSAGE_TYPES.broadcast
  }))).then((result) => {
    console.log('result', result)
    return true
  })
}

export const watchLocations = async (messageProcess) => {
  const { ipfs, topic } = await ipfsBridge.getIpfs()
  if (!ipfs || !topic) {
    return false
  }
  ipfsBridge.setOnMessage((message) => {
    console.log('Peer message...', message)
    messageProcess({ message })
  })
}

export const checkAround = async (data) => {
  if (data.type === MESSAGE_TYPES.handsake) {
    return true
  }
  const { locations, location } = storeAccessible.getModuleState(MODULE_MAP)
  if (!location || Object.keys(locations).length > 128) {
    return false
  }
  const peerLocation = data.location
  const distance = Math.sqrt(Math.pow(peerLocation.lng - location.lng, 2)) + Math.sqrt(Math.pow(peerLocation.lat - location.lat, 2))
  return distance < 100
}

export const hansakePeer = async (peer, room, user) => {
  const { locations, location } = storeAccessible.getModuleState(MODULE_MAP)
  if (locations[peer]) {
    return false
  }
  const time = new Date().toISOString()
  return room.sendTo(peer, JSON.stringify({
    // _id: user.uid,
    // uid: user.uid,
    location,
    updated: time,
    // user,
    data: {},
    type: MESSAGE_TYPES.handsake
  }))
}
