import { connect } from 'react-redux'
import Map from '../components/Map'
import { MODULE_NAME as MODULE_MAP } from '../models'
import { MODULE_NAME as MODULE_USER } from '../../user/models'
import { updateLocation, watchLocations } from '../repository'
import { setMyLocation, setLocations, deleteLocations } from '../actions'
import { selectorLocations } from '../selector'

const mapDispatchToProps = (dispatch, props) => ({
  updateLocation: async (user, location) => {
    try {
      const { room } = props
      const result = await updateLocation(room, user, location)
      if (result) {
        dispatch(setMyLocation({ location, hash: result }))
      }
    } catch (err) {
      console.log('updateLocation', err)
      return false
    }
  },
  watchLocations: () => {
    const { room } = props
    watchLocations(room, ({ message }) => {
      const from = message.from
      const data = JSON.parse(message.data.toString())
      dispatch(setLocations({from, data}))
    }, () => {

    }, (peer) => {
      dispatch(deleteLocations(peer))
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
