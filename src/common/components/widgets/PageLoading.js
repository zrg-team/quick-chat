import React, { Component } from 'react'
import ReactLoading from 'react-loading'

class PageLoading extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isShow: false
    }
  }

  show () {
    this.setState({
      isShow: true
    })
  }

  hide () {
    this.setState({
      isShow: false
    })
  }

  isVisible () {
    const { isShow } = this.state
    return isShow
  }

  componentWillMount () {
    PageLoading.instance = this
  }

  componentWillUnmount () {
    delete PageLoading.instance
  }

  render () {
    const { isShow } = this.state
    const { type = 'balls', color = '#ffffff' } = this.props

    if (!isShow) {
      return null
    }

    return (
      <div className='loading-container'>
        <div className='loading-inner'>
          <ReactLoading type={type} color={color} width={100} />
        </div>
      </div>
    )
  }
}

export default {
  Component: PageLoading,
  show () {
    PageLoading.instance && PageLoading.instance.show()
  },
  hide () {
    PageLoading.instance && PageLoading.instance.hide()
  },
  isVisible () {
    return PageLoading.instance.isVisible()
  }
}
