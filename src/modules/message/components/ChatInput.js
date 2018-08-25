import React, { Component } from 'react'
import validate from 'validate.js'
import { Input } from 'react-chat-elements'
import {
  Icon,
  withStyles,
  BottomNavigation,
  BottomNavigationAction
} from '@material-ui/core'
import {
  Restore as RestoreIcon,
  Favorite as FavoriteIcon,
  LocationOn as LocationOnIcon
} from '@material-ui/icons'
import { URL_SCHEMA } from '../../../common/utils/regex'
import Button from '../../../libraries/CustomButtons/Button'

class ChatInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: ''
    }
    this.send = this.send.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  send () {
    const { value } = this.state
    const { user, send, selected } = this.props
    if (!value) {
      return
    }
    const errors = validate({ website: value }, URL_SCHEMA)
    const type = errors ? 'text' : 'url'
    send(user, selected, {
      message: value
    }, type)
    this.inputRef.clear()
    this.setState({
      value: ''
    })
  }

  onChange (event) {
    this.setState({
      value: event.target.value
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
              simple
              color='success'
              size='lg'
              onClick={this.send}
            >
              Send
            </Button>
          } />
        <BottomNavigation value={value} onChange={this.handleChange} className={classes.root}>
          <BottomNavigationAction
            label='Recents'
            value='recents'
            className={classes.iconStyle}
            icon={<RestoreIcon />}
          />
          <BottomNavigationAction
            label='Favorites'
            value='favorites'
            className={classes.iconStyle}
            icon={<FavoriteIcon />}
          />
          <BottomNavigationAction
            label='Nearby'
            value='nearby'
            className={classes.iconStyle}
            icon={<LocationOnIcon />}
          />
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
  }
}

export default withStyles(styles)(ChatInput)
