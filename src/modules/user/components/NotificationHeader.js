import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Notifications, Message, People } from '@material-ui/icons'
import {
  withStyles,
  AppBar,
  Toolbar,
  IconButton,
  Hidden,
  Chip,
  Paper,
  Avatar,
  Badge
  // Button
} from '@material-ui/core'
import cx from 'classnames'
import headerStyle from '../../../common/components/elements/Header/styles'

class NotificationHeader extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      openNotification: false
    }
    this.handleOpenNotification = this.handleOpenNotification.bind(this)
  }
  handleOpenNotification () {
    const { openNotification } = this.state
    // const { clearNotification, notifications, user } = this.props
    this.setState({
      openNotification: !openNotification
    })
    // if (!openNotification === false && notifications.length) {
    //   console.log('user', user, notifications)
    //   clearNotification(user, notifications)
    // }
  }
  render () {
    const { openNotification } = this.state
    const { classes, color, notifications = [], handleDrawerToggle } = this.props
    const appBarClasses = cx({
      [' ' + classes[color]]: color
    })
    return (
      <AppBar className={classes.appBar + appBarClasses}>
        <Toolbar className={classes.container}>
          <div className={classes.flex} />
          {openNotification && <Paper className={classes.root}>
            {notifications.map(data => {
              const type = data.type === 'message'
              return (
                <Chip
                  key={`${data.ref}_${data.time.seconds}`}
                  color={type ? 'primary' : 'secondary'}
                  label={`${data.fromEmail}: ${data.message}`}
                  className={classes.chip}
                  avatar={
                    <Avatar>
                      {type
                      ? <Message /> : <People />}
                    </Avatar>}
                />
              )
            })}
          </Paper>}
          <IconButton
            color='inherit'
            onClick={this.handleOpenNotification}
            className={classes.appResponsive}
          >
            {notifications.length ? <Badge
              badgeContent={notifications.length}
              color='primary'
              classes={{ badge: classes.badge }}
            >
              <Notifications />
            </Badge> : <Notifications />}
          </IconButton>
          <Hidden mdUp>
            <IconButton
              className={classes.appResponsive}
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerToggle}
            >
              <Menu />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
    )
  }
}

NotificationHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger'])
}

export default withStyles(headerStyle)(NotificationHeader)
