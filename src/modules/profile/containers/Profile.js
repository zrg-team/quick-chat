import { connect } from 'react-redux'
import { MODULE_NAME as MODULE_USER } from '../../user/models'
import { getProfile, updateProfile } from '../repository'
import Profile from '../components/Profile'

const mapDispatchToProps = (dispatch, props) => ({
  getUserInfo: async (userId) => {
    try {
      let result = await getProfile(userId)
      return result
    } catch (err) {
      console.log('get err', err)
    }
  },
  updateUserInfo: async (userId, userInfo) => {
    try {
      let result = await updateProfile(userId, userInfo)
      return result
    } catch (err) {
      console.log('update err', err)
    }
  }
})

const mapStateToProps = state => {
  return {
    user: state[MODULE_USER].userInformation
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
