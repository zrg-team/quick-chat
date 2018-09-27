import React, { Component } from 'react'
import { withStyles,
  Dialog,
  DialogActions, 
  Icon, 
  Button, 
  DialogContent, 
  DialogContentText, 
  DialogTitle } from '@material-ui/core'
import classNames from 'classnames'
import notification from '../../../common/components/widgets/Notification'
import EditIcon from '@material-ui/icons/Edit'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import firebase from '../../../common/utils/firebase'
import Avatar from './Avatar'
import styles from './styles'
class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      userInfo: {
        description: '',
        email: '',
        phone: '',
        address: '',
        avatarURL: ''
      }
    }
  }
  async componentDidMount () {
    const {match} = this.props
    let canGetUserInfo = this.getUserInfo(match.params.uid)
    if (canGetUserInfo)
      return notification.success('Synced.')
    return notification.error('Sync error !')
  }

  getUserInfo = async (uid) => {
    const { getUserInfo } = this.props
    let userInfo = await getUserInfo(uid)
    if (userInfo && userInfo.data) {
      this.setState({userInfo: userInfo.data})
      return true
    }
    return false
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleSubmit = async () => {
    const { user, updateUserInfo } = this.props
    const {userInfo} = this.state
    let result = await updateUserInfo(user.uid, userInfo)
    this.setState({ open: false })
    if (result) {
      return notification.success('Success')
    }
    return notification.error('Fail!')
  }

  handleClose = async () => {
    const {match} = this.props
    await this.getUserInfo(match.params.uid)
    this.setState({ open: false })
  }

  onChangeInput = (event) => {
    const {userInfo} = this.state
    console.log(this.userInfo)
    userInfo[event.target.name] = event.target.value;
    this.setState({userInfo})
  }
  
  handleUploadAvatar = (filename) => {
    const { user, updateUserInfo } = this.props
    firebase
      .storage
      .ref(`${user.uid}/avatar`)
      .child(filename)
      .getDownloadURL()
      .then(url => {
        user.avatarURL = url
        updateUserInfo(user.uid, user)
        this.setState({ userInfo: user })
      })    
  }

  render () {
    const { classes } = this.props
    const { userInfo } = this.state
    const fab = {
      color: 'secondary',
      className: classes.fab,
      icon: <EditIcon />
    }
    return (
      <div className={classes.container}>
        <Avatar 
          handleUploadAvatar={this.handleUploadAvatar}
          avatarURL={userInfo.avatarURL}
          {...this.props}
        />
        <div className={classes.content}>
          <h className={classes.content_text}>{userInfo.description ? userInfo.description : 'No information'}</h>
          <div className={classes.info}>
            <h className={classes.info_type}>Email</h>
            <h className={classes.info_data}>{userInfo.email}</h>
          </div>
          <div className={classes.info}>
            <h className={classes.info_type}>Phone</h>
            <h className={classes.info_data}>{userInfo.phone ? userInfo.phone : 'No information'}</h>
          </div>
          <div className={classes.info}>
            <h className={classes.info_type}>Address</h>
            <h className={classes.info_data}>{userInfo.address ? userInfo.address : 'No information'}</h>
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
          <div>
            <Button
              variant='fab'
              className={classes.change_info}
              color={fab.color}
              onClick={this.handleClickOpen}>
              {fab.icon}
            </Button>
          </div>
        </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby='form-dialog-title'
        >
          <ValidatorForm
            name='profile-form'
            ref="form"
            onSubmit={this.handleSubmit}
            onError={errors => console.log(errors)}
          >
            <DialogTitle id='form-dialog-title'>Change User Profile</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please fill your information below 
              </DialogContentText>
                <TextValidator
                  autoFocus
                  margin='dense'
                  validators={['maxStringLength:100']}
                  errorMessages={['this text is smaller than 100 characters']}
                  name='description'
                  label='Description'
                  value={userInfo.description}
                  type='text'
                  fullWidth
                  onChange={this.onChangeInput}
                />
                <TextValidator
                  autoFocus
                  margin='dense'
                  name='email'
                  label='Email'
                  value={userInfo.email}
                  type='email'
                  validators={['required']}
                  errorMessages={['this field is required']}
                  fullWidth
                  onChange={this.onChangeInput}
                />
                <TextValidator
                  autoFocus
                  margin='dense'
                  name='phone'
                  label='Phone'
                  value={userInfo.phone}
                  type='number'
                  validators={['required']}
                  errorMessages={['this field is required']}
                  fullWidth
                  onChange={this.onChangeInput}
                />
                <TextValidator
                  autoFocus
                  margin='dense'
                  name='address'
                  label='Adress'
                  validators={['maxStringLength:50']}
                  errorMessages={['this text is smaller than 50 characters']}
                  value={userInfo.address}
                  type='text'
                  fullWidth
                  onChange={this.onChangeInput}
                />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color='primary'>
                Cancel
              </Button>
              <Button type='submit' color='primary'>
                Confirm
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </div>
    )
  }
}
export default withStyles(styles)(Profile)
