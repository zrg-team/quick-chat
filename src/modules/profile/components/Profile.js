import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import classNames from 'classnames'
import red from '@material-ui/core/colors/red'
import CardHeader from '../../libraries/Card/CardHeader'
import Avatar from '../components/Avatar'

class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    const { classes } = this.props
    return (
      <div className={classes.container}>
        {/* <div className={classes.header}>
        </div> */}
        <CardHeader color='primary' className={classes.cardHeader}>
          <Avatar />
        </CardHeader>
        <button className={classes.fab} type='file' tab-index='0'>
          <Icon>edit</Icon>
        </button>
        <div className={classes.content}>
          <h className={classes.content_text}>Nani is one of the best football player used to play for Manchester United, the greatest football club on the world</h>
          <div className={classes.info}>
            <h className={classes.info_type}>Email</h>
            <h className={classes.info_data}>john.smith@gmail.com</h>
          </div>
          <div className={classes.info}>
            <h className={classes.info_type}>Phone</h>
            <h className={classes.info_data}>+1 234 567 890</h>
          </div>
          <div className={classes.info}>
            <h className={classes.info_type}>Address</h>
            <h className={classes.info_data}>123 6th St.Melbourne</h>
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
        </div>
      </div>
    )
  }
}
const styles = {
  'body': {
    'backgroundColor': '#E5E5E5'
  },
  'button_focus': {
    'outline': 'none'
  },
  'container': {
    'width': '300px',
    'height': '500px',
    'boxShadow': '0px 2px 4px rgba(0,0,0,0.3)',
    'background': 'white',
    'margin': '0px auto',
    'display': 'flex',
    'flexDirection': 'column',
    'alignItems': 'center',
    'borderRadius': '3px',
    'overflow': 'hidden'
  },
  'header': {
    'width': '80%',
    'backgroundColor': '#4285F4',
    'height': '35%',
    'display': 'flex',
    'flexDirection': 'column',
    'alignItems': 'center',
    'justifyContent': 'center',
    'boxShadow': '0px 1px 2px 0px rgba(0,0,0,0.5)'
  },
  'header_text': {
    'color': 'white',
    'fontSize': '16px',
    'lineHeight': '1.6em',
    'textShadow': '0px 2px 4px rgba(0,0,0,0.3)',
    'marginTop': '15px'
  },
  'fab': {
    'backgroundColor': '#EA4335',
    'fontWeight': '300',
    'color': 'white',
    'fontSize': '18px',
    'borderRadius': '50%',
    'height': '50px',
    'width': '50px',
    'border': 'none',
    'boxShadow': '0px 1px 2px rgba(0,0,0,0.5)',
    'transform': 'translateY(-25px)'
  },
  'content': {
    'padding': '0px 20px',
    'width': '100%',
    'transform': 'translateY(-25px)'
  },
  'content_text': {
    'fontSize': '16px',
    'lineHeight': '1.6em'
  },
  'profile_picture': {
    'height': '100px',
    'borderRadius': '50%',
    'width': '100px',
    'overflow': 'hidden'
  },
  'profile_picture_full': {
    'pointerEvents': 'none'
  },
  'info': {
    'marginTop': '10px'
  },
  'info_type': {
    'fontSize': '16px',
    'lineHeight': '1.6em',
    'fontWeight': '600',
    'color': 'rgba(0,0,0,0.8)'
  },
  'info_data': {
    'fontSize': '16px',
    'lineHeight': '1.6em',
    'float': 'right',
    'color': 'grey'
  },
  'social_media': {
    'display': 'flex',
    'flexDirection': 'column',
    'alignItems': 'center',
    'paddingTop': '20px'
  },
  'social_media_links': {
    'display': 'flex',
    'flexDirection': 'row',
    'flexWrap': 'wrap',
    'alignItems': 'center',
    'justifyContent': 'center',
    'width': '100%',
    'height': '100%',
    'marginTop': '5px'
  },
  'social_media_btn': {
    'borderRadius': '50%',
    'height': '40px',
    'width': '40px',
    'fontSize': '20px',
    'color': 'white',
    'border': 'none',
    'textShadow': '0px 2px 4px rgba(0,0,0,0.3)'
  },
  icon: {
    margin: '0 auto'
  },
  iconHover: {
    margin: '0 auto',
    '&:hover': {
      color: red[800]
    }
  }
}
export default withStyles(styles)(Profile)
