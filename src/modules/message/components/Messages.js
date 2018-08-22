import React, { Component } from 'react'
import { MessageList } from 'react-chat-elements'
import { back } from '../../../common/utils/navigation'
import notification from '../../../common/components/widgets/Notification'

class Messages extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  async componentDidMount () {
    const { offset, selected, getMessages } = this.props
    if (!selected) {
      return back()
    }
    const result = await getMessages(selected, offset)
    if (result) {
      return notification.success('Synced.')
    }
    return notification.error('Sync error !')
  }

  render () {
    const { messages = [], user, selected } = this.props
    return (
      <div>
        <MessageList
          className='message-list'
          lockable
          toBottomHeight={'80%'}
          dataSource={messages.map(item => {
            const sender = user.uid === item.from
            const type = ['text', 'url'].includes(item.type) ? 'text' : item.type
            console.log('item.type', item.type)
            return {
              title: sender ? 'Me' : selected.guestName,
              position: sender ? 'right' : 'left',
              type: type,
              text: item.type !== 'url'
                ? <p>{item.data}</p>
                : <a target='_blank' href={item.data}>{item.data}</a>,
              date: new Date(item.time * 1000)
            }
          })}
        />
      </div>
    )
  }
}

export default Messages
