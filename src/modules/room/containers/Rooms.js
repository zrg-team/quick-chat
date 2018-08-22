import { connect } from 'react-redux'
import { loading } from '../../../common/middlewares/effects'
import { next } from '../../../common/utils/navigation'
import { MODULE_NAME as MODULE_USER } from '../../user/models'
import { MODULE_NAME as MODULE_ROOM } from '../../room/models'
import Rooms from '../components/Rooms'
import { getUserRooms } from '../../user/repository'
import { setRooms } from '../actions'
import { setCurrentRoom } from '../../message/actions'

let roomListener = null
function parseDocs (data) {
  const docs = []
  data.forEach(doc => {
    const item = doc.data()
    docs.push({
      count: item.count,
      enable: item.enable,
      guest: item.guest,
      guestName: item.guestName,
      message: item.message,
      host: item.host,
      id: item.id,
      latest: item.latest,
      uid: doc.id
    })
  })
  return docs
}
const mapDispatchToProps = (dispatch, props) => ({
  getRooms: async (user) => {
    const result = await loading(async () => {
      try {
        let first = true
        if (roomListener) {
          roomListener()
          roomListener = null
        }
        const { data, instance } = await getUserRooms(user, ({ data }) => {
          if (!first) {
            const docs = parseDocs(data)
            dispatch(setRooms(docs))
          }
          first = false
        })
        roomListener = instance
        const docs = parseDocs(data)
        dispatch(setRooms(docs))
        return true
      } catch (err) {
        console.log(err)
        return false
      }
    })
    return result
  },
  goTo: (room) => {
    dispatch(setCurrentRoom(room))
    setTimeout(() => {
      next('/message')
    }, 100)
  }
})

const mapStateToProps = state => ({
  user: state[MODULE_USER].userInformation,
  rooms: state[MODULE_ROOM].rooms,
  notifications: state[MODULE_USER].notifications
})

export default connect(mapStateToProps, mapDispatchToProps)(Rooms)
