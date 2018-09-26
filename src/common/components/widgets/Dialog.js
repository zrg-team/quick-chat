import React, { Component } from 'react'
// import Card from '@material-ui/core/Card'
import Dialog from '@material-ui/core/Dialog'
import { withStyles } from '@material-ui/core/styles'

let instanceDialogComponent
class DialogComponent extends Component {
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
      instanceDialogComponent = this
    }
  }

  componentWillUnmount () {
    const { global } = this.props
    if (global) {
      instanceDialogComponent = null
    }
  }

  render () {
    // const { classes } = this.props
    const { isShow, component } = this.state
    if (!component || !isShow) {
      return null
    }
    return (
      <Dialog
        open={isShow}
        onClose={this.deactivateModal}
        aria-labelledby='form-dialog-title'
      >
        {component}
      </Dialog>
    )
  }
}

const styles = theme => ({
  card: {
    maxWidth: '100%'
  }
})

const DialogWithStyle = withStyles(styles)(DialogComponent)

export default {
  Component: DialogWithStyle,
  show (component) {
    instanceDialogComponent && instanceDialogComponent.activateModal(component)
  },
  hide () {
    instanceDialogComponent && instanceDialogComponent.deactivateModal()
  }
}
