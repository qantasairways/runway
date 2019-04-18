import { css } from 'emotion';
import React from 'react';
import PropTypes from 'prop-types';

import { CSS_SELECTOR_ACTIVE, CSS_SELECTOR_HOVER } from '../../constants/css';
import { fontFamily, fontSize, colours, buttons } from '../../theme/airways';

export const BUTTON_VARIANT_SOLID = 'solid';
export const BUTTON_VARIANT_HOLLOW = 'hollow';

const baseStyles = css({
  fontFamily: fontFamily.main,
  fontSize: fontSize.button,
  width: buttons.width,
  height: buttons.height,
  borderRadius: buttons.borderRadius,
  borderWidth: 0,
  padding: '14px 24px 15px',
  fontWeight: 700,
  lineHeight: 1.56,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  cursor: 'pointer',
  [CSS_SELECTOR_ACTIVE]: {
    transform: `translate(${buttons.clickOffset}, ${buttons.clickOffset})`
  }
});

const solidStyles = css(
  {
    backgroundColor: colours.primary,
    color: colours.white,
    [CSS_SELECTOR_HOVER]: {
      backgroundColor: colours.primaryDark
    },
    [CSS_SELECTOR_ACTIVE]: {
      backgroundColor: colours.primaryDark
    }
  },
  baseStyles
);

const hollowStyles = css(
  {
    backgroundColor: colours.transparent,
    boxShadow: `0 0 0 2px ${colours.primary} inset`,
    color: colours.primary,
    fontWeight: 'normal',
    [CSS_SELECTOR_HOVER]: {
      boxShadow: `0 0 0 2px ${colours.primaryDark} inset`,
      color: colours.primaryDark
    },
    [CSS_SELECTOR_ACTIVE]: {
      boxShadow: `0 0 0 2px ${colours.primaryDark} inset`,
      color: colours.primaryDark
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

Button.propTypes = {
  label: PropTypes.string,
  variant: PropTypes.oneOf([BUTTON_VARIANT_HOLLOW, BUTTON_VARIANT_SOLID]),
  className: PropTypes.string
};

Button.defaultProps = {
  label: 'button',
  variant: BUTTON_VARIANT_SOLID,
  className: null
};

export default Button;
