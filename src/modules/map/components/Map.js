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
      searchText: '',
      directions: undefined
    }

    this.intervalLocation = null
    this.directTo = this.directTo.bind(this)
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
  directTo (toLocation) {
    const { location } = this.props
    const DirectionsService = new window.google.maps.DirectionsService()

    DirectionsService.route({
      origin: new window.google.maps.LatLng(location.lat, location.lng),
      destination: new window.google.maps.LatLng(toLocation.lat, toLocation.lng),
      travelMode: window.google.maps.TravelMode.DRIVING
    }, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        this.setState({
          directions: result
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
    const { user, location, locations, directions } = this.props
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
          if (user.uid === data.uid) {
            return null
          }
          return (
            <MarkerWithLabel
              icon={{
                url: userPin,
                scaledSize: new window.google.maps.Size(39, 43)
              }}
              onClick={() => this.directTo(data.location)}
              key={`${index}_${data.uid}`}
              position={data.location}
              labelVisible
              animation={window.google.maps.Animation.DROP}
              labelAnchor={new window.google.maps.Point(60, 65)}
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
