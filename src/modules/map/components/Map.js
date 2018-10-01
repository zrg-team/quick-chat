import React, { Component } from 'react'
import Input from '@material-ui/core/Input'
import { MessageBox } from 'react-chat-elements'
import { MAP_OPTIONS } from '../../../common/models'
import { withStyles } from '@material-ui/core/styles'
import Notification from '../../../common/components/widgets/Notification'
import userPin from '../../../assets/images/userMapMarker.png'
import Button from '../../../libraries/CustomButtons/Button'
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  // Marker,
  DirectionsRenderer
} = require('react-google-maps')
const { MarkerWithLabel } = require('react-google-maps/lib/components/addons/MarkerWithLabel')

class Map extends Component {
  constructor (props) {
    super(props)
    this.state = {
      message: '',
      directions: undefined
    }

    this.intervalLocation = null
    this.send = this.send.bind(this)
    this.directTo = this.directTo.bind(this)
    this.onChange = this.onChange.bind(this)
    this.updateLocationProcess = this.updateLocationProcess.bind(this)
  }
  send () {
    const { message } = this.state
    const { location, updateMessage, user } = this.props
    message && `${message}`.trim() && updateMessage(user, location, message)
    this.setState({
      message: ''
    })
  }
  onChange (event) {
    this.setState({
      message: event.target.value
    })
  }
  componentWillReceiveProps (nextProps) {
    const { access, updateLocation, user, hash } = this.props
    if (access !== nextProps.access && nextProps.access && nextProps.firstLocation) {
      updateLocation(user, nextProps.firstLocation, hash)
      this.updateLocationProcess()
    }
  }
  componentWillUnmount () {
    if (navigator.geolocation && this.intervalLocation) {
      navigator.geolocation.clearWatch(this.intervalLocation)
    }
  }
  directTo (toLocation, id) {
    const { locationToID } = this.state
    const { location } = this.props
    const DirectionsService = new window.google.maps.DirectionsService()
    if (locationToID === id) {
      return this.setState({
        directions: null,
        locationToID: null
      })
    }
    DirectionsService.route({
      origin: new window.google.maps.LatLng(location.lat, location.lng),
      destination: new window.google.maps.LatLng(toLocation.lat, toLocation.lng),
      travelMode: window.google.maps.TravelMode.DRIVING
    }, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        this.setState({
          directions: result,
          locationToID: id
        })
      } else {
        console.error(`error fetching directions ${result}`)
      }
    })
  }
  updateLocationProcess () {
    if (navigator.geolocation) {
      this.intervalLocation = navigator.geolocation.watchPosition((position) => {
        const { updateLocation, user } = this.props
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        // if (!this.props.location ||
        //   this.props.location.lat !== latitude ||
        //   this.props.location.lng !== longitude
        // ) {
        //   updateLocation(user, { lat: latitude, lng: longitude })
        // }
        updateLocation(user, { lat: latitude, lng: longitude })
      }, () => {
        Notification.warning("Can't get your location.")
      }, {
        enableHighAccuracy: false,
        timeout: 200000,
        maximumAge: 0
      })
    } else {
      Notification.warning('Geolocation is not supported by this browser.')
    }
  }
  componentDidMount () {
    const { user, location, watchLocations } = this.props
    watchLocations(user, location)
  }
  render () {
    const { message, directions } = this.state
    const { user, location, locations } = this.props
    if (!location) {
      return null
    }
    return (
      <div
        style={{
          flex: 1,
          height: '100%',
          flexDirection: 'column'
        }}
      >
        <div
          style={{
            flex: 1
          }}
        >
          <GoogleMap
            key='map'
            defaultZoom={18}
            defaultCenter={location}
            defaultOptions={MAP_OPTIONS}
            center={location}
          >
            {directions && <DirectionsRenderer directions={directions} />}
            {/* <Marker
              position={location}
            /> */}
            {locations && locations.map((data, index) => {
              return (
                <MarkerWithLabel
                  icon={{
                    url: user.avatarURL,
                    scaledSize: new window.google.maps.Size(60, 60)
                  }}
                  onClick={() => this.directTo(data.location, data.id)}
                  key={`${index}_${data.id}`}
                  position={data.location}
                  // labelVisible
                  animation={window.google.maps.Animation.DROP}
                  labelAnchor={new window.google.maps.Point(0, 0)}
                  labelStyle={{
                    fontSize: '10px',
                    padding: '5px'
                  }}
                >
                  <div>
                    {data.data && data.data.message ? (
                      <MessageBox
                        position={'left'}
                        type={'text'}
                        date={new Date(data.updated)}
                        text={<p>{data.data.message}</p>}
                      />
                    ) : null}
                  </div>
                </MarkerWithLabel>)
            })}
          </GoogleMap>
        </div>
        <div
          key='chat'
          style={{
            position: 'absolute',
            left: 5,
            bottom: 25,
            width: 'calc(100% - 60px)'
          }}>
          <Input
            value={message}
            ref='inputChat'
            placeholder='Type here...'
            onChange={this.onChange}
            fullWidth
            style={{
              backgroundColor: '#ffffff',
              opacity: 0.85,
              paddingLeft: 10,
              paddingRight: 10
            }}
            id='input-with-icon-adornment'
            endAdornment={
              <Button
                color='success'
                size='lg'
                onClick={this.send}
                text='Send'>
                Send
              </Button>
            }
          />
        </div>
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  chip: {
    margin: theme.spacing.unit
  }
})

export default withStyles(styles)(withScriptjs(withGoogleMap(Map)))
