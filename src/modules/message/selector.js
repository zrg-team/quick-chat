import React from 'react'
import { createSelector } from 'reselect'
import { MODULE_NAME as MODULE_MESSAGE } from './models'
import { getMe } from '../../common/utils/cryptography'
const ReactMarkdown = require('react-markdown')

const getMessages = (state) => {
  const room = state[MODULE_MESSAGE].selected
  return room ? state[MODULE_MESSAGE].messages[room.id] : []
}
const getRoom = (state) => state[MODULE_MESSAGE].selected

export const selectorMessages = createSelector(
  [ getMessages, getRoom ],
  (messages, room) => {
    if (!room || !room.shared || !messages) {
      return []
    }
    return messages.map((item) => {
      try {
        const type = ['text', 'url', 'markdown'].includes(item.type) ? 'text' : item.type
        const data = getMe(item.data, room.shared)
        let text = ''
        let objectData = {}
        switch (item.type) {
          case 'url':
            text = <a target='_blank' href={data}>{data}</a>
            break
          case 'text':
            text = <p>{data}</p>
            break
          case 'location':
            objectData = JSON.parse(data)
            break
          case 'markdown':
            text = <ReactMarkdown source={data} />
            break
        }
        return {
          title: item.sender ? undefined : room.guestName,
          position: item.sender ? 'right' : 'left',
          type: type,
          text,
          data: objectData,
          apiKey: 'AIzaSyCAQuBBJQNTGF3mMDGC1IX7Kkf-5Szop18',
          date: new Date(item.time)
        }
      } catch (err) {
        return undefined
      }
    }).filter(item => item)
  }
)
