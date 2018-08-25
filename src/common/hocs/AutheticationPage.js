import React, { Component } from 'react'
import { connect } from 'react-redux'
import NoPage from './NoPage'

class AutheticationPage extends Component {
  render () {
    const { Page, user, approveID, ...props } = this.props
    if (!user || !approveID) {
      return (<NoPage />)
    }
    return (
      <Page {...props} />
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.userInformation,
  approveID: state.common.approveID
})

export default connect(mapStateToProps, null)(AutheticationPage)
