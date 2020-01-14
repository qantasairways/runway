import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

export function styles({ width, height }) {
  return css({
    userSelect: 'none',
    width,
    height
  });
}

export function SvgIcon(props) {
  const {
    component: Component = 'svg',
    children,
    className,
    viewBox = '0 0 24 24'
  } = props;
  return (
    <Component
      css={css(styles(props), className)}
      focusable="false"
      viewBox={viewBox}
    >
      {children}
    </Component>
  );
}

SvgIcon.propTypes = {
  children: PropTypes.node,
  component: PropTypes.elementType,
  className: PropTypes.string,
  viewBox: PropTypes.string
};

export default SvgIcon;
