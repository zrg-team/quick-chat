import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'
import CardHeader from '../../../libraries/Card/CardHeader'
import notification from '../../../common/components/widgets/Notification'
import firebase from '../../../common/utils/firebase'
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton'
import styles from './styles'
class Avatar extends React.PureComponent {

  handleUploadError = error => {
    return notification.error(error)
  }

  handleUploadSuccess = filename => {
    const { handleUploadAvatar } = this.props
    handleUploadAvatar(filename)
  }

  render () {
    const { classes, user, avatarURL } = this.props
    return (
      <CardHeader color='primary'>
        <CustomUploadButton
            accept="image/*"
            name="avatar"
            filename={`${user.uid}`}
            hidden
            storageRef={firebase.storage.ref(`${user.uid}/avatar`)}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
        >
        <img 
          className={classes.profile_picture} 
          src={ avatarURL ? avatarURL : 'https://gyazo.com/db9f7075f60979081a9da8ec47453bec.png'}
        />
        </CustomUploadButton>
      </CardHeader>
    )
  }
}
export default withStyles(styles)(Avatar)
