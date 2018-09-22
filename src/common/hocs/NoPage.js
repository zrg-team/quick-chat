import React from 'react'

class NoPage extends React.Component {
  render () {
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
