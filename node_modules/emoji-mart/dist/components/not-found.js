'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('../polyfills/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectGetPrototypeOf = require('../polyfills/objectGetPrototypeOf');

var _objectGetPrototypeOf2 = _interopRequireDefault(_objectGetPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('../polyfills/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('../polyfills/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('../polyfills/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ = require('.');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NotFound = function (_React$PureComponent) {
  (0, _inherits3.default)(NotFound, _React$PureComponent);

  function NotFound() {
    (0, _classCallCheck3.default)(this, NotFound);
    return (0, _possibleConstructorReturn3.default)(this, (NotFound.__proto__ || (0, _objectGetPrototypeOf2.default)(NotFound)).apply(this, arguments));
  }

  (0, _createClass3.default)(NotFound, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var data = _props.data;
      var emojiProps = _props.emojiProps;
      var i18n = _props.i18n;
      var notFound = _props.notFound;
      var notFoundEmoji = _props.notFoundEmoji;


      var component = notFound && notFound() || _react2.default.createElement(
        'div',
        { className: 'emoji-mart-no-results' },
        (0, _.NimbleEmoji)((0, _extends3.default)({
          data: data
        }, emojiProps, {
          size: 38,
          emoji: notFoundEmoji,
          onOver: null,
          onLeave: null,
          onClick: null
        })),
        _react2.default.createElement(
          'div',
          { className: 'emoji-mart-no-results-label' },
          i18n.notfound
        )
      );

      return component;
    }
  }]);
  return NotFound;
}(_react2.default.PureComponent);

exports.default = NotFound;