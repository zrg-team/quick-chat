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

class FriendPage extends React.Component {
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
            <GridItem xs={12} sm={6} md={6}>
              <Card>
                <form className={classes.form}>
                  <CardHeader color='primary' className={classes.cardHeader}>
                    <h4>MAKE YOUR FRIEND</h4>
                  </CardHeader>
                  <CardBody>
                    <SearchFriend changeText={this.changeText} />
                    <YourQRCode search={search} />
                  </CardBody>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </MenuPage>
    )
  }
}

export default withStyles(appStyle)(FriendPage)
