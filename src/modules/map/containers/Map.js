import { connect } from 'react-redux'
import Map from '../components/Map'
import { MODULE_NAME as MODULE_MAP } from '../models'
import { MODULE_NAME as MODULE_USER } from '../../user/models'
import { updateLocation, watchLocations, checkAround } from '../repository'
import { setMyLocation, setLocations } from '../actions'
import { selectorLocations } from '../selector'

const mapDispatchToProps = (dispatch, props) => ({
  updateLocation: async (user, location) => {
    try {
      const result = await updateLocation(user, location)
      if (result) {
        dispatch(setMyLocation({ location, hash: result }))
      }
    } catch (err) {
      console.error('updateLocation', err)
      return false
    }
  },
  updateMessage: async (user, location, message) => {
    try {
      const result = await updateLocation(user, location, message)
      if (result) {
        dispatch(setMyLocation({ location, hash: result }))
      }
    } catch (err) {
      console.log('updateLocation', err)
      return false
    }
  },
  watchLocations: (user) => {
    watchLocations(({ message }) => {
      const from = message.from
      const data = JSON.parse(message.data.toString())
      if (checkAround(data)) {
        dispatch(setLocations({
          from,
          data: {
            ...data,
            id: from
          }
        }))
      }
    })
  }
})

const mapStateToProps = state => ({
  hash: state[MODULE_MAP].hash,
  location: state[MODULE_MAP].location,
  locations: selectorLocations(state),
  user: state[MODULE_USER].userInformation
})

export default connect(mapStateToProps, mapDispatchToProps)(Map)
