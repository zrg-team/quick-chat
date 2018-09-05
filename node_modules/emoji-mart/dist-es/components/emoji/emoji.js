import _extends from '../../polyfills/extends';
import React from 'react';

import data from '../../../data/all.json';
import NimbleEmoji from './nimble-emoji';

import { EmojiPropTypes, EmojiDefaultProps } from '../../utils/shared-props';

var Emoji = function Emoji(props) {
  for (var k in Emoji.defaultProps) {
    if (props[k] == undefined && Emoji.defaultProps[k] != undefined) {
      props[k] = Emoji.defaultProps[k];
    }
  }

  return NimbleEmoji(_extends({}, props));
};

Emoji.propTypes = EmojiPropTypes;
Emoji.defaultProps = _extends({}, EmojiDefaultProps, { data: data });

export default Emoji;