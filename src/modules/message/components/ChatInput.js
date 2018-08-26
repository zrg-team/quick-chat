import React, { Component } from 'react'
import validate from 'validate.js'
import { Input } from 'react-chat-elements'
import {
  Icon,
  Card,
  Tooltip,
  withStyles,
  CardHeader,
  IconButton,
  CardContent,
  CardActions,
  BottomNavigation,
  BottomNavigationAction
} from '@material-ui/core'
import {
  Close as CloseIcon,
  AddAlert as AddAlertIcon,
  TextsmsTwoTone as TextsmsTwoToneIcon,
  LocationOn as LocationOnIcon
} from '@material-ui/icons'
import { URL_SCHEMA } from '../../../common/utils/regex'
import Notification from '../../../common/components/widgets/Notification'
import Button from '../../../libraries/CustomButtons/Button'
import Modal from '../../../common/components/widgets/Modal'

const MarkdownEditor = require('react-markdown-editor').MarkdownEditor

class ChatInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: '',
      type: 'text'
    }
    this.buzz = this.buzz.bind(this)
    this.send = this.send.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onChangeMarkdown = this.onChangeMarkdown.bind(this)
    this.sendMarkdownModal = this.sendMarkdownModal.bind(this)
    this.sendLocation = this.sendLocation.bind(this)
  }

  closeModal () {
    Modal.hide()
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
    this.inputRef.clear()
    this.setState({
      value: ''
    })
    Modal.hide()
  }

  onChange (event) {
    this.setState({
      value: event.target.value,
      type: 'text'
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
    const { value } = this.state
    return (
      <div>
        <Input
          placeholder='Type here...'
          multiline
          className={`${classes.inputStyle}`}
          value={value}
          onChange={this.onChange}
          ref={ref => {
            this.inputRef = ref
          }}
          rightButtons={
            <Button
              color='success'
              size='lg'
              onClick={this.send}
            >
              Send
            </Button>
          } />
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
          <BottomNavigationAction
            label='Folder'
            value='folder'
            className={classes.iconStyle}
            icon={<Icon>folder</Icon>}
          />
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
  }
}

export default withStyles(styles)(ChatInput)
