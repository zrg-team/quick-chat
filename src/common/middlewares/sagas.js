
import { put, takeEvery, select, takeLatest } from 'redux-saga/effects'
import {
  setSessionMessages,
  setSessionLoading,
  setUserApproveID,
  fetchStart,
  fetchSuccess,
  fetchFailure,
  loadStart,
  loadEnd
} from '../actions/session'
// import PageLoading from '../components/widgets/PageLoading'
import ProgressLoading from '../components/widgets/ProgressLoading'

function * onFetchStart ({ payload: { config } }) {
  yield ProgressLoading.show()
  // console.log('Fetch Start', config)
}

function * onFetchSuccess ({ payload: { response, config } }) {
  yield ProgressLoading.hide()
  // console.log('Fetch Success', config)
}

function * onFetchFailure ({ payload: { error, config } }) {
  yield ProgressLoading.hide()
  // Notification.error(error.message)
  console.error(error)
}

function * watchFetchStart () {
  yield takeEvery(fetchStart.toString(), onFetchStart)
}
function * watchFetchSuccess () {
  yield takeEvery(fetchSuccess.toString(), onFetchSuccess)
}
function * watchFetchFailure () {
  yield takeEvery(fetchFailure.toString(), onFetchFailure)
}

function * onLoadingChanged () {
  // TODO: Do something in redux when loading
  const isLoading = yield select(state => state.session.isLoading)
  const loadingCount = yield select(state => state.session.loadingCount)
  if (isLoading) {
    ProgressLoading.show()
  } else if (loadingCount === 0) {
    ProgressLoading.hideAll()
  }
}

function * onApproveAccessChanged (action) {
  const { payload } = action
  if (payload) {
    yield put({ type: setSessionLoading.toString(), payload: false })
  }
}

function * onPersistChanged (action) {
  const { payload } = action
  if (payload && payload.common && payload.common.sessionSecurity) {
    yield put({ type: setSessionLoading.toString(), payload: true })
  }
}

function * watchLoadStart () {
  yield takeEvery(loadStart.toString(), onLoadingChanged)
}

function * watchLoadEnd () {
  yield takeEvery(loadEnd.toString(), onLoadingChanged)
}

function * watchApproveAccess () {
  yield takeEvery(setUserApproveID.toString(), onApproveAccessChanged)
}

function * watchSessionSecurity () {
  yield takeEvery(setSessionMessages.toString(), onApproveAccessChanged)
}

function * wathPersist () {
  yield takeLatest('persist/REHYDRATE', onPersistChanged)
}

export default [
  watchFetchStart(),
  watchFetchSuccess(),
  watchFetchFailure(),
  watchLoadStart(),
  watchLoadEnd(),
  wathPersist(),
  watchApproveAccess(),
  watchSessionSecurity()
]
