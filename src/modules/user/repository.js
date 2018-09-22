import firebaseApp from 'firebase/app'
import firebase from '../../common/utils/firebase'

export async function getUser (user) {
  try {
    const result = await firebase.db.collection('users').doc(user.uid).get()
    if (result.exists) {
      const data = result.data()
      // if (!data.publicKey) {
        // const makeMeStrong = firebase
        //   .functions
        //   .httpsCallable('makeMeStrong')
        // const keys = await makeMeStrong({ pass: 'hello' })
        // console.log('keys', keys)
        // Generate keys
        // const ec = new EC('curve25519')
        // const key = ec.keyFromPrivate(`${me}.`)
        // console.log('key1.getPublic()', key1.getPublic(false, 'hex'))
        // // 3a1754b57f5b66eaca28bf5d006f93eb287ba3f9535827ce318170c5394ffdc4
        // const public2 = ec.keyFromPublic('3a1754b57f5b66eaca28bf5d006f93eb287ba3f9535827ce318170c5394ffdc4', 'hex')
        // console.log('public1', public2)
        // var shared1 = key1.derive(key2.getPublic())
        // var shared2 = key2.derive(public2.getPublic())

        // console.log('Both shared secrets are BN instances')
        // console.log(shared1.toString(16))
        // console.log(shared2.toString(16))
      //   return false
      // }
      return { ...data, uid: user.uid }
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
  if (!user || !data.id) {
    return undefined
  }
  const time = firebaseApp.firestore.Timestamp.now()
  return firebase.db
    .collection('users')
    .doc(`${user.uid}`)
    .collection('rooms')
    .doc(`${data.id}`)
    .set({
      ...data,
      time: time.toMillis()
    }).then(() => {
      return true
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

export const setUserPublicKey = async (user, publicKey) => {
  return firebase.db
    .collection('users')
    .doc(`${user.uid}`)
    .update({
      publicKey
    }).then(response => {
      return { publicKey, response }
    })
}
