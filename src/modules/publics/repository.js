import firebaseApp from 'firebase/app'
import firebase from '../../common/utils/firebase'

export const getMessages = (listener = undefined) => {
  const ref = firebase.realtime
    .ref('publics/hcm')
    .orderByChild('time')
    .limitToLast(256)
  return new Promise((resolve, reject) => {
    try {
      ref.on('child_added', function (data) {
        listener(data)
      })
      ref
      .on('value', function (snap) {
        resolve({data: snap, instance: ref})
      })
    } catch (err) {
      reject(err)
    }
  })
}

export const pushMessage = (message) => {
  const time = firebaseApp.firestore.Timestamp.now()
  const ref = firebase.realtime
    .ref('publics/hcm')
  return ref.push({
    ...message,
    time: time.toMillis()
  })
}
