import React from 'react'
import {
  withStyles
} from '@material-ui/core'
import MenuPage from '../common/hocs/MenuPage'
import Messages from '../modules/message/containers/Messages'
import ChatInput from '../modules/message/containers/ChatInput'
import appStyle from '../common/styles/app'

class MessagesPage extends React.Component {
  render () {
    const { classes } = this.props
    return (
      <MenuPage>
        <div className={classes.messageContainer}>
          <div className={`${classes.scrollBar} scrollbar`} style={{ flex: 1, overflowY: 'auto' }}>
            <Messages />
          </div>
          <div style={{ marginTop: 10, height: 90, overflowY: 'hidden' }} >
            <ChatInput />
          </div>
        </div>
      </MenuPage>
    )
  }
}

export default withStyles(appStyle)(MessagesPage)
