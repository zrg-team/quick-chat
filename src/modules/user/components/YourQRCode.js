import React, { Component } from 'react'
import QRCode from 'qrcode.react'
import {
  PeopleTwoTone,
  MessageRounded,
  SupervisedUserCircle
} from '@material-ui/icons'
import CardFooter from '../../../libraries/Card/CardFooter'
import Button from '../../../libraries/CustomButtons/Button'
import CustomInput from '../../../libraries/CustomInput/CustomInput'
import Notification from '../../../common/components/widgets/Notification'

class YourQRCode extends Component {
  constructor (props) {
    super(props)
    this.state = {
      message: ''
    }
    this.search = this.search.bind(this)
    this.friendRequest = this.friendRequest.bind(this)
    this.changeMessage = this.changeMessage.bind(this)
  }
  search () {
    const { search, searchFriend } = this.props
    searchFriend(search)
  }
  changeMessage (event) {
    this.setState({
      message: event.target.value
    })
  }
  async friendRequest () {
    const { message } = this.state
    const { makeFriend, user, friend } = this.props
    if (!user.publicKey || !friend.publicKey) {
      Notification.error('Your or your friend missing the "publicKey" !')
    }
    const result = await makeFriend(user, friend, message)
    if (result) {
      return Notification.success('Friend requested !')
    }
    Notification.error('Opps, request error !')
  }
  render () {
    const { message } = this.state
    const { user = {}, friend } = this.props
    return (
      <div>
        <p style={{
          fontWeight: 'bold',
          textAlign: 'center'
        }}>{friend && friend.uid ? friend.email : `Your UID`}</p>
        <div style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex'
        }}>
          <QRCode value={(friend && friend.uid) || user.uid} />
        </div>
        <p style={{
          textAlign: 'center'
        }}>{(friend && friend.uid) || user.uid}</p>
        <CardFooter style={{ justifyContent: 'center' }}>
          <Button
            onClick={this.search}
            color='facebook'
            size='sm'
          >
            <PeopleTwoTone />
            <span> Search</span>
          </Button>
          <Button
            disabled={!friend || !friend.uid || !message || !`${message}`.trim()}
            onClick={this.friendRequest}
            color='success'
            size='sm'>
            <SupervisedUserCircle />
            <span> Connect</span>
          </Button>
        </CardFooter>
        {(friend && friend.uid) ? <CustomInput
          labelText='Message Name'
          id='font-awesome'
          formControlProps={{
            fullWidth: true
          }}
          inputProps={{
            placeholder: 'Type your word.',
            onChange: this.changeMessage,
            endAdornment: (
              <MessageRounded />
            )
          }}
        /> : null}
      </div>
    )
  }
}

export default YourQRCode
