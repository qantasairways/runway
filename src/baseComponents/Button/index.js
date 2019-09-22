import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'emotion-theming';

import { CSS_SELECTOR_ACTIVE } from '../../constants/css';
import noop from '../../utils/noop';
import deepMerge from '../../utils/deepMerge';

const baseStyles = {
  button: (theme, props) => ({
    fontFamily: theme.fontFamily.main,
    fontSize: theme.fontSize.button,
    width: props.inline ? 'auto' : '100%',
    height: '3.125rem',
    borderRadius: theme.layout.borderRadius,
    borderWidth: 0,
    padding: '14px 24px 15px',
    fontWeight: 700,
    lineHeight: 1.56,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    [CSS_SELECTOR_ACTIVE]: {
      transform: `translate(1px, 1px)`
    }
  })
  // Nested compoenets would go here for example
  // icon: theme => ({})
};

export function ThemedButton({ children, theme, themeStyles, ...buttonProps }) {
  return (
    <button
      type="button"
      {...buttonProps}
      css={deepMerge(
        baseStyles.button(theme, buttonProps),
        themeStyles.button(theme, buttonProps)
      )}
    >
      {children}
    </button>
  );
}

export const buttonPropTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  inline: PropTypes.bool
};

export const buttonDefaultProps = {
  children: 'button',
  type: 'button',
  onClick: noop,
  disabled: false,
  inline: false
};

ThemedButton.propTypes = {
  theme: PropTypes.shape().isRequired,
  themeStyles: PropTypes.shape({ button: PropTypes.func }),
  ...buttonPropTypes
};

ThemedButton.defaultProps = {
  children: 'button',
  themeStyles: { button: noop },
  ...buttonDefaultProps
};

export default withTheme(ThemedButton);
