import firebase from './firebase'
import storeAccessible from './storeAccessible'
import { setUserMessageToken } from '../actions/common'

export const requestMessageToken = (user) => {
  const { common } = storeAccessible.getState()
  if (common.messageToken ||
    !user ||
    !user.uid
  ) {
    return true
  }
  return firebase.messaging
    .requestPermission()
    .then(function () {
      console.log('Notification permission granted.')
      // get the token in the form of promise
      return firebase.messaging.getToken()
    })
    .then(function (messageToken) {
      // set token
      storeAccessible.dispatch(setUserMessageToken(messageToken))
      firebase.db
        .collection('users')
        .doc(`${user.uid}`)
        .update({
          messageToken
        })
      return messageToken
    })
    .catch(function (err) {
      console.log('Unable to get permission to notify.', err)
      return err
    })
}
