import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import classNames from 'classnames'
import red from '@material-ui/core/colors/red'
import CardHeader from '../../../libraries/Card/CardHeader'
import notification from '../../../common/components/widgets/Notification'
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      userInfo: {
        description: '',
        email: '',
        phone: '',
        address: ''
      }
    }
  }
  async componentDidMount () {
    const { user, getUserInfo } = this.props
    console.log('user la: ', user)
    let userInfo = await getUserInfo(user.uid)
    if (userInfo && userInfo.data) {
      this.setState({userInfo: userInfo.data})
      return notification.success('Synced.')
    }
    return notification.error('Sync error !')
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

  handleClose = () => {
    //this.setState({ open: false })
  }

  onChangeInput = (event) => {
    const {userInfo} = this.state
    console.log(this.userInfo)
    userInfo[event.target.name] = event.target.value;
    this.setState({userInfo})
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
        <CardHeader color='primary'>
          <img className={classes.profile_picture} src='https://gyazo.com/db9f7075f60979081a9da8ec47453bec.png' />
        </CardHeader>
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
            <h className={classes.info_type}>Get In Touch! <Icon className={classNames(classes.icon, 'far fa-hand-point-left')} color='primary' /></h>
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
const styles = {
  container: {
    alignItems: 'center',
    background: 'white',
    borderRadius: '3px',
    boxShadow: '0px 2px 4px rgba(0,0,0,0.3)',
    display: 'flex',
    flexDirection: 'column',
    height: '500px',
    margin: '0px auto',
    overflow: 'hidden',
    width: '300px'
  },
  fab: {
    backgroundColor: '#EA4335',
    border: 'none',
    borderRadius: '50%',
    boxShadow: '0px 1px 2px rgba(0,0,0,0.5)',
    color: 'white',
    fontSize: '18px',
    fontWeight: '300',
    height: '50px',
    transform: 'translateY(-25px)',
    width: '50px'
  },
  content: {
    padding: '50px 20px',
    transform: 'translateY(-25px)',
    width: '100%'
  },
  'content_text': {
    fontSize: '16px',
    lineHeight: '1.6em'
  },
  'profile_picture': {
    borderRadius: '50%',
    height: '100px',
    overflow: 'hidden',
    width: '100px'
  },
  profile_picture_full: {
    pointerEvents: 'none'
  },
  info: {
    marginTop: '10px'
  },
  info_type: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '1.6em'
  },
  info_data: {
    color: 'grey',
    float: 'right',
    fontSize: '16px',
    lineHeight: '1.6em'
  },
  social_media: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '20px'
  },
  social_media_links: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: '100%',
    justifyContent: 'center',
    marginTop: '5px',
    width: '100%'
  },
  social_media_btn: {
    border: 'none',
    borderRadius: '50%',
    color: 'white',
    fontSize: '20px',
    height: '40px',
    textShadow: '0px 2px 4px rgba(0,0,0,0.3)',
    width: '40px'
  },
  icon: {
    margin: '0 auto'
  },
  iconHover: {
    margin: '0 auto',
    '&:hover': {
      color: red[800]
    }
  },
  change_info: {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    height: '40px',
    width: '40px'
  }
}
export default withStyles(styles)(Profile)
