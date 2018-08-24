import { connect } from 'react-redux'
import { loading } from '../../../common/middlewares/effects'
import { getMe } from '../../../common/utils/cryptography'
import storeAccessible from '../../../common/utils/storeAccessible'
import { MODULE_NAME as MODULE_USER } from '../../user/models'
import { MODULE_NAME as MODULE_MESSAGE } from '../../message/models'
import Messages from '../components/Messages'
import { getMessages } from '../repository'
import { setMessages } from '../actions'

let messageListener = null
function parseDocs (data) {
  const docs = []
  const { selected, stage } = storeAccessible.getModuleState(MODULE_MESSAGE)
  if (!selected) {
    return []
  }
  const offset = stage[selected.id] ? stage[selected.id].offset : -1
  let max = offset
  data.forEach(doc => {
    const item = doc.data()
    const timestamp = item.time
    if (timestamp && timestamp.seconds && timestamp.seconds > +offset) {
      max = +max > +timestamp.seconds ? +max : +timestamp.seconds
      docs.push({
        data: getMe(item.data, selected.shared),
        from: item.from,
        time: timestamp.seconds,
        type: item.type,
        meta: item.meta ? {
          link: item.meta.link
        } : {},
        uid: doc.id
      })
    }
  })
  return { docs: docs.sort((next, pre) => next.time - pre.time), max }
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
            const { docs, max } = parseDocs(data)
            dispatch(setMessages({
              key: room.id,
              data: docs,
              offset: max
            }))
          }
          first = false
        })
        messageListener = instance
        const { docs, max } = parseDocs(data)
        dispatch(setMessages({
          key: room.id,
          data: docs,
          offset: max
        }))
        return true
      } catch (err) {
        console.log(err)
        return false
      }
    })
    return result
  }
})

const mapStateToProps = state => {
  const selected = state[MODULE_MESSAGE].selected
  return {
    selected,
    user: state[MODULE_USER].userInformation,
    offset: (state[MODULE_MESSAGE].stage[selected.id] &&
      state[MODULE_MESSAGE].stage[selected.id].offset) || -1,
    messages: (selected && state[MODULE_MESSAGE][selected.id]) || []
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
