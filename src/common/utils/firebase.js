import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/messaging'
import { FIREBASE_CONFIG } from '../models'

const settings = {
  timestampsInSnapshots: true
}

firebase.initializeApp(FIREBASE_CONFIG)

const messaging = firebase.messaging()

const firestore = firebase.firestore()
const functions = firebase.functions()
firestore.settings(settings)

export default {
  auth: firebase.auth(),
  db: firestore,
  functions,
  messaging
}
