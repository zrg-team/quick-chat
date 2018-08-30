import React, { Component } from 'react'
import { MessageList } from 'react-chat-elements'
import { back } from '../../../common/utils/navigation'
import notification from '../../../common/components/widgets/Notification'

class Messages extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
    this.listRef = null
    this.shouldScroll = false
    this.assignRef = this.assignRef.bind(this)
  }

  assignRef (ref) {
    this.listRef = ref
  }

  componentWillReceiveProps (nextProps) {
    const { offset, refContainer } = this.props
    const { offset: nextOffset, refContainer: nextRefContainer } = nextProps
    if (offset !== nextOffset && nextOffset > offset && nextRefContainer && this.listRef) {
      this.shouldScroll = true
    }
    if (!refContainer && nextRefContainer) {
      this.shouldScroll = true
    }
  }

  componentDidUpdate () {
    if (this.shouldScroll) {
      const { refContainer } = this.props
      this.shouldScroll = false
      refContainer.scrollTop = this.listRef.scrollHeight + 100
    }
  }

  async componentDidMount () {
    const { user, offset, getMessages } = this.props
    const result = await getMessages(user, offset)
    if (result) {
      return notification.success('Synced.')
    }
    return notification.error('Sync error !')
  }

  render () {
    const { messages = [] } = this.props
    return (
      <div>
        <MessageList
          cmpRef={this.assignRef}
          className='message-list'
          lockable={false}
          toBottomHeight={'80%'}
          dataSource={messages}
        />
      </div>
    )
  }
}

export default Messages
