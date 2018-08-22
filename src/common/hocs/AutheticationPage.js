import React, { Component } from 'react'
import { connect } from 'react-redux'
import NoPage from './NoPage'

class AutheticationPage extends Component {
  render () {
    const { Page, user, ...props } = this.props
    if (!user) {
      return (<NoPage />)
    }
    return (
      <Page {...props} />
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.userInformation
})

export default connect(mapStateToProps, null)(AutheticationPage)
