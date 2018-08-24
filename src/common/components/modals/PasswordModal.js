import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import InputAdornment from '@material-ui/core/InputAdornment'
import LockOutlined from '@material-ui/icons/LockOutlined'
// core components
import GridContainer from '../../../libraries/Grid/GridContainer'
import GridItem from '../../../libraries/Grid/GridItem'
import Card from '../../../libraries/Card/Card'
import CardHeader from '../../../libraries/Card/CardHeader'
import CardBody from '../../../libraries/Card/CardBody'
import CardFooter from '../../../libraries/Card/CardFooter'
import Button from '../../../libraries/CustomButtons/Button'
import CustomInput from '../../../libraries/CustomInput/CustomInput'

import passwordModalStyle from './passwordModalStyle'

class PasswordModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      password: ''
    }
    this.onChangePassword = this.onChangePassword.bind(this)
  }

  onChangePassword (event) {
    this.setState({
      password: event.target.value
    })
  }

  render () {
    const { errors } = this.state
    const { classes } = this.props
    return (
      <GridContainer justify='center'>
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <form className={classes.form}>
              <CardHeader color='primary' className={classes.cardHeader}>
                <h4>Password for encrypt message</h4>
              </CardHeader>
              <CardBody>
                <CustomInput
                  labelText='Password'
                  id='pass'
                  formControlProps={{
                    fullWidth: true
                  }}
                  error={errors.password !== undefined}
                  inputProps={{
                    type: 'password',
                    endAdornment: (
                      <InputAdornment position='end'>
                        <LockOutlined className={classes.inputIconsColor} />
                      </InputAdornment>
                    ),
                    onChange: this.onChangePassword
                  }}
                />
              </CardBody>
              <CardFooter className={classes.cardFooter}>
                <Button
                  simple
                  color='primary'
                  size='lg'
                  onClick={this.signup}
                >
                  Confirm
                </Button>
              </CardFooter>
            </form>
          </Card>
        </GridItem>
      </GridContainer>
    )
  }
}

export default withStyles(passwordModalStyle)(PasswordModal)
