import React from 'react';
import { css } from 'emotion';

export function menuStyles({ highlighted }) {
  const fontWeight = highlighted ? 700 : 400;

  return css({
    label: 'runway-dropdown__menu-item',
    fontWeight,
    color: '#323232',
    paddingTop: '5px',
    paddingLeft: '15px',
    paddingRight: '15px',
    ':first-child': {
      paddingTop: '15px'
    },
    ':last-child': {
      paddingBottom: '15px'
    }
  });
}

export default function MenuItem(props) {
  return <li {...props} css={menuStyles(props)} />;
}
