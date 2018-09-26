import React from 'react'
import {
  withStyles
} from '@material-ui/core'
import MenuPage from '../common/hocs/MenuPage'
import GridContainer from '../libraries/Grid/GridContainer'
import appStyle from '../common/styles/app'
import Profile from '../modules/profile/containers/Profile'

class ProfilePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      search: ''
    }
    this.changeText = this.changeText.bind(this)
  }
  changeText (event) {
    this.setState({
      search: event.target.value
    })
  }
  render () {
    const { classes } = this.props
    return (
      <MenuPage>
        <div>
          <GridContainer justify='center'>
            <Profile color='primary' />
          </GridContainer>
        </div>
      </MenuPage>
    )
  }
}

export default withStyles(appStyle)(ProfilePage)
