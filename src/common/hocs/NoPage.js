import React from 'react'

class NoPage extends React.Component {
  render () {
    const { sessionLoading, processLoading } = this.props
    if (sessionLoading || processLoading) {
      return (
        <div className='loading-session-body'>
          <div className='loading'>
            <div className='loading__square' />
            <div className='loading__square' />
            <div className='loading__square' />
            <div className='loading__square' />
            <div className='loading__square' />
            <div className='loading__square' />
            <div className='loading__square' />
          </div>
        </div>
      )
    }
    return (
      <div>
        <div className='no-page-container'>
          <img src={require('../../assets/images/no-page.png')} />
        </div>
      </div>
    )
  }
}

export default NoPage
