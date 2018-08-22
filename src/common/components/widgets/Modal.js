import React, { Component } from 'react'
import AriaModal from 'react-aria-modal'

class Modal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isShow: false,
      component: undefined,
      deactiveCallback: undefined,
      enterCallback: undefined,
      initialFocus: '',
      underlayStyle: {},
      focusDialog: true,
      escapeExits: false,
      animated: true,
      modalHasEntered: false
    }

    this.onModalEnter = this.onModalEnter.bind(this)
    this.activateModal = this.activateModal.bind(this)
    this.deactivateModal = this.deactivateModal.bind(this)
    this.getApplicationNode = this.getApplicationNode.bind(this)
  }

  activateModal (component, title, animated, {
    enterCallback = undefined,
    initialFocus = '',
    deactiveCallback = undefined,
    underlayStyle = {},
    focusDialog = true,
    escapeExits = false
  }) {
    this.setState({
      isShow: true,
      animated,
      component,
      title,
      deactiveCallback,
      initialFocus,
      underlayStyle,
      focusDialog,
      escapeExits,
      enterCallback
    })
  }

  deactivateModal () {
    const { deactiveCallback } = this.state
    deactiveCallback && deactiveCallback()
    this.setState({
      isShow: false,
      title: '',
      component: undefined,
      enterCallback: undefined,
      deactiveCallback: undefined,
      initialFocus: '',
      underlayStyle: {},
      focusDialog: true,
      escapeExits: false,
      modalHasEntered: false
    })
  }

  getApplicationNode () {
    return document.getElementById('application')
  }

  componentWillMount () {
    const { global } = this.props
    if (global) {
      Modal.instance = this
    }
  }

  componentWillUnmount () {
    const { global } = this.props
    if (global) {
      delete Modal.instance
    }
  }

  onModalEnter () {
    const { enterCallback, animated } = this.state

    enterCallback && enterCallback()
    animated && this.setState({ modalHasEntered: true })
  }

  render () {
    const { isShow, title, initialFocus, underlayStyle, component, focusDialog, escapeExits, modalHasEntered } = this.state

    let dialogContentClass = 'modal modal--animated'
    let underlayClass = 'underlayModal'
    if (modalHasEntered) {
      dialogContentClass += ' has-entered'
      underlayClass += ' has-entered'
    }
    if (!isShow || !component) {
      return null
    }

    return (
      <AriaModal
        titleText={title}
        onExit={this.deactivateModal}
        onEnter={this.onModalEnter}
        initialFocus={initialFocus}
        getApplicationNode={this.getApplicationNode}
        underlayStyle={underlayStyle}
        focusDialog={focusDialog}
        escapeExits={escapeExits}
        underlayClass={underlayClass}
      >
        <div className={dialogContentClass}>
          {component}
        </div>
      </AriaModal>
    )
  }
}

export default {
  Component: Modal,
  show (component, title = '', animated = true, params = {}) {
    Modal.instance && Modal.instance.activateModal(component, title, animated, params)
  },
  hide () {
    Modal.instance && Modal.instance.deactivateModal()
  },
  getApplicationNode () {
    return (Modal.instance && Modal.instance.getApplicationNode()) || undefined
  }
}
