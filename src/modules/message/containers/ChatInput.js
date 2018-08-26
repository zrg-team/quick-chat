import { connect } from 'react-redux'
import ChatInput from '../components/ChatInput'
import { cryptMe } from '../../../common/utils/cryptography'
import { MODULE_NAME as MODULE_USER } from '../../user/models'
import { MODULE_NAME as MODULE_MESSAGE } from '../../message/models'
import { sendMessage, buzzMessage } from '../repository'

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
  buzz: (user, selected, unread) => {
    return buzzMessage(user, selected, unread)
  }
})

const mapStateToProps = state => {
  const selected = state[MODULE_MESSAGE].selected
  const stage = state[MODULE_MESSAGE].stage[selected.id]
  return {
    selected,
    user: state[MODULE_USER].userInformation,
    room: state[MODULE_MESSAGE].selected,
    unread: (stage && stage.unread) || 0
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatInput)
