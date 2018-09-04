import React from 'react'
import {
  Button,
  Dialog,
  withStyles,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText
} from '@material-ui/core'
import { initIPFS, stopAll } from '../common/utils/ipfs'
import appStyle from '../common/styles/app'
import { MAP_API_URL } from '../common/models'
import MenuPage from '../common/hocs/MenuPage'
import Map from '../modules/map/containers/Map'
// import Button from '../libraries/CustomButtons/Button'
import { replace } from '../common/utils/navigation'
import Notification from '../common/components/widgets/Notification'

class MapPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      room: null,
      ipfs: null,
      requestDialog: false,
      access: false,
      firstLocation: null
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleAccept = this.handleAccept.bind(this)
  }
  handleAccept () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        this.setState({
          requestDialog: false,
          access: true,
          firstLocation: { lat: latitude, lng: longitude }
        })
      }, () => {
        this.handleClose()
      })
    } else {
      Notification.warning('Geolocation is not supported by this browser.')
    }
  }
  handleClose () {
    this.setState({
      requestDialog: false
    })
    replace('/public')
  }
  async componentDidMount () {
    try {
      const { room, ipfs } = await initIPFS()
      this.setState({ requestDialog: true, room, ipfs })
    } catch (err) {
      replace('/public')
    }
  }
  componentWillUnmount () {
    const { room, ipfs } = this.state
    stopAll(ipfs, room)
  }
  render () {
    const { room, ipfs, requestDialog, access, firstLocation } = this.state
    const { classes } = this.props
    return (
      <MenuPage marginTop={false}>
        {(room && ipfs) ? <Map
          room={room}
          ipfs={ipfs}
          access={access}
          googleMapURL={MAP_API_URL}
          firstLocation={firstLocation}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div className={classes.fullContainer} />}
          mapElement={<div style={{ height: `100%` }} />} />
          : null}
        <Dialog
          open={requestDialog}
          onClose={this.handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Let us share your location with another user ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='primary'>
              Disagree
            </Button>
            <Button onClick={this.handleAccept} color='primary' autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </MenuPage>
    )
  }
}

export default withStyles(appStyle)(MapPage)
