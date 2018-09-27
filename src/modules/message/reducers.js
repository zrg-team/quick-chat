import { handleActions } from 'redux-actions'
import * as actions from './actions'

const defaultState = {
  selected: null,
  stage: {},
  messages: {},
  transactions: {}
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
  [actions.setTransactions]: (state, action) => ({
    ...state,
    transactions: {
      ...state.transactions,
      [action.payload.key]: [
        ...state.transactions[action.payload.key] ? state.transactions[action.payload.key] : [],
        ...action.payload.data
      ]
    },
    stage: {
      ...state.stage,
      [action.payload.key]: {
        ...state.stage[action.payload.key],
        transactionOffset: action.payload.offset
          ? action.payload.offset
          : state.stage[action.payload.key].transactionOffset
      }
    }
  }),
  [actions.setCurrentRoom]: (state, action) => ({
    ...state,
    selected: action.payload
  })
}

export default handleActions(handlers, defaultState)
