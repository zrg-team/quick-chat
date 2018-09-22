import { handleActions } from 'redux-actions'
import * as actions from './actions'

const defaultState = {
  messages: [],
  offset: 0
}

const handlers = {
  [actions.setPublicMessage]: (state, action) => ({
    ...state,
    ...{
      offset: action.payload.offset,
      messages: [
        ...state.messages,
        ...action.payload.data
      ]
    }
  })
}

export default handleActions(handlers, defaultState)
