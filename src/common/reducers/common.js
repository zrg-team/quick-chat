import { handleActions } from 'redux-actions'
import * as actions from '../actions/common'

const defaultState = {
  language: 'en',
  needed: null
}

const handlers = {
  [actions.setUserLanguage]: (state, action) => {
    return {
      ...state,
      language: action.payload
    }
  },
  [actions.setUserNeed]: (state, action) => {
    return {
      ...state,
      needed: action.payload
    }
  }
}

export default handleActions(handlers, defaultState)
