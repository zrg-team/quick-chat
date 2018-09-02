import firebase from './firebase'
import storeAccessible from './storeAccessible'
import { setUserMessageToken } from '../actions/common'

let registed = false
export const requestMessageToken = (user) => {
  const { common } = storeAccessible.getState()
  if (!user ||
    !user.uid ||
    common.messageToken
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
  // if (registed) {
  //   return firebase.messaging
  //   .requestPermission()
  //   .then(function () {
  //     console.log('Notification permission granted.')
  //     // get the token in the form of promise
  //     return firebase.messaging.getToken()
  //   })
  //   .then(function (messageToken) {
  //     // set token
  //     storeAccessible.dispatch(setUserMessageToken(messageToken))
  //     firebase.db
  //       .collection('users')
  //       .doc(`${user.uid}`)
  //       .update({
  //         messageToken
  //       })
  //     console.log('messageToken', messageToken)
  //     return messageToken
  //   })
  //   .catch(function (err) {
  //     console.log('Unable to get permission to notify.', err)
  //     return err
  //   })
  // }
  // return navigator.serviceWorker
  //   .register(`${process.env.PUBLIC_URL}/firebase-messaging-sw.js`)
  //   .then(async (registration) => {
  //     await firebase.messaging.useServiceWorker(registration)
  //     registed = true
  //     // Request permission and get token.....
  //     return !common.messageToken ? firebase.messaging
  //       .requestPermission()
  //       .then(function () {
  //         console.log('Notification permission granted.')
  //         // get the token in the form of promise
  //         return firebase.messaging.getToken()
  //       })
  //       .then(function (messageToken) {
  //         // set token
  //         storeAccessible.dispatch(setUserMessageToken(messageToken))
  //         firebase.db
  //           .collection('users')
  //           .doc(`${user.uid}`)
  //           .update({
  //             messageToken
  //           })
  //         console.log('messageToken', messageToken)
  //         return messageToken
  //       })
  //       .catch(function (err) {
  //         console.log('Unable to get permission to notify.', err)
  //         return err
  //       }) : true
  //   })
}
