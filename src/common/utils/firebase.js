import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/messaging'
import 'firebase/database'
import 'firebase/storage'
import { FIREBASE_CONFIG } from '../models'

const settings = {
  timestampsInSnapshots: true
}

firebase.initializeApp(FIREBASE_CONFIG)

const messaging = firebase.messaging()

const firestore = firebase.firestore()
const functions = firebase.functions()
const realtime = firebase.database()
const storage = firebase.storage()
firestore.settings(settings)

export default {
  auth: firebase.auth(),
  db: firestore,
  realtime,
  functions,
  messaging,
  storage
}
