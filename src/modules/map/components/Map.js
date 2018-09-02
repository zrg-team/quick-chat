import React, { Component } from 'react'
import { MAP_OPTIONS } from '../../../common/models'
import Notification from '../../../common/components/widgets/Notification'
import userPin from '../../../assets/images/userPin.png'
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer
} = require('react-google-maps')
const { MarkerWithLabel } = require('react-google-maps/lib/components/addons/MarkerWithLabel')

class Map extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchText: ''
    }
    this.intervalLocation = null
    this.updateLocationProcess = this.updateLocationProcess.bind(this)
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
  updateLocationProcess () {
    const { updateLocation, user, hash } = this.props
    if (navigator.geolocation) {
      this.intervalLocation = navigator.geolocation.watchPosition((position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        updateLocation(user, { lat: latitude, lng: longitude }, hash)
      }, () => {
        Notification.warning("Can't get your location.")
      }, {
        enableHighAccuracy: false,
        timeout: 300000,
        maximumAge: 0
      })
    } else {
      Notification.warning('Geolocation is not supported by this browser.')
    }
  }
  componentDidMount () {
    const { watchLocations } = this.props
    watchLocations()
    // const { google } = this.props
    // console.log('>>>||<<<<', this.props, google)
    // const DirectionsService = new google.maps.DirectionsService()

    // DirectionsService.route({
    //   origin: new google.maps.LatLng(41.8507300, -87.6512600),
    //   destination: new google.maps.LatLng(41.8525800, -87.6514100),
    //   travelMode: google.maps.TravelMode.DRIVING
    // }, (result, status) => {
    //   if (status === google.maps.DirectionsStatus.OK) {
    //     this.setState({
    //       directions: result
    //     })
    //   } else {
    //     console.error(`error fetching directions ${result}`)
    //   }
    // })
  }
  render () {
    const { location, locations, directions } = this.props
    if (!location) {
      return null
    }
    return (
      <GoogleMap
        defaultZoom={18}
        defaultCenter={location}
        defaultOptions={MAP_OPTIONS}
        center={location}
      >
        {directions && <DirectionsRenderer directions={directions} />}
        <Marker
          position={location}
        />
        {locations && locations.map((data, index) => {
          return (
            <MarkerWithLabel
              icon={{
                url: userPin,
                scaledSize: new window.google.maps.Size(31, 43)
              }}
              key={`${index}_${data.user.uid}`}
              position={data.location}
              labelVisible
              animation={window.google.maps.Animation.DROP}
              labelAnchor={new window.google.maps.Point(31, 43)}
              labelStyle={{
                backgroundColor: '#4b86b4',
                fontSize: '10px',
                padding: '5px',
                color: '#ffffff'
              }}
            >
              <div>{ data.user ? data.user.email : 'No Name' }</div>
            </MarkerWithLabel>
          )
        })}
      </GoogleMap>
    )
  }
}

export default withScriptjs(withGoogleMap(Map))
