import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';

export function buttonBaseStyles() {
  return css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    cursor: 'pointer',
    padding: 0,
    border: 0,
    background: 'transparent',
    color: 'inherit',
    textDecoration: 'none',
    userSelect: 'none',
    verticalAlign: 'middle',
    maxWidth: '100%'
  });
}

export function ButtonBase(props) {
  const {
    component: Component = 'button',
    children,
    className,
    ...otherProps
  } = props;

  return (
    <Component css={css(buttonBaseStyles(props), className)} {...otherProps}>
      {children}
    </Component>
  );
}

ButtonBase.propTypes = {
  component: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string
};
