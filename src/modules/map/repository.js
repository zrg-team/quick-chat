import storeAccessible from '../../common/utils/storeAccessible'
import { MODULE_NAME as MODULE_MAP, MESSAGE_TYPES } from './models'

export const updateLocation = async (room, user, location, message = '') => {
  if (!room) {
    return false
  }
  const { locations } = storeAccessible.getModuleState(MODULE_MAP)
  const time = new Date().toISOString()
  const arrLocations = Object.keys(locations)
  if (arrLocations.length >= 128) {
    await Promise.all(arrLocations.map(peer => {
      return room.sendTo(peer, JSON.stringify({
        // _id: user.uid,
        // uid: user.uid,
        location,
        updated: time,
        // user,
        data: {
          message
        },
        type: MESSAGE_TYPES.handsake
      }))
    }))
    return true
  }
  await room.broadcast(JSON.stringify({
    // _id: user.uid,
    // uid: user.uid,
    location,
    updated: time,
    // user,
    data: {
      message
    },
    type: MESSAGE_TYPES.broadcast
  }))
  return true
}

export const watchLocations = async (room, messageProcess, joinedProcess, leftProcess) => {
  if (!room) {
    return false
  }
  room.on('peer joined', (peer) => {
    console.log('Peer joined the room', peer)
    joinedProcess && joinedProcess(peer)
  })

  room.on('peer left', (peer) => {
    console.log('Peer left...', peer)
    leftProcess && leftProcess(peer)
  })
  room.on('message', (message) => {
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
