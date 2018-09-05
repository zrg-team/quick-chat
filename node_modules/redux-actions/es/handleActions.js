function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import reduceReducers from 'reduce-reducers';
import invariant from 'invariant';
import isPlainObject from './utils/isPlainObject';
import isMap from './utils/isMap';
import ownKeys from './utils/ownKeys';
import flattenReducerMap from './utils/flattenReducerMap';
import handleAction from './handleAction';

function get(key, x) {
  return isMap(x) ? x.get(key) : x[key];
}

export default function handleActions(handlers, defaultState) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  invariant(isPlainObject(handlers) || isMap(handlers), 'Expected handlers to be a plain object.');
  var flattenedReducerMap = flattenReducerMap(handlers, options);
  var reducers = ownKeys(flattenedReducerMap).map(function (type) {
    return handleAction(type, get(type, flattenedReducerMap), defaultState);
  });
  var reducer = reduceReducers.apply(undefined, _toConsumableArray(reducers));
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
    var action = arguments[1];
    return reducer(state, action);
  };
}