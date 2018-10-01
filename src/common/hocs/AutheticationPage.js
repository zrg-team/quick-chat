import React, { Component } from 'react'
import { connect } from 'react-redux'
import NoPage from './NoPage'

class AutheticationPage extends Component {
  componentDidMount () {
    const { sessionLoading } = this.props
    this.processLoading = sessionLoading || false
  }
  render () {
    const { Page, sessionSecurity, approveID, sessionLoading, ...props } = this.props
    if (!sessionSecurity || !approveID || sessionLoading) {
      return (<NoPage
        sessionLoading={sessionLoading}
        processLoading={this.processLoading}
        sessionSecurity={sessionSecurity}
      />)
    }
    return (
      <Page {...props} />
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.userInformation,
  approveID: state.session.approveID,
  sessionLoading: state.session.sessionLoading,
  sessionSecurity: state.common.sessionSecurity
})

export default connect(mapStateToProps, null)(AutheticationPage)
