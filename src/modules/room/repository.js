import firebaseApp from 'firebase/app'
import firebase from '../../common/utils/firebase'

export const createRoom = async (data) => {
  const time = firebaseApp.firestore.Timestamp.now()
  const room = await firebase.db
    .collection(`rooms`)
    .add({
      time: time.toMillis(),
      latest: time.toMillis(),
      ...data
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
