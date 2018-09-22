import React from 'react'
import {
  withStyles
  // Button
} from '@material-ui/core'
import MenuPage from '../common/hocs/MenuPage'
import Rooms from '../modules/room/containers/Rooms'
import appStyle from '../common/styles/app'

class HomePage extends React.Component {
  render () {
    return (
      <MenuPage>
        <Rooms />
      </MenuPage>
    )
  }
}

export default withStyles(appStyle)(HomePage)
