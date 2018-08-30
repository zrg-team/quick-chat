import { createAction } from 'redux-actions'
import { MODULE_NAME } from './models'

export const setPublicMessage = createAction(`${MODULE_NAME}_setPublicMessage`)
