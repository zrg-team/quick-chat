import React from 'react'
import classNames from 'classnames'
import withStyles from '@material-ui/core/styles/withStyles'
import LoginForm from '../modules/user/containers/LoginForm'

import componentsStyle from '../assets/jss/material-kit-react/views/components'

class Components extends React.Component {
  render () {
    const { classes } = this.props
    return (
      <div>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <LoginForm />
        </div>
      </div>
    )
  }
}

export default withStyles(componentsStyle)(Components)
