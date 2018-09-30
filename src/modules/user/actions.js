import { createAction } from 'redux-actions'
import { MODULE_NAME } from './models'

export const signUp = createAction(`${MODULE_NAME}_signUp`)
export const setUserInformation = createAction(`${MODULE_NAME}_setUserInformation`)
export const setFriend = createAction(`${MODULE_NAME}_setFriend`)

export const setNotification = createAction(`${MODULE_NAME}_setNotification`)
export const pushNotification = createAction(`${MODULE_NAME}_pushNotification`)

export const setGuestInformation = createAction(`${MODULE_NAME}_setGuestInformation`)
