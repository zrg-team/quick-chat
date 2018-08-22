import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { FIREBASE_CONFIG } from '../models'

const settings = {
  timestampsInSnapshots: true
}

firebase.initializeApp(FIREBASE_CONFIG)
const firestore = firebase.firestore()
firestore.settings(settings)
export default {
  auth: firebase.auth(),
  db: firestore
}
