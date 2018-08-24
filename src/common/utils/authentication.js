import store from 'store'
import sha256 from 'crypto-js/sha256'
import firebase from './firebase'
import { ACTION_CODE_SETTING } from '../models'
import storeAccessible from './storeAccessible'
import { setUserNeed } from '../actions/common'
import { setUserPublicKey } from '../../modules/user/repository'

const EC = require('elliptic').ec

export const createUserByEmail = async (email, iHere) => {
  const result = await firebase.auth.createUserWithEmailAndPassword(email, iHere)
  // const ec = new EC('curve25519')
  // const key = ec.keyFromPrivate(`${iHere}.${firebase.auth.currentUser.uid}`)
  // const publicKey = key.getPublic(false, 'hex')
  firebase.auth.currentUser.sendEmailVerification()
  return result
}

export const signInByEmail = async (email, iHere) => {
  const result = await firebase.auth.signInWithEmailAndPassword(email, iHere)
  if (firebase.auth.currentUser && firebase.auth.currentUser.emailVerified) {
    storeAccessible.dispatch(setUserNeed(sha256(`${firebase.auth.currentUser.email}.${firebase.auth.currentUser.uid}.${iHere}`).toString()))
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

export function updatePublicKey (user) {
  const state = storeAccessible.getState()
  const needed = state.common.needed
  const ec = new EC('curve25519')
  const key = ec.keyFromPrivate(needed)
  const publicKey = key.getPublic(false, 'hex')
  return setUserPublicKey(user, publicKey)
}
