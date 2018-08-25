import React, { Component } from 'react'
import validate from 'validate.js'
import withStyles from '@material-ui/core/styles/withStyles'
import InputAdornment from '@material-ui/core/InputAdornment'
import LockOutlined from '@material-ui/icons/LockOutlined'
import { replace } from '../../../common/utils/navigation'
import { passwordValidate } from '../models'
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

import loginStyle from '../../../assets/jss/material-kit-react/views/componentsSections/loginStyle'

class ApproveForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      password: '',
      errors: {}
    }
    this.unlock = this.unlock.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
  }

  async unlock () {
    const { password } = this.state
    const { unlock } = this.props
    const errors = validate({ password }, passwordValidate)
    if (!errors) {
      const result = await unlock(password)
      if (result) {
        Notification.show('Welcome back !', 'success')
        return replace('/room')
      }
      return Notification.show('Unlock error !', 'error')
    }
    this.setState({
      errors: {
        ...errors
      }
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
                    <h4>Unlock</h4>
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
                      onClick={this.unlock}
                    >
                      Unlock
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

export default withStyles(loginStyle)(ApproveForm)
