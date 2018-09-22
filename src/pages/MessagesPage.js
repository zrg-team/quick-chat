import React from 'react'
import {
  withStyles
} from '@material-ui/core'
import 'emoji-mart/css/emoji-mart.css'
import MenuPage from '../common/hocs/MenuPage'
import Messages from '../modules/message/containers/Messages'
import ChatInput from '../modules/message/containers/ChatInput'
import appStyle from '../common/styles/app'

class MessagesPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      refContainer: null
    }
    this.assignRef = this.assignRef.bind(this)
  }
  assignRef (refContainer) {
    this.setState({
      refContainer
    })
  }

  render () {
    const { refContainer } = this.state
    const { classes } = this.props
    return (
      <MenuPage>
        <div className={classes.messageContainer}>
          <div
            ref={this.assignRef}
            className={`scrollbar`}
            style={{ flex: 1, overflowY: 'auto' }}
          >
            <Messages
              refContainer={refContainer}
            />
          </div>
          <div
            style={{ marginTop: 10, height: 110, overflowY: 'hidden' }}
          >
            <ChatInput />
          </div>
        </div>
      </MenuPage>
    )
  }
}

export default withStyles(appStyle)(MessagesPage)
