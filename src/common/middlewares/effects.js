import axios from 'axios'
import { TIMEOUT } from '../models'
import {
  fetchStart,
  fetchSuccess,
  fetchFailure,
  loadStart,
  loadEnd
} from '../actions/session'
import storeAccessible from '../utils/storeAccessible'

export async function loading (fetchingProcess, done = undefined) {
  storeAccessible.dispatch(loadStart({config: {key: 'loading'}}))
  try {
    const ret = await fetchingProcess()
    storeAccessible.dispatch(loadEnd({config: {key: 'loading'}}))
    if (done) {
      await done()
    }
    return ret
  } catch (error) {
    storeAccessible.dispatch(loadEnd({config: {key: 'loading'}}))
    console.log('ERROR', error)
    throw error
  }
}

export function fetch ({ url, ...options }) {
  if (!url) {
    return false
  }
  return axios({
    method: 'GET',
    timeout: TIMEOUT,
    url,
    ...options
  }).then((response) => {
    return response
  }).catch(error => {
    throw error
  })
}

export function fetchLoading ({ url, options = {} }, dispatch = null) {
  if (!url) {
    return false
  }
  dispatch && dispatch(fetchStart({config: { key: url }}))
  return axios({
    method: 'get',
    timeout: TIMEOUT,
    url,
    ...options
  }).then((response) => {
    dispatch && dispatch(fetchSuccess({config: { key: url }}))
    return response
  }).catch(() => {
    dispatch && dispatch(fetchFailure({config: { key: url }}))
    throw new Error('Timeout')
  })
}
