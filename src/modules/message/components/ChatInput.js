import React, { Component } from 'react'
import validate from 'validate.js'
import { Input } from 'react-chat-elements'
import { URL_SCHEMA } from '../../../common/utils/regex'
import Button from '../../../libraries/CustomButtons/Button'

class ChatInput extends Component {
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
    const { user, send, selected } = this.props
    if (!value) {
      return
    }
    const errors = validate({ website: value }, URL_SCHEMA)
    console.log('errors, errors', errors)
    const type = errors ? 'text' : 'url'
    send(user, selected, {
      message: value
    }, type)
    this.inputRef.clear()
    this.setState({
      value: ''
    })
  }

  onChange (event) {
    this.setState({
      value: event.target.value
    })
  }

  render () {
    const { value } = this.state
    return (
      <div>
        <Input
          placeholder='Type here...'
          multiline
          value={value}
          onChange={this.onChange}
          ref={ref => {
            this.inputRef = ref
          }}
          rightButtons={
            <Button
              simple
              color='success'
              size='lg'
              onClick={this.send}
            >
              Send
            </Button>
          } />
      </div>
    )
  }
}

export default ChatInput
