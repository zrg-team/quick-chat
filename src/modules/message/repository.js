import firebaseApp from 'firebase/app'
import firebase from '../../common/utils/firebase'
// import { updateRooms } from '../home/repository'

export const LIMIT_MESSAGE = 100
export const getMessages = async (room, offset, listener = undefined) => {
  if (!room) {
    return []
  }
  let instance = null
  const ref = firebase.db
    .collection(`rooms/${room.id}/messages`)
    .where('time', '>', new Date(offset * 1000))
    .limit(LIMIT_MESSAGE)
  if (listener) {
    instance = ref.onSnapshot((data) => {
      listener({
        data,
        room
      })
    })
  }
  const result = await ref
    .orderBy('time', 'desc')
    .get()
  return {
    data: result,
    instance
  }
}

export const sendMessage = async (user, room, data) => {
  const time = firebaseApp.firestore.FieldValue.serverTimestamp()
  const newRef = firebase.db.collection(`rooms/${room.id}/messages`).doc()
  return newRef.set({
    ...data,
    time
  }).then(response => {
    // return updateRooms(user, room, data.message)
    return true
  })
}
