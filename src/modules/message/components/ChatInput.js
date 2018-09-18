import React, { Component } from 'react'
import validate from 'validate.js'
// import { Input } from 'react-chat-elements'
import {
  Card,
  Button,
  Dialog,
  Tooltip,
  TextField,
  withStyles,
  CardHeader,
  IconButton,
  CardContent,
  CardActions,
  DialogTitle,
  DialogActions,
  DialogContent,
  BottomNavigation,
  DialogContentText,
  BottomNavigationAction
} from '@material-ui/core'
import {
  Close as CloseIcon,
  AddAlert as AddAlertIcon,
  TextsmsTwoTone as TextsmsTwoToneIcon,
  LocationOn as LocationOnIcon,
  Face as FaceIcon,
  PersonalVideo as PersonalVideoIcon,
  MusicNote as MusicNoteIcon
} from '@material-ui/icons'
import { Picker } from 'emoji-mart'
import { URL_SCHEMA } from '../../../common/utils/regex'
import Notification from '../../../common/components/widgets/Notification'
import CustomButton from '../../../libraries/CustomButtons/Button'
import Modal from '../../../common/components/widgets/Modal'
import { youtubeParser, spotifyParser } from '../models'
import CustomTextField from '../../../libraries/CustomInput/CustomTextField'

const MarkdownEditor = require('react-markdown-editor').MarkdownEditor

class ChatInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: '',
      type: 'text',
      modalValue: '',
      emojiPicker: false
    }
    this.buzz = this.buzz.bind(this)
    this.send = this.send.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onChangeModalValue = this.onChangeModalValue.bind(this)
    this.addEmoji = this.addEmoji.bind(this)
    this.onChangeMarkdown = this.onChangeMarkdown.bind(this)
    this.sendMarkdownModal = this.sendMarkdownModal.bind(this)
    this.sendVideoModal = this.sendVideoModal.bind(this)
    this.sendLocation = this.sendLocation.bind(this)
    this.sendEmojiModal = this.sendEmojiModal.bind(this)
    this.renderEmojiPicker = this.renderEmojiPicker.bind(this)
    this.submitModal = this.submitModal.bind(this)
    this.sendSpotifyModal = this.sendSpotifyModal.bind(this)
  }

  closeModal () {
    Modal.hide()
  }

  addEmoji (emoji) {
    const { value } = this.state
    this.setState({
      value: `${value}${emoji.native}`,
      type: 'text'
    })
  }

  sendEmojiModal () {
    const { emojiPicker } = this.state
    this.setState({
      emojiPicker: !emojiPicker
    })
  }

  renderEmojiPicker () {
    const { classes } = this.props
    const { emojiPicker } = this.state
    if (!emojiPicker) {
      return null
    }
    return (
      <div className={classes.emojiContainer}>
        <Picker title='Pick your emoji…' onSelect={this.addEmoji} />
      </div>
    )
  }

  sendSpotifyModal () {
    Modal.show(
      <Dialog
        open
        onClose={this.handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Spotify music</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Provice spotify url here
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='spotify'
            label='spotify url'
            type='text'
            fullWidth
            onChange={(e) => this.onChangeModalValue(e, 'spotify')}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.closeModal}
            color='primary'
          >
            Cancel
          </Button>
          <Button
            onClick={this.submitModal}
            color='primary'
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  sendVideoModal () {
    Modal.show(
      <Dialog
        open
        onClose={this.handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Youtube</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Provice youtube video here
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='youtube'
            label='Youtube url'
            type='text'
            fullWidth
            onChange={(e) => this.onChangeModalValue(e, 'youtube')}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.closeModal}
            color='primary'
          >
            Cancel
          </Button>
          <Button
            onClick={this.submitModal}
            color='primary'
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  sendMarkdownModal () {
    const { classes } = this.props
    Modal.show(
      <Card className={classes.markdownCard}>
        <CardHeader
          action={
            <IconButton
              onClick={this.closeModal}
            >
              <CloseIcon />
            </IconButton>
          }
          title='Create your text'
        />
        <CardContent className={classes.markdownCardContent}>
          <MarkdownEditor
            initialContent=''
            iconsSet='font-awesome'
            onContentChange={this.onChangeMarkdown}
          />
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <Button
            color='success'
            size='lg'
            onClick={this.send}
          >
            Send
          </Button>
        </CardActions>
      </Card>
    )
  }

  async buzz () {
    const { user, buzz, selected, unread } = this.props
    if (!unread || unread < 1) {
      return Notification.warning('Only "Buzz!" if you have more than 1 unread message')
    }
    const result = await buzz(user, selected, unread)
    if (result) {
      return Notification.success('Success Buzz! your friend')
    }
    Notification.error('Error Buzz! message')
  }

  sendLocation () {
    const { user, send, selected } = this.props
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        send(user, selected, {
          message: JSON.stringify({ latitude, longitude })
        }, 'location')
      }, () => {
        Notification.warning("Can't get your location.")
      })
    } else {
      Notification.warning('Geolocation is not supported by this browser.')
    }
  }

  send () {
    const { value, type } = this.state
    const { user, send, selected } = this.props
    if (!value) {
      return
    }
    const errors = validate({ website: value }, URL_SCHEMA)
    const newType = errors || !type === 'text' ? type : 'url'
    send(user, selected, {
      message: value
    }, newType)
    this.setState({
      value: ''
    })
    Modal.hide()
  }

  submitModal () {
    const { modalValue, type } = this.state
    const { user, send, selected } = this.props
    if (!modalValue) {
      return Notification.error('Url required!')
    }
    // let errors = null
    switch (type) {
      case 'youtube':
        const videoId = youtubeParser(modalValue)
        if (!videoId || !`${videoId}`.trim()) {
          return Notification.error('Please provice a youtube url !')
        }
        send(user, selected, {
          message: videoId
        }, type)
        this.setState({
          modalValue: ''
        })
        Modal.hide()
        break
      case 'spotify':
        const spotifyId = spotifyParser(modalValue)
        if (!spotifyId || !`${spotifyId}`.trim()) {
          return Notification.error('Please provice a spotifyId url !')
        }
        send(user, selected, {
          message: spotifyId
        }, type)
        this.setState({
          modalValue: ''
        })
        Modal.hide()
        break
    }
  }

  onChange (event) {
    this.setState({
      value: event.target.value,
      type: 'text'
    })
  }

  onChangeModalValue (event, type) {
    this.setState({
      modalValue: event.target.value,
      type
    })
  }

  onChangeMarkdown (value) {
    this.setState({
      value,
      type: 'markdown'
    })
  }

  render () {
    const { classes } = this.props
    const { value, emojiPicker } = this.state
    return (
      <div style={{
        backgroundColor: '#ffffff'
      }}>
        <CustomTextField
          labelText='Type here...'
          id='email'
          formControlProps={{
            fullWidth: true
          }}
          inputProps={{
            value,
            placeholder: 'Type your message...',
            multiline: true,
            rowsMax: 5,
            endAdornment: (
              <CustomButton
                color='success'
                size='lg'
                style={{
                  marginRight: 10
                }}
                onClick={this.send}
              >
                Send
              </CustomButton>
            ),
            onChange: this.onChange
          }}
        />
        <BottomNavigation value={value} onChange={this.handleChange} className={classes.root}>
          <Tooltip title='Buzz your friend !' placement='top'>
            <BottomNavigationAction
              label='Buzz'
              value='buzz'
              onClick={this.buzz}
              className={classes.iconStyle}
              icon={<AddAlertIcon />}
            />
          </Tooltip>
          <Tooltip title='Pin your location !' placement='top'>
            <BottomNavigationAction
              label='Location'
              value='location'
              onClick={this.sendLocation}
              className={classes.iconStyle}
              icon={<LocationOnIcon />}
            />
          </Tooltip>
          <Tooltip title='Write complex text !' placement='top'>
            <BottomNavigationAction
              label='Markdown'
              value='markdown'
              onClick={this.sendMarkdownModal}
              className={classes.iconStyle}
              icon={<TextsmsTwoToneIcon />}
            />
          </Tooltip>
          <Tooltip title='Youtube video' placement='top'>
            <BottomNavigationAction
              label='Youtube'
              value='youtube'
              onClick={this.sendVideoModal}
              className={classes.iconStyle}
              icon={<PersonalVideoIcon />}
            />
          </Tooltip>
          <Tooltip title='Spotify music' placement='top'>
            <BottomNavigationAction
              label='Spotify'
              value='spotify'
              onClick={this.sendSpotifyModal}
              className={classes.iconStyle}
              icon={<MusicNoteIcon />}
            />
          </Tooltip>
          {this.renderEmojiPicker()}
          <Tooltip title='Emoji' placement='top'>
            <BottomNavigationAction
              label='Emoji'
              value='emoji'
              onClick={this.sendEmojiModal}
              className={classes.iconStyle}
              icon={emojiPicker ? <CloseIcon /> : <FaceIcon />}
            />
          </Tooltip>
        </BottomNavigation>
      </div>
    )
  }
}

const styles = {
  root: {
    width: '100%',
    height: 40
  },
  inputStyle: {
    height: 60
  },
  iconStyle: {
    paddingTop: '0px !important'
  },
  card: {
    maxWidth: '100%'
  },
  actions: {
    display: 'flex',
    alignItem: 'flex-end'
  },
  markdownCard: {
    height: 'calc(100% - 50px)',
    marginTop: 25,
    marginLeft: 15,
    marginRight: 15,
    display: 'flex',
    flexDirection: 'column'
  },
  markdownCardContent: {
    flex: 1
  },
  emojiContainer: {
    position: 'absolute',
    right: 10,
    bottom: 115,
    zIndex: 999
  }
}

export default withStyles(styles)(ChatInput)
