import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';

export function styles({ width = '100%' }) {
  return css({
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
    width,
    boxSizing: 'border-box',
    padding: '10px'
  });
}

export function List(props) {
  const { component: Component = 'ul', children, ...otherProps } = props;

  return (
    <Component css={styles(props)} {...otherProps}>
      {children}
    </Component>
  );
}

List.propTypes = {
  children: PropTypes.node,
  component: PropTypes.elementType,
  width: PropTypes.string
};
