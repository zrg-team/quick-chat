import { connect } from 'react-redux'
import YourQRCode from '../components/YourQRCode'
import { loading } from '../../../common/middlewares/effects'
import { MODULE_NAME as MODULE_USER } from '../models'
import { createRoom } from '../../room/repository'
import { getUser, addUserRooms } from '../repository'
import { setFriend } from '../actions'

const mapDispatchToProps = (dispatch, props) => ({
  searchFriend: async (uid) => {
    const result = await loading(async () => {
      try {
        if (!uid) {
          return dispatch(setFriend(null))
        }
        const result = await getUser({ uid })
        if (result) {
          dispatch(setFriend(result))
          return true
        }
        dispatch(setFriend(null))
        return false
      } catch (err) {
        console.log('err', err)
        return false
      }
    })
    return result
  },
  makeFriend: async (user, friend, message = 'Chat with me ?') => {
    const result = await loading(async () => {
      try {
        const data = {
          count: 0,
          enable: true,
          guest: friend.uid,
          guestName: friend.email,
          host: user.uid,
          hostName: user.email,
          message,
          guestPublic: friend.publicKey,
          userPublic: user.publicKey
        }
        const result = await createRoom(data)
        if (result && result.room) {
          const response = await addUserRooms(user, {
            ...data,
            id: result.room.id
          })
          response && dispatch(setFriend(null))
          return response || false
        }
        return false
      } catch (err) {
        console.log('err', err)
        return false
      }
    })
    return result
  }
})

const mapStateToProps = state => ({
  user: state[MODULE_USER].userInformation,
  friend: state[MODULE_USER].friend
})

export default connect(mapStateToProps, mapDispatchToProps)(YourQRCode)
