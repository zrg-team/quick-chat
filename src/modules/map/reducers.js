import { handleActions } from 'redux-actions'
import * as actions from './actions'

const defaultState = {
  location: null,
  hash: null,
  locations: []
}

const handlers = {
  [actions.setMyLocation]: (state, action) => ({
    ...state,
    hash: action.payload.hash,
    location: action.payload.location
  }),
  [actions.setLocations]: (state, action) => ({
    ...state,
    locations: action.payload
  })
}

export default handleActions(handlers, defaultState)
