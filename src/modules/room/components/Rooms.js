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
    const { goTo } = this.props
    goTo(item)
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
    const { rooms = [], notifications = [] } = this.props
    return (
      <div>
        <ChatList
          className='chat-list'
          onClick={this.openRoom}
          dataSource={
            rooms.map(item => {
              let notification = 0
              if (notifications.some((noti) => noti.ref === item.id)) {
                notification = 1
              }
              return {
                avatar: require('../../../assets/images/no-image-icon.png'),
                alt: 'Reactjs',
                title: item.guestName,
                subtitle: item.message,
                date: new Date(),
                unread: notification,
                ...item
              }
            })} />
      </div>
    )
  }
}

export default Rooms
