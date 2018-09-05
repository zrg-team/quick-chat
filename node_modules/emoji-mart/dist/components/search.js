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

var _svgs = require('../svgs');

var _nimbleEmojiIndex = require('../utils/emoji-index/nimble-emoji-index');

var _nimbleEmojiIndex2 = _interopRequireDefault(_nimbleEmojiIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Search = function (_React$PureComponent) {
  (0, _inherits3.default)(Search, _React$PureComponent);

  function Search(props) {
    (0, _classCallCheck3.default)(this, Search);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Search.__proto__ || (0, _objectGetPrototypeOf2.default)(Search)).call(this, props));

    _this.state = {
      icon: _svgs.search.search,
      isSearching: false
    };

    _this.data = props.data;
    _this.emojiIndex = new _nimbleEmojiIndex2.default(_this.data);
    _this.setRef = _this.setRef.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    _this.clear = _this.clear.bind(_this);
    _this.handleKeyUp = _this.handleKeyUp.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Search, [{
    key: 'search',
    value: function search(value) {
      if (value == '') this.setState({
        icon: _svgs.search.search,
        isSearching: false
      });else this.setState({
        icon: _svgs.search.delete,
        isSearching: true
      });

      this.props.onSearch(this.emojiIndex.search(value, {
        emojisToShowFilter: this.props.emojisToShowFilter,
        maxResults: this.props.maxResults,
        include: this.props.include,
        exclude: this.props.exclude,
        custom: this.props.custom
      }));
    }
  }, {
    key: 'clear',
    value: function clear() {
      if (this.input.value == '') return;
      this.input.value = '';
      this.search('');
    }
  }, {
    key: 'handleChange',
    value: function handleChange() {
      this.search(this.input.value);
    }
  }, {
    key: 'handleKeyUp',
    value: function handleKeyUp(e) {
      if (e.keyCode === 13) {
        this.clear();
      }
    }
  }, {
    key: 'setRef',
    value: function setRef(c) {
      this.input = c;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var i18n = _props.i18n;
      var autoFocus = _props.autoFocus;
      var _state = this.state;
      var icon = _state.icon;
      var isSearching = _state.isSearching;


      return _react2.default.createElement(
        'div',
        { className: 'emoji-mart-search' },
        _react2.default.createElement('input', {
          ref: this.setRef,
          type: 'text',
          onChange: this.handleChange,
          placeholder: i18n.search,
          autoFocus: autoFocus
        }),
        _react2.default.createElement(
          'button',
          {
            className: 'emoji-mart-search-icon',
            onClick: this.clear,
            onKeyUp: this.handleKeyUp,
            disabled: !isSearching
          },
          icon()
        )
      );
    }
  }]);
  return Search;
}(_react2.default.PureComponent);

exports.default = Search;


Search.defaultProps = {
  onSearch: function onSearch() {},
  maxResults: 75,
  emojisToShowFilter: null,
  autoFocus: false
};