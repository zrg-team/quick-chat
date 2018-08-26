import { createAction } from 'redux-actions'

export const fetchStart = createAction('API_FETCH_START')
export const fetchSuccess = createAction('API_FETCH_SUCCESS')
export const fetchFailure = createAction('API_FETCH_FAILURE')

export const loadStart = createAction('LOADING_START')
export const loadEnd = createAction('LOADING_END')

export const authetication = createAction('AUTHENTICATION')

export const setUserApproveHash = createAction(`SET_USER_APPROVE_HASH`)

export const setSessionMessages = createAction(`SET_SESSION_MESSAGE`)
