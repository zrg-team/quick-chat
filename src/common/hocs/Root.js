import React, { Component } from 'react'
import store from 'store'
import locate from '../utils/locate'
import web3 from '../utils/web3'
import firebase from '../utils/firebase'
import { loading } from '../middlewares/effects'
import storeAccessible from '../utils/storeAccessible'
import { signOut } from '../utils/authentication'
import { getUser } from '../../modules/user/repository'
import { setUserInformation, setNotification } from '../../modules/user/actions'
import Main from './Main'

export default class Root extends Component {
  constructor (props) {
    super(props)
    this.userListener = null
    this.emailLink = false
    this.notificationListenerInstance = null
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
      if (firebase.auth.isSignInWithEmailLink(window.location.href)) {
        let email = store.get('authenticationMail')
        if (!email) {
          email = window.prompt('Please provide your email for confirmation')
        }
        // The client SDK will parse the code from the link for you.
        firebase.auth.signInWithEmailLink(email, window.location.href)
          .then(async (result) => {
            // Clear email from storage.
            store.set('authenticationMail', null)
            this.emailLink = true
          })
          .catch(() => {
            store.set('authenticationMail', null)
            storeAccessible.dispatch(setUserInformation(null))
            this.emailLink = false
            signOut()
          })
      }
      firebase.auth.onAuthStateChanged(this.authenticationChange)
    } catch (error) {
      console.log('Fatal Error. Cannot Initialize.', error)
    }
  }

  notificationListener (authUser) {
    if (this.notificationListenerInstance) {
      this.notificationListenerInstance()
    }
    this.notificationListenerInstance = firebase.db
      .collection('notifications')
      .doc(`${authUser.uid}`)
      .collection('messages')
      .orderBy('time', 'desc')
      .limit(5)
      .onSnapshot((snap) => {
        const data = []
        snap.docs.forEach((item) => {
          data.push(item.data())
        })
        storeAccessible.dispatch(setNotification(data))
      })
    // firebase.db
    // .collection('notifications')
    // .doc(`${authUser.uid}`)
    // .collection('messages')
    // .orderBy('time', 'desc')
    // .limit(5)
    // .get()
    // .then((snap) => {
    //   const data = []
    //   snap.forEach((item) => {
    //     data.push(item.data())
    //   })
    //   storeAccessible.dispatch(setNotification(data))
    // })
  }

  async authenticationChange (authUser) {
    if (authUser) {
      const result = await loading(() => {
        return getUser(authUser)
      })
      if (result && !this.emailLink) {
        this.notificationListener(authUser)
        return storeAccessible.dispatch(setUserInformation(result))
      } else if (result && this.emailLink) {
        storeAccessible.dispatch(setUserInformation(result))
        return setTimeout(() => {
          window.location.replace('/')
        }, 200)
      } else if (!result && this.emailLink) {
        if (this.userListener) {
          this.userListener()
        }
        this.userListener = firebase.db
          .collection('users')
          .doc(`${authUser.uid}`)
          .onSnapshot((item) => {
            this.notificationListener(authUser)
            storeAccessible.dispatch(setUserInformation(item.data()))
            this.userListener()
          })
        return true
      }
      signOut()
    }
    storeAccessible.dispatch(setUserInformation(null))
  }

  render () {
    const { store, persistor, history } = this.props
    return (
      <Main
        store={store}
        history={history}
        persistor={persistor}
      />
    )
  }
}
