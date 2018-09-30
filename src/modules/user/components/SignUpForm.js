import React, { Component } from 'react'
import validate from 'validate.js'
import withStyles from '@material-ui/core/styles/withStyles'
import InputAdornment from '@material-ui/core/InputAdornment'
import LockOutlined from '@material-ui/icons/LockOutlined'
import { replace } from '../../../common/utils/navigation'
import Email from '@material-ui/icons/Email'
import { signupValidate, emailValidate } from '../models'
import Notification from '../../../common/components/widgets/Notification'
import GridContainer from '../../../libraries/Grid/GridContainer'
import GridItem from '../../../libraries/Grid/GridItem'
import Card from '../../../libraries/Card/Card'
import CardHeader from '../../../libraries/Card/CardHeader'
import CardBody from '../../../libraries/Card/CardBody'
import CardFooter from '../../../libraries/Card/CardFooter'
import Button from '../../../libraries/CustomButtons/Button'
import CustomInput from '../../../libraries/CustomInput/CustomInput'

import loginStyle from '../../../assets/jss/material-kit-react/views/componentsSections/loginStyle'

class SignUpForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      errors: {}
    }
    this.signup = this.signup.bind(this)
    this.gotoLogin = this.gotoLogin.bind(this)
    this.signupEmail = this.signupEmail.bind(this)
    this.onChangeName = this.onChangeName.bind(this)
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
  }

  async signupEmail () {
    const { email } = this.state
    const { signupEmail } = this.props
    const errors = validate({ email }, emailValidate)
    if (!errors) {
      const result = await signupEmail(email)
      if (result && result.success) {
        Notification.show('Register success. Check your email !', 'success')
        return replace('/login')
      }
      return Notification.show(result.message, 'error')
    }
    this.setState({
      errors: {
        ...errors
      }
    })
  }

  async gotoLogin () {
    return replace('/login')
  }

  async signup () {
    const { email, password } = this.state
    const { signup } = this.props
    const errors = validate({ email }, signupValidate)
    if (!errors) {
      const result = await signup(email, password)
      if (result && result.success) {
        Notification.show(`Register success. Please check ${email} to verified your email !`, 'success')
        return replace('/login')
      }
      return Notification.show(result.message, 'error')
    }
    this.setState({
      errors: {
        ...errors
      }
    })
  }

  onChangeName (event) {
    this.setState({
      name: event.target.value
    })
  }

  onChangeEmail (event) {
    this.setState({
      email: event.target.value
    })
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
      <div className={classes.section}>
        <div className={classes.container}>
          <GridContainer justify='center'>
            <GridItem xs={12} sm={12} md={4}>
              <Card>
                <form className={classes.form}>
                  <CardHeader color='primary' className={classes.cardHeader}>
                    <h4>SignUp</h4>
                  </CardHeader>
                  <CardBody>
                    <CustomInput
                      labelText='Email'
                      id='email'
                      formControlProps={{
                        fullWidth: true
                      }}
                      error={errors.email !== undefined}
                      inputProps={{
                        type: 'email',
                        endAdornment: (
                          <InputAdornment position='end'>
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                        onChange: this.onChangeEmail
                      }}
                    />
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
                    {/* <Button
                      simple
                      color='primary'
                      size='lg'
                      onClick={this.signupEmail}
                    >
                      Without Password
                    </Button> */}
                    <Button
                      simple
                      color='primary'
                      size='lg'
                      onClick={this.gotoLogin}
                    >
                      Login
                    </Button>
                    <Button
                      simple
                      color='primary'
                      size='lg'
                      onClick={this.signup}
                    >
                      Register
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    )
  }
}

export default withStyles(loginStyle)(SignUpForm)
