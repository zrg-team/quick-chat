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
  Avatar
  // Button
} from '@material-ui/core'
import cx from 'classnames'
import headerStyle from './styles'
import HeaderLinks from './HeaderLinks'

function Header ({ ...props }) {
  const { classes, color, links = false, notifications = [] } = props
  const appBarClasses = cx({
    [' ' + classes[color]]: color
  })
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex} />
        {links && <Hidden smDown implementation='css'>
          <HeaderLinks />
        </Hidden>}
        <Hidden mdDown >
          <Paper className={classes.root}>
            {notifications.map(data => {
              return (
                <Chip
                  key={data.key}
                  color='primary'
                  label={data.label}
                  className={classes.chip}
                  avatar={<Avatar><Message /></Avatar>}
                />
              )
            })}
          </Paper>
        </Hidden>
        <IconButton
          color='inherit'
          className={classes.appResponsive}
        >
          <Notifications />
        </IconButton>
        <Hidden mdUp>
          <IconButton
            className={classes.appResponsive}
            color='inherit'
            aria-label='open drawer'
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  )
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger'])
}

export default withStyles(headerStyle)(Header)
