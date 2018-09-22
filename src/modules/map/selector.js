import { createSelector } from 'reselect'
import { MODULE_NAME as MODULE_MAP } from './models'

const getLocations = (state) => {
  return state[MODULE_MAP].locations
}

export const selectorLocations = createSelector(
  [ getLocations ],
  (locations) => {
    try {
      return Object.keys(locations).map(key => {
        const data = locations[key]
        return data
      }) || []
    } catch (err) {
      return []
    }
  }
)
