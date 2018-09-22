import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import classnames from 'classnames'
import {
  withStyles,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar
} from '@material-ui/core'
import sidebarStyle from './styles'

const Sidebar = ({ ...props }) => {
  // verifies if routeName is the one active (in browser input)
  function activeRoute (routeName, active) {
    return active === routeName
  }
  const { classes, color, image, logoText, routes, active = '/dashboard', logo } = props
  var links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        if (prop.redirect) return null
        const listItemClasses = classnames({
          [' ' + classes[color]]: activeRoute(prop.path, active)
        })
        const whiteFontClasses = classnames({
          [' ' + classes.whiteFont]: activeRoute(prop.path, active)
        })
        if (prop.onClick) {
          return (
            <div
              key={key}
              onClick={prop.onClick}
              className={classes.item}
            >
              <ListItem button className={classes.itemLink + listItemClasses}>
                <ListItemIcon className={classes.itemIcon + whiteFontClasses}>
                  <prop.icon />
                </ListItemIcon>
                <ListItemText
                  primary={prop.sidebarName}
                  className={classes.itemText + whiteFontClasses}
                  disableTypography
                />
              </ListItem>
            </div>
          )
        }
        return (
          <NavLink
            to={prop.path}
            className={classes.item}
            activeClassName='active'
            key={key}
          >
            <ListItem button className={classes.itemLink + listItemClasses}>
              <ListItemIcon className={classes.itemIcon + whiteFontClasses}>
                <prop.icon />
              </ListItemIcon>
              <ListItemText
                primary={prop.sidebarName}
                className={classes.itemText + whiteFontClasses}
                disableTypography
              />
            </ListItem>
          </NavLink>
        )
      })}
    </List>
  )
  var brand = (
    <div className={classes.logo}>
      <a href='#' className={classes.logoLink}>
        <div className={classes.logoImage}>
          <img src={logo} alt='logo' className={classes.img} />
        </div>
        {logoText}
        {/* <Avatar
          style={{ background: 'red', color: '#ffffff', display: 'inline-flex', marginLeft: 5 }}>
          &
        </Avatar> */}
      </a>
    </div>
  )
  return (
    <div>
      <Hidden mdUp>
        <Drawer
          variant='temporary'
          anchor='right'
          open={props.open}
          classes={{
            paper: classes.drawerPaper
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: 'url(' + image + ')' }}
            />
          ) : <div
            className={classes.background}
            style={{ backgroundColor: 'linear-gradient(to bottom right, #29323c, #485563)' }}
          />}
        </Drawer>
      </Hidden>
      <Hidden smDown>
        <Drawer
          anchor='left'
          variant='permanent'
          open
          classes={{
            paper: classes.drawerPaper
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: 'url(' + image + ')' }}
            />
          ) : <div
            className={classes.background}
            style={{ backgroundColor: 'linear-gradient(to bottom right, #29323c, #485563)' }}
          />}
        </Drawer>
      </Hidden>
    </div>
  )
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(sidebarStyle)(Sidebar)
