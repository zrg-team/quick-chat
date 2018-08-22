import firebaseApp from 'firebase/app'
import firebase from '../../common/utils/firebase'

export const createRoom = async (user, { uid }, message = 'Chat me !') => {
  const time = firebaseApp.firestore.FieldValue.serverTimestamp()
  const room = await firebase.db
    .collection(`rooms`)
    .add({
      guest: uid,
      user: user.uid,
      notification: 0,
      time
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
