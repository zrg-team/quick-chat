import firebase from '../../common/utils/firebase'

export const getProfile = async (userId) => {
  if (!userId) {
    return []
  }
  const result = await firebase.db
    .collection('users').doc(`${userId}`).get()
  return {
    data: result.data()
  }
}
export const updateProfile = async (userId, userInfo) => {
  const newRef = firebase.db.collection('users').doc(`${userId}`)
  return newRef.set({
    ...userInfo
  }).then(response => {
    return true
  })
}
