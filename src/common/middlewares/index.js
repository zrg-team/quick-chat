import { all } from 'redux-saga/effects'
import commonSagas from './sagas'

export default getState => {
  function * rootSaga () {
    yield all([
      ...commonSagas
    ])
  }
  return rootSaga
}
