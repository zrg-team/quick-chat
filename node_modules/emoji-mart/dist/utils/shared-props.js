'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PickerDefaultProps = exports.PickerPropTypes = exports.EmojiDefaultProps = exports.EmojiPropTypes = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EmojiPropTypes = {
  data: _propTypes2.default.object.isRequired,
  onOver: _propTypes2.default.func,
  onLeave: _propTypes2.default.func,
  onClick: _propTypes2.default.func,
  fallback: _propTypes2.default.func,
  backgroundImageFn: _propTypes2.default.func,
  native: _propTypes2.default.bool,
  forceSize: _propTypes2.default.bool,
  tooltip: _propTypes2.default.bool,
  skin: _propTypes2.default.oneOf([1, 2, 3, 4, 5, 6]),
  sheetSize: _propTypes2.default.oneOf([16, 20, 32, 64]),
  sheetColumns: _propTypes2.default.number,
  sheetRows: _propTypes2.default.number,
  set: _propTypes2.default.oneOf(['apple', 'google', 'twitter', 'emojione', 'messenger', 'facebook']),
  size: _propTypes2.default.number.isRequired,
  emoji: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]).isRequired
};

var EmojiDefaultProps = {
  skin: 1,
  set: 'apple',
  sheetSize: 64,
  sheetColumns: 52,
  sheetRows: 52,
  native: false,
  forceSize: false,
  tooltip: false,
  backgroundImageFn: function backgroundImageFn(set, sheetSize) {
    return 'https://unpkg.com/emoji-datasource-' + set + '@' + '4.0.4' + '/img/' + set + '/sheets-256/' + sheetSize + '.png';
  },
  onOver: function onOver() {},
  onLeave: function onLeave() {},
  onClick: function onClick() {}
};

var PickerPropTypes = {
  onClick: _propTypes2.default.func,
  onSelect: _propTypes2.default.func,
  onSkinChange: _propTypes2.default.func,
  perLine: _propTypes2.default.number,
  emojiSize: _propTypes2.default.number,
  i18n: _propTypes2.default.object,
  style: _propTypes2.default.object,
  title: _propTypes2.default.string,
  emoji: _propTypes2.default.string,
  color: _propTypes2.default.string,
  set: EmojiPropTypes.set,
  skin: EmojiPropTypes.skin,
  native: _propTypes2.default.bool,
  backgroundImageFn: EmojiPropTypes.backgroundImageFn,
  sheetSize: EmojiPropTypes.sheetSize,
  emojisToShowFilter: _propTypes2.default.func,
  showPreview: _propTypes2.default.bool,
  showSkinTones: _propTypes2.default.bool,
  emojiTooltip: EmojiPropTypes.tooltip,
  include: _propTypes2.default.arrayOf(_propTypes2.default.string),
  exclude: _propTypes2.default.arrayOf(_propTypes2.default.string),
  recent: _propTypes2.default.arrayOf(_propTypes2.default.string),
  autoFocus: _propTypes2.default.bool,
  custom: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    name: _propTypes2.default.string.isRequired,
    short_names: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired,
    emoticons: _propTypes2.default.arrayOf(_propTypes2.default.string),
    keywords: _propTypes2.default.arrayOf(_propTypes2.default.string),
    imageUrl: _propTypes2.default.string.isRequired
  })),
  skinEmoji: _propTypes2.default.string,
  notFound: _propTypes2.default.func,
  notFoundEmoji: _propTypes2.default.string,
  icons: _propTypes2.default.object
};

var PickerDefaultProps = {
  onClick: function onClick() {},
  onSelect: function onSelect() {},
  onSkinChange: function onSkinChange() {},
  emojiSize: 24,
  perLine: 9,
  i18n: {},
  style: {},
  title: 'Emoji Mart™',
  emoji: 'department_store',
  color: '#ae65c5',
  set: EmojiDefaultProps.set,
  skin: null,
  defaultSkin: EmojiDefaultProps.skin,
  native: EmojiDefaultProps.native,
  sheetSize: EmojiDefaultProps.sheetSize,
  backgroundImageFn: EmojiDefaultProps.backgroundImageFn,
  emojisToShowFilter: null,
  showPreview: true,
  showSkinTones: true,
  emojiTooltip: EmojiDefaultProps.tooltip,
  autoFocus: false,
  custom: [],
  skinEmoji: '',
  notFound: function notFound() {},
  notFoundEmoji: 'sleuth_or_spy',
  icons: {}
};

exports.EmojiPropTypes = EmojiPropTypes;
exports.EmojiDefaultProps = EmojiDefaultProps;
exports.PickerPropTypes = PickerPropTypes;
exports.PickerDefaultProps = PickerDefaultProps;