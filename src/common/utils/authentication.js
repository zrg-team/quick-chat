import store from 'store'
import sha512 from 'crypto-js/sha512'
import sha256 from 'crypto-js/sha256'
import firebase from './firebase'
import { ACTION_CODE_SETTING } from '../models'
import { cryptMe, getMe } from './cryptography'
import storeAccessible from './storeAccessible'
import { setUserApproveHash, setUserApproveID } from '../actions/session'
import { setUserSessionSecurity, setUserSessionKey } from '../actions/common'
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
    const proveMeHash = sha256(proveMe).toString()
    storeAccessible.dispatch(setUserApproveHash(proveMeHash))
    const result = await firebase.auth.signInWithEmailAndPassword(email, proveMe)
    if (firebase.auth.currentUser && firebase.auth.currentUser.emailVerified) {
      return result
    }
    throw new Error('LOGIN_FAIL')
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

export async function updatePublicKey (user, authentication) {
  const state = storeAccessible.getState()
  const approveHash = state.session.approveHash
  // FIXME: hashed on client or server
  const generateSessionID = firebase
    .functions
    .httpsCallable('generateSessionID')
  const approveRequest = await generateSessionID()
  const { data } = approveRequest
  if (!data.approveID || !`${data.approveID}`.trim()) {
    throw new Error('MISSING_APPROVE_ID')
  }
  const loginTime = new Date(firebase.auth.currentUser.metadata.lastSignInTime).getTime()
  // CLIENT GENERATE
  const approveID = sha512(`${data.approveID}.${approveHash}`).toString()
  storeAccessible.dispatch(setUserApproveID(approveID))
  storeAccessible.dispatch(setUserSessionSecurity(cryptMe(approveID, `${loginTime}`)))
  storeAccessible.dispatch(setUserSessionKey(data.sessionKey))
  const ec = new EC('curve25519')
  const key = ec.keyFromPrivate(approveID)
  const publicKey = key.getPublic(false, 'hex')
  storeAccessible.dispatch(setUserApproveHash(null))
  return setUserPublicKey(user, publicKey)
}

export function validateSessionKey (user) {
  const state = storeAccessible.getState()
  const sessionKey = state.common.sessionKey
  return !user.sessionKey || !sessionKey || user.sessionKey === sessionKey
}

export async function shouldGenerateApproveID (user, authentication) {
  const state = storeAccessible.getState()
  const approveID = state.session.approveID
  const sessionSecurity = state.common.sessionSecurity
  if (approveID || sessionSecurity) {
    return false
  }
  const loginTime = new Date(firebase.auth.currentUser.metadata.lastSignInTime).getTime()
  const approveHash = state.session.approveHash
  const generateSessionID = firebase
    .functions
    .httpsCallable('generateSessionID')
  const approveRequest = await generateSessionID()
  const { data } = approveRequest
  const newApproveID = sha512(`${data.approveID}.${approveHash}`).toString()
  const newSessionSecurity = cryptMe(newApproveID, `${loginTime}`)
  storeAccessible.dispatch(setUserApproveID(newApproveID))
  storeAccessible.dispatch(setUserSessionSecurity(newSessionSecurity))
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

export function shouldUnlock () {
  try {
    const state = storeAccessible.getState()
    const sessionSecurity = state.common.sessionSecurity
    const approveID = state.session.approveID
    if (approveID) {
      return true
    }
    const auth = firebase.auth.currentUser
    if (!auth) {
      return signOut()
    }
    const loginTime = new Date(auth.metadata.lastSignInTime).getTime()
    const key = getMe(sessionSecurity, `${loginTime}`)
    if (!key) {
      return signOut()
    }
    storeAccessible.dispatch(setUserApproveID(key))
    return key
  } catch (err) {
    signOut()
  }
}
