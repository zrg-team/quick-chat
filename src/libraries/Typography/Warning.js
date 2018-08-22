import React from 'react'
// nodejs library to set properties for components
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core'

import typographyStyle from '../../assets/jss/material-kit-react/components/typographyStyle.js'

function Warning ({ ...props }) {
  const { classes, children } = props
  return (
    <div className={classes.defaultFontStyle + ' ' + classes.warningText}>
      {children}
    </div>
  )
}

Warning.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(typographyStyle)(Warning)
