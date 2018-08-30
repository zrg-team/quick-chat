import React, { Component } from 'react'
// import store from 'store'
import locate from '../utils/locate'
import web3 from '../utils/web3'
import firebase from '../utils/firebase'
import { loading } from '../middlewares/effects'
import storeAccessible from '../utils/storeAccessible'
import {
  signOut,
  shouldUnlock,
  updatePublicKey,
  validateSessionKey,
  shouldGenerateApproveID
} from '../utils/authentication'
import { getUser } from '../../modules/user/repository'
import { requestMessageToken } from '../utils/notifications'
import Notification from '../components/widgets/Notification'
import { setUserInformation, setNotification } from '../../modules/user/actions'
import MainPage from './MainPage'

export default class Root extends Component {
  constructor (props) {
    super(props)

    this.emailLink = false
    this.firstNotificationSync = true
    this.userListenerInstance = null
    this.notificationListenerInstance = null
    this.userListener = this.userListener.bind(this)
    this.notificationListener = this.notificationListener.bind(this)
    this.authenticationChange = this.authenticationChange.bind(this)
  }

  shouldComponentUpdate (nextProps) {
    return false
  }

  async componentDidMount () {
    try {
      await locate()
      await web3.init()
      // if (firebase.auth.isSignInWithEmailLink(window.location.href)) {
      //   let email = store.get('authenticationMail')
      //   if (!email) {
      //     email = window.prompt('Please provide your email for confirmation')
      //   }
      //   // The client SDK will parse the code from the link for you.
      //   firebase.auth.signInWithEmailLink(email, window.location.href)
      //     .then(async (result) => {
      //       // Clear email from storage.
      //       store.set('authenticationMail', null)
      //       this.emailLink = true
      //     })
      //     .catch(() => {
      //       store.set('authenticationMail', null)
      //       storeAccessible.dispatch(setUserInformation(null))
      //       this.emailLink = false
      //       signOut()
      //     })
      // }
      firebase.auth.onAuthStateChanged(this.authenticationChange)
    } catch (error) {
      console.log('Fatal Error. Cannot Initialize.', error)
    }
  }

  userListener (authUser) {
    if (this.userListenerInstance) {
      this.userListenerInstance()
    }
    this.userListenerInstance = firebase.db
      .collection('users')
      .doc(`${authUser.uid}`)
      .onSnapshot((snap) => {
        if (snap.data() && !validateSessionKey(snap.data())) {
          signOut()
          storeAccessible.dispatch(setUserInformation(null))
        }
      })
  }

  notificationListener (authUser) {
    if (this.notificationListenerInstance) {
      this.notificationListenerInstance()
    }
    this.notificationListenerInstance = firebase.db
      .collection('notifications')
      .doc(`${authUser.uid}`)
      .collection('messages')
      .where('enable', '==', true)
      .orderBy('time', 'desc')
      .limit(100)
      .onSnapshot((snap) => {
        const data = []
        snap.docs.forEach((ref) => {
          const item = ref.data()
          data.push({
            uid: ref.id,
            ...item
          })
          if (!this.firstNotificationSync) {
            Notification.info(`${item.fromEmail}: ${item.message}`)
          }
        })
        this.firstNotificationSync = false
        storeAccessible.dispatch(setNotification(data))
      })
  }

  async authenticationChange (authUser) {
    try {
      if (authUser) {
        const result = await loading(async () => {
          const user = await getUser(authUser)
          // We need a password again for generate publicKey
          if (user && !user.publicKey) {
            // Maybe case without password login
            // Modal.show(<PasswordModal />)
            const { publicKey } = await updatePublicKey(user)
            user.publicKey = publicKey
          } else if (user && !validateSessionKey(user)) {
            Notification.error('Your session key invalid. Maybe someone login to your account, please check !')
            throw new Error('INVALID_SESSION_KEY')
          } else if (user) {
            shouldGenerateApproveID(user).then(() => {
              shouldUnlock()
            })
          }
          requestMessageToken(user)
          return user
        })
        if (result/* && !this.emailLink */) {
          this.notificationListener(authUser)
          return storeAccessible.dispatch(setUserInformation(result))
        }
        // else if (result && this.emailLink) {
        //   storeAccessible.dispatch(setUserInformation(result))
        //   return setTimeout(() => {
        //     window.location.replace('/')
        //   }, 200)
        // } else if (!result && this.emailLink) {
        //   if (this.userListener) {
        //     this.userListener()
        //   }
        //   this.userListener = firebase.db
        //     .collection('users')
        //     .doc(`${authUser.uid}`)
        //     .onSnapshot((item) => {
        //       this.notificationListener(authUser)
        //       storeAccessible.dispatch(setUserInformation(item.data()))
        //       this.userListener()
        //     })
        //   return true
        // }
        signOut()
      }
      // Logout clear all
      if (this.notificationListenerInstance) {
        this.notificationListenerInstance()
      }
      storeAccessible.dispatch(setUserInformation(null))
    } catch (err) {
      console.log('err', err)
      signOut()
      // Logout clear all
      if (this.notificationListenerInstance) {
        this.notificationListenerInstance()
      }
      storeAccessible.dispatch(setUserInformation(null))
    }
  }

  render () {
    const { store, persistor, history } = this.props
    return (
      <MainPage
        store={store}
        history={history}
        persistor={persistor}
      />
    )
  }
}
