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
    .where('time', '>', offset)
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
  const time = firebaseApp.firestore.Timestamp.now()
  const newRef = firebase.db.collection(`rooms/${room.id}/messages`).doc()
  return newRef.set({
    ...data,
    time: time.toMillis()
  }).then(response => {
    // return updateRooms(user, room, data.message)
    return true
  })
}

export const readed = async room => {
  try {
    const readedFunc = firebase
      .functions
      .httpsCallable('readed')
    const results = await readedFunc({
      room
    })
    console.log('results', results)
    return results
  } catch (err) {
    console.log('err', err)
  }
}

export const buzzMessage = async (user, room, unread = 1) => {
  try {
    const buzzFunc = firebase
      .functions
      .httpsCallable('buzz')
    const results = await buzzFunc({
      room: room.id,
      count: unread
    })
    console.log('buzzMessage', results)
    return true
  } catch (err) {
    console.log('err', err)
    return false
  }
}
