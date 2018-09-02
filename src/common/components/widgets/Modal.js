import React, { Component } from 'react'
// import Card from '@material-ui/core/Card'
import Modal from '@material-ui/core/Modal'
import { withStyles } from '@material-ui/core/styles'

let instanceModalComponent
class ModalComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isShow: false,
      component: undefined
    }

    this.activateModal = this.activateModal.bind(this)
    this.deactivateModal = this.deactivateModal.bind(this)
    this.getApplicationNode = this.getApplicationNode.bind(this)
  }

  activateModal (component) {
    this.setState({
      isShow: true,
      component
    })
  }

  deactivateModal () {
    const { deactiveCallback } = this.state
    deactiveCallback && deactiveCallback()
    this.setState({
      isShow: false,
      title: '',
      component: undefined
    })
  }

  getApplicationNode () {
    return document.getElementById('application')
  }

  componentDidMount () {
    const { global } = this.props
    if (global) {
      instanceModalComponent = this
    }
  }

  componentWillUnmount () {
    const { global } = this.props
    if (global) {
      instanceModalComponent = null
    }
  }

  render () {
    // const { classes } = this.props
    const { isShow, component } = this.state

    return (
      <Modal
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        open={isShow}
        onClose={this.deactivateModal}
      >
        {component}
      </Modal>
    )
  }
}

const styles = theme => ({
  card: {
    maxWidth: '100%'
  }
})

const ModalWithStyle = withStyles(styles)(ModalComponent)

export default {
  Component: ModalWithStyle,
  show (component) {
    instanceModalComponent && instanceModalComponent.activateModal(component)
  },
  hide () {
    instanceModalComponent && instanceModalComponent.deactivateModal()
  },
  getApplicationNode () {
    return (instanceModalComponent && instanceModalComponent.getApplicationNode()) || undefined
  }
}
