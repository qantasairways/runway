import React from 'react';
import { css } from 'emotion';

export function menuStyles({ isOpen }) {
  const display = isOpen ? 'block' : 'none';

  return css({
    display,
    label: 'runway-dropdown__menu',
    minWidth: '120px',
    borderRadius: '4px',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.2)',
    border: 'solid 1px #dadada',
    backgroundColor: '#ffffff',
    listStyle: 'none',
    position: 'absolute',
    zIndex: '5',
    margin: 0,
    transform: 'translateX(-50%)',
    top: '0',
    left: '50%',
    width: '100%',
    padding: 0
  });
}

export default function Menu(props) {
  return <ul {...props} css={menuStyles({ ...props })} />;
}
