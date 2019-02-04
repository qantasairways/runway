import { css } from 'emotion';
import React from 'react';
import { CSS_SELECTOR_ACTIVE, CSS_SELECTOR_HOVER } from '../../constants/css';
import theme from '../../theme/airways';

export const BUTTON_VARIANT_SOLID = 'solid';
export const BUTTON_VARIANT_HOLLOW = 'hollow';

const baseStyles = css({
  fontFamily: theme.fontFamily.main,
  fontSize: theme.fontSize.button,
  width: theme.buttons.width,
  height: theme.buttons.height,
  borderRadius: theme.buttons.borderRadius,
  borderWidth: 0,
  padding: '14px 24px 15px',
  fontWeight: 700,
  lineHeight: 1.56,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  cursor: 'pointer',
  [CSS_SELECTOR_ACTIVE]: {
    transform: `translate(${theme.buttons.clickOffset}, ${
      theme.buttons.clickOffset
    })`
  }
});

const solidStyles = css(
  {
    backgroundColor: theme.colours.primary,
    color: theme.colours.white,
    [CSS_SELECTOR_HOVER]: {
      backgroundColor: theme.colours.primaryDark
    },
    [CSS_SELECTOR_ACTIVE]: {
      backgroundColor: theme.colours.primaryDark
    }
  },
  baseStyles
);

const hollowStyles = css(
  {
    backgroundColor: theme.colours.transparent,
    boxShadow: `0 0 0 2px ${theme.colours.primary} inset`,
    color: theme.colours.primary,
    fontWeight: 'normal',
    [CSS_SELECTOR_HOVER]: {
      boxShadow: `0 0 0 2px ${theme.colours.primaryDark} inset`,
      color: theme.colours.primaryDark
    },
    [CSS_SELECTOR_ACTIVE]: {
      boxShadow: `0 0 0 2px ${theme.colours.primaryDark} inset`,
      color: theme.colours.primaryDark
    }
  },
  baseStyles
);

const styleMap = {
  [BUTTON_VARIANT_SOLID]: solidStyles,
  [BUTTON_VARIANT_HOLLOW]: hollowStyles
};

const Button = ({ className, label, variant, ...buttonProps }) => (
  <div className={className}>
    <button type="button" {...buttonProps} css={styleMap[variant]}>
      {label}
    </button>
  </div>
);

Button.defaultProps = {
  label: 'button',
  variant: BUTTON_VARIANT_SOLID
};

export default Button;
