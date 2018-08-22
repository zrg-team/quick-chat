import { handleActions } from 'redux-actions'
import * as actions from './actions'

const defaultState = {
  rooms: [],
  messages: {},
  sync: false
}

const handlers = {
  [actions.setRooms]: (state, action) => ({
    ...state,
    ...{ rooms: [ ...action.payload ] }
  })
}

export default handleActions(handlers, defaultState)
