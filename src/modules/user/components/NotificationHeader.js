import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Notifications, Message } from '@material-ui/icons'
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
    const { clearNotification } = this.props
    this.setState({
      openNotification: !openNotification
    })
    if (!openNotification === false) {
      clearNotification()
    }
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
              return (
                <Chip
                  key={data.ref}
                  color='primary'
                  label={data.message}
                  className={classes.chip}
                  avatar={<Avatar><Message /></Avatar>}
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
