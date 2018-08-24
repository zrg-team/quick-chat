import React, { Component } from 'react'
import validate from 'validate.js'
import withStyles from '@material-ui/core/styles/withStyles'
import InputAdornment from '@material-ui/core/InputAdornment'
import LockOutlined from '@material-ui/icons/LockOutlined'
import Email from '@material-ui/icons/Email'
import { replace } from '../../../common/utils/navigation'
import { signupValidate, emailValidate } from '../models'
import Notification from '../../../common/components/widgets/Notification'
// core components
import GridContainer from '../../../libraries/Grid/GridContainer'
import GridItem from '../../../libraries/Grid/GridItem'
import Card from '../../../libraries/Card/Card'
import CardHeader from '../../../libraries/Card/CardHeader'
import CardBody from '../../../libraries/Card/CardBody'
import CardFooter from '../../../libraries/Card/CardFooter'
import Button from '../../../libraries/CustomButtons/Button'
import CustomInput from '../../../libraries/CustomInput/CustomInput'
import IconButton from '../../../libraries/CustomButtons/IconButton'

import loginStyle from '../../../assets/jss/material-kit-react/views/componentsSections/loginStyle'

class LoginForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      errors: {}
    }
    this.login = this.login.bind(this)
    this.signup = this.signup.bind(this)
    this.loginEmail = this.loginEmail.bind(this)
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
  }

  async login () {
    const { email, password } = this.state
    const { login } = this.props
    const errors = validate({ email, password }, signupValidate)
    if (!errors) {
      const result = await login(email, password)
      if (result && result.success) {
        Notification.show('Login success !', 'success')
        return replace('/room')
      }
      return Notification.show(result.message, 'error')
    }
    this.setState({
      errors: {
        ...errors
      }
    })
  }

  signup () {
    return replace('/signup')
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

  async loginEmail () {
    const { loginEmail } = this.props
    const email = window.prompt('Please provide your email for login')
    const errors = validate({ email }, emailValidate)
    if (!errors) {
      const result = await loginEmail(email)
      if (result && result.success) {
        Notification.show(`Please check ${email} for login email !`, 'success')
        return replace('/login')
      }
      return Notification.show(result.message, 'error')
    }
    Notification.show(Object.keys(errors).map(key => errors[key][0]).join(', '), 'error')
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
                    <h4>Login</h4>
                    <div className={classes.socialLine}>
                      <IconButton
                        color='transparent'
                        onClick={this.loginEmail}
                      >
                        <Email titleAccess={'Email'} />
                      </IconButton>
                    </div>
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
                    <Button
                      simple
                      color='primary'
                      size='lg'
                      onClick={this.signup}
                    >
                      Signup
                    </Button>
                    <Button
                      simple
                      color='primary'
                      size='lg'
                      onClick={this.login}
                    >
                      Login
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

export default withStyles(loginStyle)(LoginForm)
