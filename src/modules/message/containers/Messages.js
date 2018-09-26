import { connect } from 'react-redux'
import { loading } from '../../../common/middlewares/effects'
// import { getMe } from '../../../common/utils/cryptography'
import storeAccessible from '../../../common/utils/storeAccessible'
import { MODULE_NAME as MODULE_USER } from '../../user/models'
import { MODULE_NAME as MODULE_MESSAGE } from '../../message/models'
import Messages from '../components/Messages'
import { getMessages, readed } from '../repository'
import { setMessages } from '../actions'
// import { setSessionMessages } from '../../../common/actions/session'
import { selectorMessages } from '../selector'
import { mapDispatchToProps as chatContainer } from './ChatInput'

let messageListener = null
function parseMessages (data) {
  const docs = []
  // const messages = []
  const { selected, stage } = storeAccessible.getModuleState(MODULE_MESSAGE)
  const { userInformation } = storeAccessible.getModuleState(MODULE_USER)
  if (!selected) {
    return []
  }
  const offset = stage[selected.id] ? stage[selected.id].offset : -1
  let max = offset
  let isReaded = stage[selected.id] ? stage[selected.id].unread : 0
  data.forEach(doc => {
    const item = doc.data()
    const timestamp = item.time
    if (timestamp && timestamp > +offset) {
      max = +max > +timestamp ? +max : +timestamp
      const sender = userInformation.uid === item.from
      isReaded = !sender || isReaded === undefined
        ? undefined : isReaded + 1
      const data = {
        sender,
        from: item.from,
        time: timestamp,
        type: item.type,
        meta: item.meta ? {
          link: item.meta.link
        } : {},
        uid: doc.id
      }
      docs.push({
        ...data,
        data: item.data
      })
      // messages.push({
      //   ...data,
      //   data: getMe(item.data, selected.shared)
      // })
    }
  })
  return {
    docs: docs.sort((next, pre) => next.time - pre.time),
    max,
    isReaded
    // messages: messages.sort((next, pre) => next.time - pre.time)
  }
}
const mapDispatchToProps = (dispatch, props) => ({
  getMessages: async (room, offset) => {
    const result = await loading(async () => {
      try {
        let first = true
        if (messageListener) {
          messageListener()
          messageListener = null
        }
        const { data, instance } = await getMessages(room, offset, ({ data }) => {
          if (!first) {
            const { docs, max, isReaded } = parseMessages(data)
            dispatch(setMessages({
              key: room.id,
              data: docs,
              offset: max,
              isReaded
            }))
          }
          first = false
        })
        messageListener = instance
        const { docs, max, isReaded } = parseMessages(data)
        readed({ ...room, uid: room.id })
        dispatch(setMessages({
          key: room.id,
          data: docs,
          offset: max,
          isReaded
        }))
        return true
      } catch (err) {
        console.log(err)
        return false
      }
    })
    return result
  },
  ...chatContainer(dispatch, props)
})

const mapStateToProps = state => {
  const selected = state[MODULE_MESSAGE].selected
  return {
    selected,
    user: state[MODULE_USER].userInformation,
    offset: (state[MODULE_MESSAGE].stage[selected.id] &&
      state[MODULE_MESSAGE].stage[selected.id].offset) || -1,
    messages: selectorMessages(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
