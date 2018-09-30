import { connect } from 'react-redux'
import { setGuestInformation } from '../actions'
import { MODULE_NAME as MODULE_USER } from '../models'
import { getDownloadUrl, updateUserInformation, getUser } from '../repository'
import Profile from '../components/Profile'

const mapDispatchToProps = (dispatch, props) => ({
  getGuestInformation: async (uid) => {
    try {
      let users = await getUser({
        uid
      })
      if (!users) {
        return undefined
      }
      dispatch(setGuestInformation(users))
    } catch (err) {
      console.log('get err', err)
      return undefined
    }
  },
  updateAvatarUrl: async (fileName, user) => {
    try {
      let avatarURL = await getDownloadUrl(fileName, user.uid)
      if (!avatarURL) {
        return null
      }
      return updateUserInformation(user.uid, {
        ...user,
        avatarURL
      })
    } catch (err) {
      console.log('get err', err)
    }
  }
})

const mapStateToProps = (state, props) => {
  const { match: { params } } = props
  let user = state[MODULE_USER].userInformation
  let yourProfile = true
  if (!user || params.uid !== user.uid) {
    user = state[MODULE_USER].guestInformation || {}
    yourProfile = false
  }
  return {
    user,
    yourProfile,
    uid: params.uid
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
