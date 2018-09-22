import React from 'react'
import { withStyles, FormControl, Input } from '@material-ui/core'
import { Clear, Check } from '@material-ui/icons'
// nodejs library to set properties for components
import PropTypes from 'prop-types'
// nodejs library that concatenates classes
import classNames from 'classnames'

import customInputStyle from '../../assets/jss/material-kit-react/components/customTextFieldStyle.js'

function CustomTextField ({ ...props }) {
  const {
    classes,
    formControlProps,
    labelText,
    id,
    inputProps,
    error,
    white,
    inputRootCustomClasses,
    success
  } = props

  // const labelClasses = classNames({
  //   [' ' + classes.labelRootError]: error,
  //   [' ' + classes.labelRootSuccess]: success && !error
  // })
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true,
    [classes.whiteUnderline]: white
  })
  const marginTop = classNames({
    [classes.marginTop]: labelText === undefined,
    [inputRootCustomClasses]: inputRootCustomClasses !== undefined
  })
  const inputClasses = classNames({
    [classes.input]: true,
    [classes.whiteInput]: white
  })
  const formControlClasses = classNames({
    [classes.formControl]: true,
    [classes.formControlLabel]: labelText !== undefined,
    [formControlProps.className]: formControlProps.className !== undefined
  })
  return (
    <FormControl
      {...formControlProps}
      className={formControlClasses}
    >
      {/* {labelText !== undefined ? (
        <InputLabel
          className={classes.labelRoot + ' ' + labelClasses}
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null} */}
      <Input
        classes={{
          input: inputClasses,
          root: marginTop,
          disabled: classes.disabled,
          underline: underlineClasses,
          multiline: classes.marginTop,
          inputMultiline: classes.marginTop
        }}
        id={id}
        {...inputProps}
      />
      {error ? (
        <Clear className={classes.feedback + ' ' + classes.labelRootError} />
      ) : success ? (
        <Check className={classes.feedback + ' ' + classes.labelRootSuccess} />
      ) : null}
    </FormControl>
  )
}

CustomTextField.propTypes = {
  classes: PropTypes.object.isRequired,
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  inputRootCustomClasses: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
  white: PropTypes.bool
}

export default withStyles(customInputStyle)(CustomTextField)
