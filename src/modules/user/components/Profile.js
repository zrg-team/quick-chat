import React, { Component } from 'react'
import {
  withStyles,
  Icon,
  Button
} from '@material-ui/core'
import classNames from 'classnames'
import EditIcon from '@material-ui/icons/Edit'
import Dialog from '../../../common/components/widgets/Dialog'
import notification from '../../../common/components/widgets/Notification'
import Avatar from './Avatar'
import styles from '../styles/profile'
import EditProfile from '../containers/EditProfile'

class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleUploadAvatar = this.handleUploadAvatar.bind(this)
  }

  componentDidMount () {
    const { yourProfile, uid, getGuestInformation } = this.props
    if (!yourProfile) {
      getGuestInformation(uid)
    }
  }

  componentWillReceiveProps (nextProps) {
    const { uid, getGuestInformation, yourProfile } = nextProps
    if (uid !== this.props.uid && !yourProfile) {
      getGuestInformation(uid)
    }
  }

  handleClickOpen () {
    Dialog.show(<EditProfile handleClose={this.handleClose} />)
  }

  async handleClose () {
    Dialog.hide()
  }

  async handleUploadAvatar (filename) {
    const { user, updateAvatarUrl } = this.props
    const result = await updateAvatarUrl(filename, user)
    if (result) {
      notification.success('Updated avatar.')
    }
  }

  render () {
    const { user, classes, yourProfile } = this.props
    const fab = {
      color: 'secondary',
      className: classes.fab,
      icon: <EditIcon />
    }
    return (
      <div className={classes.container}>
        <Avatar
          yourProfile={yourProfile}
          handleUploadAvatar={this.handleUploadAvatar}
          avatarURL={user.avatarURL}
          {...this.props}
        />
        <div className={classes.content}>
          <h className={classes.content_text}>{user.description || 'No information'}</h>
          <div className={classes.info}>
            <h className={classes.info_type}>Email</h>
            <h className={classes.info_data}>{user.email}</h>
          </div>
          <div className={classes.info}>
            <h className={classes.info_type}>Phone</h>
            <h className={classes.info_data}>{user.phone || 'No information'}</h>
          </div>
          <div className={classes.info}>
            <h className={classes.info_type}>Address</h>
            <h className={classes.info_data}>{user.address || 'No information'}</h>
          </div>
          <div className={classes.social_media}>
            <div className={classes.social_media_links}>
              <button className={classes.social_media_btn} title='Facebook' tab-index='1'>
                <Icon className={classNames(classes.icon, 'fab fa-facebook-square')} color='primary' />
              </button>
              <button className={classes.social_media_btn} title='Instagram' tab-index='2'>
                <Icon className={classNames(classes.icon, 'fab fa-instagram')} color='secondary' />
              </button>
              <button className={classes.social_media_btn} title='Twitter' tab-index='3'>
                <Icon className={classNames(classes.icon, 'fab fa-twitter')} color='primary' />
              </button>
            </div>
          </div>
          {yourProfile && <div>
            <Button
              variant='fab'
              className={classes.change_info}
              color={fab.color}
              onClick={this.handleClickOpen}>
              {fab.icon}
            </Button>
          </div>}
        </div>
      </div>
    )
  }
}
export default withStyles(styles)(Profile)
