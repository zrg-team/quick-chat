import React from 'react'
import classNames from 'classnames'
import withStyles from '@material-ui/core/styles/withStyles'
import ApproveForm from '../modules/user/containers/ApproveForm'

import componentsStyle from '../assets/jss/material-kit-react/views/components'

class VerifyPage extends React.Component {
  render () {
    const { classes } = this.props
    return (
      <div>
        <div className={classNames(classes.main)}>
          <ApproveForm />
        </div>
      </div>
    )
  }
}

export default withStyles(componentsStyle)(VerifyPage)
