'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var SkinsEmoji = function (_Skins) {
  (0, _inherits3.default)(SkinsEmoji, _Skins);

  function SkinsEmoji(props) {
    (0, _classCallCheck3.default)(this, SkinsEmoji);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SkinsEmoji.__proto__ || (0, _objectGetPrototypeOf2.default)(SkinsEmoji)).call(this, props));

    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(SkinsEmoji, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var skin = _props.skin;
      var emojiProps = _props.emojiProps;
      var data = _props.data;
      var skinEmoji = _props.skinEmoji;
      var i18n = _props.i18n;
      var opened = this.state.opened;

      var skinToneNodes = [];

      for (var skinTone = 1; skinTone <= 6; skinTone++) {
        var selected = skinTone === skin;
        skinToneNodes.push(_react2.default.createElement(
          'span',
          {
            key: 'skin-tone-' + skinTone,
            className: 'emoji-mart-skin-swatch custom' + (selected ? ' selected' : '')
          },
          _react2.default.createElement(
            'span',
            {
              onClick: this.handleClick,
              'data-skin': skinTone,
              className: 'emoji-mart-skin-tone-' + skinTone
            },
            (0, _.NimbleEmoji)({
              emoji: skinEmoji,
              data: data,
              skin: skinTone,
              backgroundImageFn: emojiProps.backgroundImageFn,
              native: emojiProps.native,
              set: emojiProps.set,
              sheetSize: emojiProps.sheetSize,
              size: 23
            })
          )
        ));
      }

      return _react2.default.createElement(
        'div',
        {
          className: 'emoji-mart-skin-swatches custom' + (opened ? ' opened' : '')
        },
        _react2.default.createElement(
          'div',
          { className: 'emoji-mart-skin-text' + (opened ? ' opened' : '') },
          i18n.skintext
        ),
        skinToneNodes
      );
    }
  }]);
  return SkinsEmoji;
}(_.Skins);

exports.default = SkinsEmoji;


SkinsEmoji.propTypes = {
  onChange: _propTypes2.default.func,
  skin: _propTypes2.default.number.isRequired,
  emojiProps: _propTypes2.default.object.isRequired,
  skinTone: _propTypes2.default.number,
  skinEmoji: _propTypes2.default.string.isRequired,
  i18n: _propTypes2.default.object
};

SkinsEmoji.defaultProps = {
  onChange: function onChange() {},
  skinTone: null
};