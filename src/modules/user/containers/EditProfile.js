import { connect } from 'react-redux'
import { MODULE_NAME as MODULE_USER } from '../models'
import { updateUserInformation } from '../repository'
import EditProfile from '../components/EditProfile'

const mapDispatchToProps = (dispatch, props) => ({
  updateUserInfo: async (userId, userInfo) => {
    try {
      let result = await updateUserInformation(userId, userInfo)
      return result
    } catch (err) {
      console.log('update err', err)
      return undefined
    }
  }
})

const mapStateToProps = state => {
  return {
    user: state[MODULE_USER].userInformation
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
