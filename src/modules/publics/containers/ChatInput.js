import { connect } from 'react-redux'
import ChatInput from '../components/ChatInput'
import { MODULE_NAME as MODULE_USER } from '../../user/models'
import { pushMessage } from '../repository'

const mapDispatchToProps = (dispatch, props) => ({
  send: async (user, {
    message
  }) => {
    try {
      await pushMessage({
        from: user.uid,
        name: user.email,
        text: message
      })
    } catch (err) {
      console.log('send err', err)
    }
  }
})

const mapStateToProps = state => {
  return {
    user: state[MODULE_USER].userInformation
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatInput)
