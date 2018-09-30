import React, { Component } from 'react'
import { withStyles,
  Dialog,
  DialogActions,
  Button,
  DialogContent,
  DialogContentText,
  DialogTitle } from '@material-ui/core'
import notification from '../../../common/components/widgets/Notification'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import styles from '../styles/profile'

class EditProfile extends Component {
  constructor (props) {
    super(props)
    const {
      user
    } = props
    this.state = {
      userInfo: {
        description: '',
        email: '',
        phone: '',
        address: '',
        avatarURL: '',
        ...user
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onChangeInput = this.onChangeInput.bind(this)
  }

  async handleSubmit () {
    const { user, updateUserInfo, handleClose } = this.props
    const {userInfo} = this.state
    let result = await updateUserInfo(user.uid, userInfo)
    handleClose()
    if (result) {
      return notification.success('Success')
    }
    return notification.error('Fail!')
  }

  async onChangeInput (event) {
    const { userInfo } = this.state
    this.setState({
      userInfo: {
        ...userInfo,
        [event.target.name]: event.target.value
      }
    })
  }

  render () {
    const { userInfo } = this.state
    const { handleClose } = this.props
    return (
      <Dialog
        open
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <ValidatorForm
          name='profile-form'
          ref='form'
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
            <Button onClick={handleClose} color='primary'>
              Cancel
            </Button>
            <Button type='submit' color='primary'>
              Confirm
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    )
  }
}
export default withStyles(styles)(EditProfile)
