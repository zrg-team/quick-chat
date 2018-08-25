import React, { Component } from 'react'
import { Route } from 'react-router'
import Page from './hocs/Page'
import AutheticationPage from './hocs/AutheticationPage'
// START
import SignUpPage from '../pages/SignUpPage'
import LoginPage from '../pages/LoginPage'
import HomePage from '../pages/HomePage'
import MessagesPage from '../pages/MessagesPage'
import FriendPage from '../pages/FriendPage'
import VerifyPage from '../pages/VerifyPage'

function Authetication (Page) {
  return <AutheticationPage Page={Page} />
}

export default class Root extends Component {
  render () {
    const { store } = this.props
    const {
      user: { userInformation },
      common: { approveID }
    } = store.getState()
    return (
      <div>
        <Route exact path='/' component={Page(userInformation
          ? approveID ? HomePage : VerifyPage
          : LoginPage
        )} />
        <Route path='/signup' component={Page(SignUpPage)} />
        <Route path='/login' component={Page(LoginPage)} />
        <Route path='/room' render={() => Authetication(HomePage)} />
        <Route path='/friend' render={() => Authetication(FriendPage)} />
        <Route path='/message' render={() => Authetication(MessagesPage)} />
      </div>
    )
  }
}
