import React from 'react'
import {
  withStyles
} from '@material-ui/core'
import MenuPage from '../common/hocs/MenuPage'
import YourQRCode from '../modules/user/containers/YourQRCode'
import SearchFriend from '../modules/user/components/SearchFriend'
import GridContainer from '../libraries/Grid/GridContainer'
import GridItem from '../libraries/Grid/GridItem'
import Card from '../libraries/Card/Card'
import CardHeader from '../libraries/Card/CardHeader'
import CardBody from '../libraries/Card/CardBody'
import appStyle from '../common/styles/app'
import Profile from '../modules/profile/components/Profile'

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
    const { search } = this.state
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
