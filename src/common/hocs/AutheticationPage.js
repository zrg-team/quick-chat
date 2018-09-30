import React, { Component } from 'react'
import { connect } from 'react-redux'
import NoPage from './NoPage'

class AutheticationPage extends Component {
  componentDidMount () {
    const { sessionLoading } = this.props
    this.processLoading = sessionLoading || false
  }
  render () {
    const { Page, user, approveID, sessionLoading, ...props } = this.props
    if (!user || !approveID || sessionLoading) {
      return (<NoPage
        sessionLoading={sessionLoading}
        processLoading={this.processLoading}
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
  sessionLoading: state.session.sessionLoading
})

export default connect(mapStateToProps, null)(AutheticationPage)
