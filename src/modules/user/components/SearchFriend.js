import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import {
  PeopleTwoTone
} from '@material-ui/icons'
import CustomInput from '../../../libraries/CustomInput/CustomInput'
import basicsStyle from '../../../assets/jss/material-kit-react/views/componentsSections/basicsStyle'

class SearchFriend extends Component {
  render () {
    const { changeText } = this.props
    return (
      <div>
        <CustomInput
          labelText='Search Friend'
          id='font-awesome'
          formControlProps={{
            fullWidth: true
          }}
          inputProps={{
            placeholder: 'Your friend UID.',
            onChange: changeText,
            endAdornment: (
              <PeopleTwoTone />
            )
          }}
        />
      </div>
    )
  }
}

export default withStyles(basicsStyle)(SearchFriend)
