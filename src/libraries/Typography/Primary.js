import React from 'react'
// nodejs library to set properties for components
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core'

import typographyStyle from '../../assets/jss/material-kit-react/components/typographyStyle.js'

function Primary ({ ...props }) {
  const { classes, children } = props
  return (
    <div className={classes.defaultFontStyle + ' ' + classes.primaryText}>
      {children}
    </div>
  )
}

Primary.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(typographyStyle)(Primary)
