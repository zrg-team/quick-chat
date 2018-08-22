import { handleActions } from 'redux-actions'
import * as actions from './actions'

const defaultState = {
  selected: null,
  history: {},
  stage: {}
}

const handlers = {
  [actions.setMessages]: (state, action) => ({
    ...state,
    [action.payload.key]: [
      ...state[action.payload.key] ? state[action.payload.key] : [],
      ...action.payload.data
    ],
    stage: {
      ...state.stage,
      [action.payload.key]: {
        offset: action.payload.offset
          ? action.payload.offset
          : state.stage[action.payload.key].offset
      }
    },
    history: {
      ...state.history,
      [action.payload.key]: [
        ...state.history[action.payload.key] ? state.history[action.payload.key] : [],
        ...action.payload.data
      ]
    }
  }),
  [actions.setCurrentRoom]: (state, action) => ({
    ...state,
    selected: action.payload
  })
}

export default handleActions(handlers, defaultState)
