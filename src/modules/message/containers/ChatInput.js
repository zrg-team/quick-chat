import { connect } from 'react-redux'
import ChatInput from '../components/ChatInput'
import { MODULE_NAME as MODULE_USER } from '../../user/models'
import { MODULE_NAME as MODULE_MESSAGE } from '../../message/models'
import { sendMessage } from '../repository'

const mapDispatchToProps = (dispatch, props) => ({
  send: async (user, selected, {
    message
  }, type = 'text') => {
    try {
      await sendMessage(user, selected, {
        data: message,
        from: user.uid,
        type
      })
    } catch (err) {
      console.log('send err', err)
    }
  }
})

const mapStateToProps = state => {
  const selected = state[MODULE_MESSAGE].selected
  return {
    selected,
    user: state[MODULE_USER].userInformation
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatInput)
