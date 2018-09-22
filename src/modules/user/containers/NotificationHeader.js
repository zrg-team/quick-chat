import { connect } from 'react-redux'
import NotificationHeader from '../components/NotificationHeader'
import { MODULE_NAME as MODULE_USER } from '../models'
import { setNotification } from '../actions'
import { clearNotification } from '../repository'

const mapDispatchToProps = (dispatch, props) => ({
  clearNotification: async (user, notifications) => {
    try {
      await clearNotification(user)
      dispatch(setNotification([]))
    } catch (err) {

    }
  }
})

const mapStateToProps = state => ({
  notifications: state[MODULE_USER].notifications,
  user: state[MODULE_USER].userInformation
})

export default connect(mapStateToProps, mapDispatchToProps)(NotificationHeader)
