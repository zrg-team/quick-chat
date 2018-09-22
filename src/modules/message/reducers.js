import { handleActions } from 'redux-actions'
import * as actions from './actions'

const defaultState = {
  selected: null,
  stage: {},
  messages: {}
}

const handlers = {
  [actions.setMessages]: (state, action) => ({
    ...state,
    messages: {
      ...state.messages,
      [action.payload.key]: [
        ...state.messages[action.payload.key] ? state.messages[action.payload.key] : [],
        ...action.payload.data
      ]
    },
    stage: {
      ...state.stage,
      [action.payload.key]: {
        unread: action.payload.isReaded
          ? action.payload.isReaded || 0
          : 0,
        offset: action.payload.offset
          ? action.payload.offset
          : state.stage[action.payload.key].offset
      }
    }
  }),
  [actions.setCurrentRoom]: (state, action) => ({
    ...state,
    selected: action.payload
  })
}

export default handleActions(handlers, defaultState)
