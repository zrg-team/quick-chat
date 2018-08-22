import { createAction } from 'redux-actions'
import { MODULE_NAME } from './models'

export const setMessages = createAction(`${MODULE_NAME}_setMessages`)
export const setCurrentRoom = createAction(`${MODULE_NAME}_setCurrentRoom`)
