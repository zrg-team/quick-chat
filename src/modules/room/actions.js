import { createAction } from 'redux-actions'
import { MODULE_NAME } from './models'

export const setRooms = createAction(`${MODULE_NAME}_setRooms`)
