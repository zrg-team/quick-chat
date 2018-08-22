import React from 'react'
import store from 'store'
import classNames from 'classnames'
import firebase from '../common/utils/firebase'
import withStyles from '@material-ui/core/styles/withStyles'

import componentsStyle from '../assets/jss/material-kit-react/views/components'

class VerifyPage extends React.Component {
  componentDidMount () {
    console.log('window.location.href', window.location.href)
    if (firebase.auth.isSignInWithEmailLink(window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn')
      if (!email) {
        email = window.prompt('Please provide your email for confirmation')
      }
      // The client SDK will parse the code from the link for you.
      firebase.auth.signInWithEmailLink(email, window.location.href)
        .then((result) => {
          // Clear email from storage.
          console.log('result', result)
          store.set('authenticationMail', null)
        })
        .catch(error => {
          console.log('>>>>> error', error)
        })
    }
  }
  render () {
    const { classes } = this.props
    return (
      <div>
        <div className={classNames(classes.main, classes.mainRaised)} />
      </div>
    )
  }
}

export default withStyles(componentsStyle)(VerifyPage)
