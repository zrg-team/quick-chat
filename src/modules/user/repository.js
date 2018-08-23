import firebaseApp from 'firebase/app'
import firebase from '../../common/utils/firebase'

export async function getUser (user) {
  try {
    const result = await firebase.db.collection('users').doc(user.uid).get()
    if (result.exists) {
      return { ...result.data(), uid: user.uid }
    }
    return undefined
  } catch (err) {
    console.log('getAuthentication err', err)
    return undefined
  }
}

export const getUserRooms = async (user, listener = undefined) => {
  if (!user) {
    return undefined
  }
  let instance = null
  const ref = firebase.db
    .collection(`users/${user.uid}/rooms`)
    .where('enable', '==', true)
  if (listener) {
    instance = ref.onSnapshot((data) => {
      listener({
        data,
        user
      })
    })
  }
  const result = await ref
    .orderBy('time', 'desc')
    .get()
  return {
    data: result || [],
    instance
  }
}

export const updateUserRooms = async (user, room, message) => {
  if (!user) {
    return undefined
  }
  return firebase.db
    .collection(`users/${user.uid}/rooms`)
    .doc(`${room.udid}`)
    .update({
      message
    })
}

export const addUserRooms = async (user, data) => {
  if (!user) {
    return undefined
  }
  const time = firebaseApp.firestore.FieldValue.serverTimestamp()
  return firebase.db
    .collection('users')
    .doc(`${user.uid}`)
    .collection('rooms')
    .add({
      ...data,
      time
    })
}

export const clearNotification = async (user, notifications) => {
  const batch = firebase.db.batch()
  notifications.forEarch(item => {
    const ref = firebase.db
      .collection('notifications')
      .doc(`${user.uid}`)
      .collection('messages')
      .doc(`${notifications.uid}`)
    batch.update(ref, { enable: false })
  })
  return batch.commit()
}
