import firebaseApp from 'firebase/app'
import firebase from '../../common/utils/firebase'

export const createRoom = async (user, { uid, publicKey }, message = 'Chat me !') => {
  const time = firebaseApp.firestore.FieldValue.serverTimestamp()
  const room = await firebase.db
    .collection(`rooms`)
    .add({
      time,
      last: time,
      guest: uid,
      user: user.uid,
      notification: 0,
      guestPublic: publicKey,
      userPublic: user.publicKey
    })
  return { room }
}

export const createNotification = (friend, user, room, message) => {
  return firebase.db
    .collection(`notifications`)
    .doc(`${friend.uid}`)
    .collection('messages')
    .add({
      message,
      from: user.uid,
      notification: 0,
      ref: room.uid,
      count: 1
    })
}

export const markReaded = async (room) => {
  const time = firebaseApp.firestore.FieldValue.serverTimestamp()
  const newRef = firebase.db.collection(`rooms`).doc(`${room.id}`)
  return newRef.update({
    last: time,
    unread: 0
  }).then(response => {
    // return updateRooms(user, room, data.message)
    return true
  })
}
