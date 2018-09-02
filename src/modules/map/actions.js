import { createAction } from 'redux-actions'
import { MODULE_NAME } from './models'

export const setMyLocation = createAction(`${MODULE_NAME}_setMyLocation`)
export const setLocations = createAction(`${MODULE_NAME}_setLocations`)
