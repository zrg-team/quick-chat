import React from 'react'
// material-ui components
import withStyles from '@material-ui/core/styles/withStyles'
import InputAdornment from '@material-ui/core/Input/InputAdornment'
// @material-ui/icons
import People from '@material-ui/icons/People'
import LockOutlined from '@material-ui/icons/LockOutlined'
import Email from '@material-ui/icons/Email'
// core components
import GridContainer from '../../../libraries/Grid/GridContainer'
import GridItem from '../../../libraries/Grid/GridItem'
import Card from '../../../libraries/Card/Card'
import CardHeader from '../../../libraries/Card/CardHeader'
import CardBody from '../../../libraries/Card/CardBody'
import CardFooter from '../../../libraries/Card/CardFooter'
import IconButton from '../../../libraries/CustomButtons/IconButton'
import Button from '../../../libraries/CustomButtons/Button'
import CustomInput from '../../../libraries/CustomInput/CustomInput'

import loginStyle from '../../../assets/jss/material-kit-react/views/componentsSections/loginStyle'

class SectionLogin extends React.Component {
  render () {
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
                        href='#pablo'
                        target='_blank'
                        color='transparent'
                        onClick={e => e.preventDefault()}
                      >
                        <i
                          className={classes.socialIcons + ' fab fa-twitter'}
                        />
                      </IconButton>
                      <IconButton
                        href='#pablo'
                        target='_blank'
                        color='transparent'
                        onClick={e => e.preventDefault()}
                      >
                        <i
                          className={classes.socialIcons + ' fab fa-facebook'}
                        />
                      </IconButton>
                      <IconButton
                        href='#pablo'
                        target='_blank'
                        color='transparent'
                        onClick={e => e.preventDefault()}
                      >
                        <i
                          className={
                            classes.socialIcons + ' fab fa-google-plus-g'
                          }
                        />
                      </IconButton>
                    </div>
                  </CardHeader>
                  <p className={classes.divider}>Or Be Classical</p>
                  <CardBody>
                    <CustomInput
                      labelText='First Name...'
                      id='first'
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'text',
                        endAdornment: (
                          <InputAdornment position='end'>
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText='Email...'
                      id='email'
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'email',
                        endAdornment: (
                          <InputAdornment position='end'>
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText='Password'
                      id='pass'
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'password',
                        endAdornment: (
                          <InputAdornment position='end'>
                            <LockOutlined className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color='primary' size='lg'>
                      Get started
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

export default withStyles(loginStyle)(SectionLogin)
