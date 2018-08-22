import {
  push,
  goBack,
  replace as funcReplace
} from 'react-router-redux'
import storeAccessible from './storeAccessible'

export function next (path) {
  storeAccessible.dispatch(push(path))
}

export function back () {
  storeAccessible.dispatch(goBack())
}

export function replace (path) {
  storeAccessible.dispatch(funcReplace(path))
}
