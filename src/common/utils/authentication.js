import store from 'store'
import sha512 from 'crypto-js/sha512'
import firebase from './firebase'
import { ACTION_CODE_SETTING } from '../models'
import { cryptMe, getMe } from './cryptography'
import storeAccessible from './storeAccessible'
import { setUserApproveHash } from '../actions/session'
import { setUserApproveID, setUserSessionSecurity, setUserSessionKey } from '../actions/common'
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

export const signInByEmail = async (email, proveMe) => {
  try {
    const proveMeHash = sha512(proveMe).toString()
    storeAccessible.dispatch(setUserApproveHash(proveMeHash))
    const result = await firebase.auth.signInWithEmailAndPassword(email, proveMe)
    if (firebase.auth.currentUser && firebase.auth.currentUser.emailVerified) {
      return result
    }
    return false
  } catch (err) {
    return false
  }
}

export const signOut = () => {
  firebase.auth.signOut()
  storeAccessible.dispatch(setUserApproveID(null))
  storeAccessible.dispatch(setUserSessionSecurity(null))
  storeAccessible.dispatch(setUserSessionKey(null))
  storeAccessible.clearPersistStore()
}

export function authenticationEmail (email) {
  return firebase.auth.sendSignInLinkToEmail(email, ACTION_CODE_SETTING)
    .then(() => {
      store.set('authenticationMail', email)
      return email
    })
}

export async function updatePublicKey (user) {
  const state = storeAccessible.getState()
  const approveHash = state.session.approveHash
  // FIXME: hashed on client or server
  const generateSessionID = firebase
    .functions
    .httpsCallable('generateSessionID')
  const approveRequest = await generateSessionID({
    clientSession: approveHash
  })
  const { data } = approveRequest
  storeAccessible.dispatch(setUserApproveID(data.approveID))
  storeAccessible.dispatch(setUserSessionSecurity(cryptMe(data.approveID, approveHash)))
  storeAccessible.dispatch(setUserSessionKey(data.sessionKey))
  if (!data.approveID || !`${data.approveID}`.trim()) {
    throw new Error('MISSING_APPROVE_ID')
  }
  const ec = new EC('curve25519')
  const key = ec.keyFromPrivate(data.approveID)
  const publicKey = key.getPublic(false, 'hex')
  storeAccessible.dispatch(setUserApproveHash(null))
  return setUserPublicKey(user, publicKey)
}

export function validateSessionKey (user) {
  const state = storeAccessible.getState()
  const sessionKey = state.common.sessionKey
  return !user.sessionKey || !sessionKey || user.sessionKey === sessionKey
}

export async function shouldGenerateApproveID (user) {
  const state = storeAccessible.getState()
  const approveID = state.common.approveID
  if (approveID) {
    return false
  }
  const approveHash = state.session.approveHash
  const generateSessionID = firebase
    .functions
    .httpsCallable('generateSessionID')
  const approveRequest = await generateSessionID({
    clientSession: approveHash
  })
  const { data } = approveRequest
  storeAccessible.dispatch(setUserApproveID(data.approveID))
  storeAccessible.dispatch(setUserSessionSecurity(cryptMe(data.approveID, approveHash)))
  storeAccessible.dispatch(setUserSessionKey(data.sessionKey))
  return true
}

export function validateSessionSecurity (proveMe) {
  try {
    const state = storeAccessible.getState()
    const sessionSecurity = state.common.sessionSecurity
    if (!sessionSecurity) {
      throw new Error('MISSING_PARAMS_FOR_APPROVE')
    }
    const proveMeHash = sha512(proveMe).toString()
    const result = getMe(sessionSecurity, proveMeHash)
    if (!result) {
      throw new Error('CAN_NOT_APPOVE')
    }
    storeAccessible.dispatch(setUserApproveID(result))
    return true
  } catch (err) {
    return false
  }
}
