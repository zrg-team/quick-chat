'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('../../polyfills/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _all = require('../../../data/all.json');

var _all2 = _interopRequireDefault(_all);

var _nimbleEmoji = require('./nimble-emoji');

var _nimbleEmoji2 = _interopRequireDefault(_nimbleEmoji);

var _sharedProps = require('../../utils/shared-props');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Emoji = function Emoji(props) {
  for (var k in Emoji.defaultProps) {
    if (props[k] == undefined && Emoji.defaultProps[k] != undefined) {
      props[k] = Emoji.defaultProps[k];
    }
  }

  return (0, _nimbleEmoji2.default)((0, _extends3.default)({}, props));
};

Emoji.propTypes = _sharedProps.EmojiPropTypes;
Emoji.defaultProps = (0, _extends3.default)({}, _sharedProps.EmojiDefaultProps, { data: _all2.default });

exports.default = Emoji;