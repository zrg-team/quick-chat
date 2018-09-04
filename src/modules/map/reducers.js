import { handleActions } from 'redux-actions'
import * as actions from './actions'

const defaultState = {
  location: null,
  hash: null,
  locations: {}
}

const handlers = {
  [actions.setMyLocation]: (state, action) => ({
    ...state,
    hash: action.payload.hash,
    location: action.payload.location
  }),
  [actions.deleteLocations]: (state, action) => {
    const locations = state.locations
    delete locations[action.payload]
    return {
      ...state,
      locations: {
        ...locations
      }
    }
  },
  [actions.setLocations]: (state, action) => {
    if (!state.locations[action.payload.from] &&
      Object.keys(state.locations) >= 256) {
      return state
    }
    return {
      ...state,
      locations: {
        ...state.locations,
        [action.payload.from]: {
          ...state.locations[action.payload.from]
           ? state.locations[action.payload.from] : {},
          ...action.payload.data
        }
      }
    }
  }
}

export default handleActions(handlers, defaultState)
