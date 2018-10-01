import React, { Component } from 'react'
import { MessageList } from '../../../libraries/ChatElement'
import { getAccount, sendTransaction, getTransactionLink } from '../../../common/utils/ethereum'
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
    this.interacted = this.interacted.bind(this)
  }

  async interacted (message) {
    const { user, sendTransactionMessage, selected } = this.props
    console.log('message click', message)
    switch (message.messageType) {
      case 'ethereum':
        try {
          const account = await getAccount()
          console.log('account', account)
          if (!account.error && !account.address) {
            return notification.error(account.message)
          }
          const result = await sendTransaction(account.address, {
            to: message.data.address,
            value: message.data.value
          })
          if (result) {
            notification.success('Sent !')
            return sendTransactionMessage(message.uid, user, selected, {
              txID: result,
              to: message.data.address,
              value: message.data.value,
              from: account.address
            }, 'ethereum')
          }
        } catch (err) {
          console.log('err', err)
          notification.error('Send error !')
        }
        break
      case 'ethereum-transaction':
        window.open(getTransactionLink(message.data.txID), '_blank')
        break
    }
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
    const { offset, transactionOffset, selected, getMessages } = this.props
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
    const { messages = [] } = this.props
    return (
      <div>
        <MessageList
          onClick={this.interacted}
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
