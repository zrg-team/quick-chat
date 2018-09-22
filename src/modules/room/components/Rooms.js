import React, { Component } from 'react'
import { ChatList } from 'react-chat-elements'
import notification from '../../../common/components/widgets/Notification'

class Rooms extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
    this.openRoom = this.openRoom.bind(this)
  }

  openRoom (item) {
    const { goTo, approveID } = this.props
    goTo(item, approveID)
  }

  async componentDidMount () {
    const { user, getRooms } = this.props
    if (!user) {
      return false
    }
    const result = await getRooms(user)
    if (result) {
      return notification.success('Synced.')
    }
    return notification.error('Sync error !')
  }

  render () {
    const { rooms = [] } = this.props
    return (
      <div>
        <ChatList
          className='chat-list'
          onClick={this.openRoom}
          dataSource={
            rooms.map(item => {
              return {
                avatar: require('../../../assets/images/no-image-icon.png'),
                alt: 'Reactjs',
                title: item.guestName,
                subtitle: item.message,
                date: item.lasted ? new Date(item.lasted) : undefined,
                unread: item.count || 0,
                ...item
              }
            })} />
      </div>
    )
  }
}

export default Rooms
