import React from 'react';
import { css } from 'emotion';
import { colours } from '../../../theme/airways';
import {
  CSS_SELECTOR_HOVER,
  CSS_SELECTOR_ACTIVE
} from '../../../constants/css';

export function menuStyles({ highlighted }) {
  return css({
    label: 'runway-dropdown__menu-item',
    fontWeight: 400,
    backgroundColor: highlighted ? colours.lightGrey : 'none',
    color: '#323232',
    boxSizing: 'border-box',
    padding: '10px',
    minHeight: '50px',
    [`${CSS_SELECTOR_HOVER}, ${CSS_SELECTOR_ACTIVE}`]: {
      backgroundColor: colours.lightGrey
    }
  });
}

export default function MenuItem(props) {
  const { highlighted, ...rest } = props;
  return <li {...rest} css={menuStyles(rest)} />;
}
