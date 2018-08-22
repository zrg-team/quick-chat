import firebase from './firebase'
import store from 'store'
import { ACTION_CODE_SETTING } from '../models'

export const createUserByEmail = async (email, password) => {
  const result = await firebase.auth.createUserWithEmailAndPassword(email, password)
  firebase.auth.currentUser.sendEmailVerification()
  return result
}

export const signInByEmail = async (email, password) => {
  const result = await firebase.auth.signInWithEmailAndPassword(email, password)
  if (firebase.auth.currentUser && firebase.auth.currentUser.emailVerified) {
    return result
  }
  return false
}

export const signOut = () => {
  firebase.auth.signOut()
}

export function authenticationEmail (email) {
  return firebase.auth.sendSignInLinkToEmail(email, ACTION_CODE_SETTING)
    .then(() => {
      store.set('authenticationMail', email)
      return email
    })
}
