import { connect } from 'react-redux'
import storeAccessible from '../../../common/utils/storeAccessible'
import { loading } from '../../../common/middlewares/effects'
import { MODULE_NAME as MODULE_USER } from '../../user/models'
import { MODULE_NAME as MODULE_PUBLIC } from '../../publics/models'
import { setPublicMessage } from '../actions'
import Messages from '../components/Messages'
import { getMessages } from '../repository'

let instanceMessage = null
function parseMessages (data, user) {
  const arrs = []
  const { offset } = storeAccessible.getModuleState(MODULE_PUBLIC)
  let max = offset
  data && data.forEach((childSnapshot) => {
    const childKey = childSnapshot.key
    const childData = childSnapshot.val()
    const sender = user.uid === childData.from
    if (+offset < +childData.time) {
      max = max < childData.time ? childData.time : max
      arrs.push({
        key: childKey,
        id: childKey,
        title: sender
          ? undefined : childData.name,
        position: sender ? 'right' : 'left',
        type: 'text',
        text: childData.text,
        className: 'message-box-container',
        date: childData.time
      })
    }
  })
  return { arrs, offset: max }
}
const mapDispatchToProps = (dispatch, props) => ({
  getMessages: async (user, offset) => {
    const result = await loading(async () => {
      if (instanceMessage) {
        instanceMessage.off()
      }
      await getMessages((data) => {
        const { arrs, offset: newOffset } = parseMessages([data], user)
        dispatch(setPublicMessage({
          data: arrs,
          offset: newOffset
        }))
      })
      return true
    })
    return result
  }
})

const mapStateToProps = state => {
  return {
    user: state[MODULE_USER].userInformation,
    messages: state[MODULE_PUBLIC].messages,
    offset: state[MODULE_PUBLIC].offset
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
