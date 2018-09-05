function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import { DEFAULT_NAMESPACE, ACTION_TYPE_DELIMITER } from '../constants';
import isMap from './isMap';
import ownKeys from './ownKeys';

function get(key, x) {
  return isMap(x) ? x.get(key) : x[key];
}

export default (function (predicate) {
  return function flatten(map) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$namespace = _ref.namespace,
        namespace = _ref$namespace === undefined ? DEFAULT_NAMESPACE : _ref$namespace,
        prefix = _ref.prefix;

    var partialFlatMap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var partialFlatActionType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

    function connectNamespace(type) {
      var _ref2;

      if (!partialFlatActionType) return type;
      var types = type.toString().split(ACTION_TYPE_DELIMITER);
      var partials = partialFlatActionType.split(ACTION_TYPE_DELIMITER);
      return (_ref2 = []).concat.apply(_ref2, _toConsumableArray(partials.map(function (p) {
        return types.map(function (t) {
          return '' + p + namespace + t;
        });
      }))).join(ACTION_TYPE_DELIMITER);
    }

    function connectPrefix(type) {
      if (partialFlatActionType || !prefix) {
        return type;
      }

      return '' + prefix + namespace + type;
    }

    ownKeys(map).forEach(function (type) {
      var nextNamespace = connectPrefix(connectNamespace(type));
      var mapValue = get(type, map);

      if (predicate(mapValue)) {
        flatten(mapValue, { namespace: namespace, prefix: prefix }, partialFlatMap, nextNamespace);
      } else {
        partialFlatMap[nextNamespace] = mapValue;
      }
    });

    return partialFlatMap;
  };
});