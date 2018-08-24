import { connect } from 'react-redux'
import ChatInput from '../components/ChatInput'
import { cryptMe } from '../../../common/utils/cryptography'
import { MODULE_NAME as MODULE_USER } from '../../user/models'
import { MODULE_NAME as MODULE_MESSAGE } from '../../message/models'
import { sendMessage } from '../repository'
import { markReaded } from '../../room/repository'

const mapDispatchToProps = (dispatch, props) => ({
  send: async (user, selected, {
    message
  }, type = 'text') => {
    try {
      await sendMessage(user, selected, {
        data: cryptMe(message, selected.shared),
        from: user.uid,
        type
      })
    } catch (err) {
      console.log('send err', err)
    }
  },
  markReaded: async (room) => {
    try {
      await markReaded(room)
    } catch (err) {
      console.log('send err', err)
    }
  }
})

const mapStateToProps = state => {
  const selected = state[MODULE_MESSAGE].selected
  return {
    selected,
    user: state[MODULE_USER].userInformation,
    room: state[MODULE_MESSAGE].selected
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatInput)
