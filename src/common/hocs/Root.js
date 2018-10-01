import React, { Component } from 'react'
import locate from '../utils/locate'
import web3 from '../utils/web3'
import { loading } from '../middlewares/effects'
import storeAccessible from '../utils/storeAccessible'
import {
  signOut,
  shouldUnlock,
  updatePublicKey,
  validateSessionKey,
  shouldGenerateApproveID,
  onAuthenticationChanged
} from '../utils/authentication'
import ipfsBridge from '../utils/ipfs'
import { requestMessageToken } from '../utils/notifications'
import Notification from '../components/widgets/Notification'
import { setUserInformation, setNotification } from '../../modules/user/actions'
import { getUser, userInformationListener, notificationListener } from '../../modules/user/repository'
import MainPage from './MainPage'

export default class Root extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ready: false
    }
    this.emailLink = false
    this.firstNotificationSync = true
    this.userListenerInstance = null
    this.notificationListenerInstance = null
    this.userListener = this.userListener.bind(this)
    this.authenticationChange = this.authenticationChange.bind(this)
    this.handlerNotificationListener = this.handlerNotificationListener.bind(this)
  }

  shouldComponentUpdate (nextProps, nextState) {
    const { ready } = nextState
    return ready && ready !== this.state.ready
  }

  async componentDidMount () {
    try {
      await locate()
      web3.init()
      ipfsBridge.initIPFS()
      onAuthenticationChanged(this.authenticationChange)
    } catch (error) {
      console.log('Fatal Error. Cannot Initialize.', error)
    }
  }

  async userListener (authUser) {
    if (this.userListenerInstance) {
      this.userListenerInstance()
    }
    this.userListenerInstance = await userInformationListener(authUser.uid, (snap) => {
      const data = snap.data()
      // if (data && !validateSessionKey(data)) {
      //   signOut()
      //   return storeAccessible.dispatch(setUserInformation(null))
      // }
      if (data && !data.publicKey) {
        Notification.warning('Your account missing "publicKey", please logout and login again !')
      }
      storeAccessible.dispatch(setUserInformation({
        ...data,
        uid: authUser.uid
      }))
    })
  }

  async handlerNotificationListener (authUser) {
    if (this.notificationListenerInstance) {
      this.notificationListenerInstance()
    }
    this.notificationListenerInstance = await notificationListener(authUser.uid, (snap) => {
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
      const { ready } = this.state
      if (!ready) {
        this.setState({
          ready: true
        })
      }
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
            // Notification.error('Your session key invalid. Maybe someone login to your account, please check !')
            // throw new Error('INVALID_SESSION_KEY')
          } else if (user) {
            await shouldGenerateApproveID(user)
            await shouldUnlock()
          }
          requestMessageToken(user)
          return user
        })
        if (result/* && !this.emailLink */) {
          this.handlerNotificationListener(authUser)
          storeAccessible.dispatch(setUserInformation(result))
          return this.userListener(authUser)
        }
        signOut()
      }
      console.log('this.notificationListenerInstance', this.notificationListenerInstance)
      // Logout clear all
      storeAccessible.dispatch(setUserInformation(null))
    } catch (err) {
      console.log('err', err)
      signOut()
      // Logout clear all
      storeAccessible.dispatch(setUserInformation(null))
    }
  }

  render () {
    const { ready } = this.state
    const { store, persistor, history } = this.props
    if (!ready) {
      return null
    }
    return (
      <MainPage
        store={store}
        history={history}
        persistor={persistor}
      />
    )
  }
}
