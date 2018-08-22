import { connect } from 'react-redux'
import NotificationHeader from '../components/NotificationHeader'
import { MODULE_NAME as MODULE_USER } from '../models'
import { setNotification } from '../actions'

const mapDispatchToProps = (dispatch, props) => ({
  clearNotification: async () => {
    dispatch(setNotification([]))
  }
})

const mapStateToProps = state => ({
  notifications: state[MODULE_USER].notifications
})

export default connect(mapStateToProps, mapDispatchToProps)(NotificationHeader)
