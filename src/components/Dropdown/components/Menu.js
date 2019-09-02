import React from 'react';
import { css } from 'emotion';

export function menuStyles({ isOpen, width }) {
  const display = isOpen ? 'block' : 'none';

  return css({
    display,
    label: 'runway-dropdown__menu',
    minWidth: '240px',
    borderRadius: '4px',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.2)',
    border: 'solid 1px #dadada',
    backgroundColor: '#ffffff',
    listStyle: 'none',
    position: 'absolute',
    zIndex: '5',
    margin: 0,
    top: '0',
    left: '0',
    width: width || '100%',
    boxSizing: 'border-box',
    padding: '10px'
  });
}

/* Re eslint-disbable:
  the Downshift library is compatible with an older version of React, which only allows refs to be set on class components. As such, the <Menu/> component needs to be a class so the Downshift library is able to set a ref.
  */
// eslint-disable-next-line react/prefer-stateless-function
export default class Menu extends React.Component {
  render() {
    const { focus, isOpen, ...rest } = this.props;
    return <ul {...rest} css={menuStyles({ isOpen, ...rest })} />;
  }
}
