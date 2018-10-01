import React, { Component } from 'react'
import { Input } from '../../../libraries/ChatElement'
import {
  withStyles
} from '@material-ui/core'
import Button from '../../../libraries/CustomButtons/Button'

class InputChat extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: ''
    }
    this.send = this.send.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  send () {
    const { value } = this.state
    const { user, send } = this.props
    if (!value) {
      return
    }
    send(user, {
      message: value
    })
    this.setState({
      value: ''
    })
    this.refs.input.clear()
  }

  onChange (event) {
    this.setState({
      value: event.target.value,
      type: 'text'
    })
  }

  render () {
    return (
      <div>
        <Input
          placeholder='Type here...'
          multiline
          ref='input'
          onChange={this.onChange}
          rightButtons={
            <Button
              color='success'
              size='lg'
              onClick={this.send}
              text='Send'>
              Send
            </Button>
            }
          />
      </div>
    )
  }
}

const styles = {
}

export default withStyles(styles)(InputChat)
