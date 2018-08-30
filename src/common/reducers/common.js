import { handleActions } from 'redux-actions'
import * as actions from '../actions/common'

const defaultState = {
  language: 'en',
  sessionSecurity: null,
  sessionKey: null,
  approveID: null,
  messageToken: null
}

const handlers = {
  [actions.setUserLanguage]: (state, action) => {
    return {
      ...state,
      language: action.payload
    }
  },
  [actions.setUserSessionKey]: (state, action) => {
    return {
      ...state,
      sessionKey: action.payload
    }
  },
  [actions.setUserSessionSecurity]: (state, action) => {
    return {
      ...state,
      sessionSecurity: action.payload
    }
  },
  [actions.setUserMessageToken]: (state, action) => {
    return {
      ...state,
      messageToken: action.payload
    }
  }
}

export default handleActions(handlers, defaultState)
