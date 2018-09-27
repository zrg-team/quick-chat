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
import ProfilePage from '../pages/ProfilePage'
import PublicPage from '../pages/PublicPage'
import MapPage from '../pages/MapPage'
// import VerifyPage from '../pages/VerifyPage'

function Authetication (Page, props) {
  return <AutheticationPage Page={Page} {...props} />
}

export default class Root extends Component {
  render () {
    const { store } = this.props
    const {
      user: { userInformation }
    } = store.getState()
    return (
      <div>
        <Route exact path='/' component={Page(userInformation
          ? HomePage
          : LoginPage
        )} />
        <Route path='/signup' component={Page(SignUpPage)} />
        <Route path='/login' component={Page(LoginPage)} />
        <Route path='/public' render={() => Authetication(PublicPage)} />
        <Route path='/room' render={() => Authetication(HomePage)} />
        <Route path='/friend' render={() => Authetication(FriendPage)} />
        <Route path='/message' render={() => Authetication(MessagesPage)} />
        <Route path='/profile/:uid' render={(props) => Authetication(ProfilePage, props)} />
        <Route path='/map' render={() => Authetication(MapPage)} />
      </div>
    )
  }
}
