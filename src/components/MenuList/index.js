import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';

export function styles({ width }) {
  return css({
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

const MenuList = React.forwardRef(function MenuList(props, ref) {
  const {
    component: Component = 'ul',
    children,
    menuWidth,
    ...otherProps
  } = props;
  return (
    <Component css={styles({ menuWidth })} {...otherProps}>
      {children}
    </Component>
  );
});

MenuList.propTypes = {
  children: PropTypes.node,
  component: PropTypes.elementType
};

export default MenuList;
