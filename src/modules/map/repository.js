export const updateLocation = async (room, user, location) => {
  if (!room) {
    return false
  }
  const time = new Date().toISOString()
  await room.broadcast(JSON.stringify({
    _id: user.uid,
    uid: user.uid,
    location,
    updated: time,
    user
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
