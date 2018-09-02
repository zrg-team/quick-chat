import { connect } from 'react-redux'
import Map from '../components/Map'
import { MODULE_NAME as MODULE_MAP } from '../models'
import { MODULE_NAME as MODULE_USER } from '../../user/models'
import { updateLocation, watchLocations } from '../repository'
import { setMyLocation, setLocations } from '../actions'

const mapDispatchToProps = (dispatch, props) => ({
  updateLocation: async (user, location, hash) => {
    try {
      const newHash = await updateLocation(user, location, hash)
      if (newHash) {
        dispatch(setMyLocation({ location, hash: newHash }))
      }
    } catch (err) {
      console.log('updateLocation', err)
      return false
    }
  },
  watchLocations: () => {
    watchLocations(({ data }) => {
      dispatch(setLocations(data))
    })
  }
})

const mapStateToProps = state => ({
  hash: state[MODULE_MAP].hash,
  location: state[MODULE_MAP].location,
  locations: state[MODULE_MAP].locations,
  user: state[MODULE_USER].userInformation
})

export default connect(mapStateToProps, mapDispatchToProps)(Map)
