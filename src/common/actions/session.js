import { createAction } from 'redux-actions'

export const fetchStart = createAction('API_FETCH_START')
export const fetchSuccess = createAction('API_FETCH_SUCCESS')
export const fetchFailure = createAction('API_FETCH_FAILURE')

export const loadStart = createAction('loading_start')
export const loadEnd = createAction('loading_end')

export const authetication = createAction('authetication')

export const setUserApproveHash = createAction(`SET_USER_APPROVE_HASH`)
