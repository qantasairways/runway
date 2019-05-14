import React from 'react';
import { css } from 'emotion';
import { colours } from '../../../theme/airways';
import {
  CSS_SELECTOR_HOVER,
  CSS_SELECTOR_ACTIVE
} from '../../../constants/css';

export function menuStyles() {
  return css({
    label: 'runway-dropdown__menu-item',
    fontWeight: 400,
    backgroundColor: 'none',
    color: '#323232',
    boxSizing: 'border-box',
    padding: '10px',
    height: '50px',
    [`${CSS_SELECTOR_HOVER}, ${CSS_SELECTOR_ACTIVE}`]: {
      backgroundColor: colours.lightGrey
    }
  });
}

export default function MenuItem(props) {
  return <li {...props} css={menuStyles(props)} />;
}
