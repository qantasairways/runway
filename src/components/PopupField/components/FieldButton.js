import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';

import noop from '../../../utils/noop';

import {
  fontSize,
  colours,
  letterSpacing,
  layout,
  fontFamily,
  fontWeight
} from '../../../theme/airways';

export function largeButtonTextStyles() {
  return css({
    label: 'runway-popup-field__value--large',
    fontSize: fontSize.large,
    letterSpacing: letterSpacing.small,
    lineHeight: '2.65rem'
  });
}

const buttonStyles = {
  label: 'runway-popup-field__button',
  position: 'relative',
  height: '6rem',
  width: '100%',
  maxWidth: '100%',
  border: 0,
  padding: `0 ${layout.gutter}`,
  cursor: 'pointer',
  backgroundColor: colours.darkerGrey,
  color: colours.white,
  fontFamily: fontFamily.body,
  fontSize: fontSize.body,
  fontWeight: fontWeight.regular
};

function FieldButton({
  renderButtonValue,
  onClick,
  onBlur,
  setButtonRef,
  open,
  fieldLabel,
  placeHolder,
  Icon
}) {
  const buttonContent = renderButtonValue();

  return (
    <button
      type="button"
      aria-haspopup="dialog"
      aria-expanded={open}
      onClick={onClick}
      onBlur={onBlur}
      ref={setButtonRef}
      css={buttonStyles}
    >
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: '100%',
          minWidth: 0,
          '*': {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }
        }}
      >
        <span
          css={{
            label: 'runway-popup-field__label',
            position: 'absolute',
            top: '5px',
            left: '7px',
            color: 'white',
            textTransform: 'uppercase',
            fontSize: fontSize.label
          }}
        >
          {fieldLabel}
        </span>
        {buttonContent}
        {!buttonContent && (
          <div
            css={{
              label: 'runway-popup-field__placeholder',
              color: colours.darkGrey,
              fontSize: fontSize.large,
              letterSpacing: letterSpacing.small
            }}
          >
            {placeHolder}
          </div>
        )}
        {!buttonContent && !!Icon && (
          <Icon
            css={{
              label: 'runway-popup-field__icon',
              position: 'absolute',
              right: '10px',
              fill: colours.darkGrey
            }}
            height="36"
            width="36"
          />
        )}
      </div>
    </button>
  );
}

FieldButton.propTypes = {
  renderButtonValue: PropTypes.func,
  onClick: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  setButtonRef: PropTypes.func.isRequired,
  open: PropTypes.bool,
  fieldLabel: PropTypes.string,
  placeHolder: PropTypes.string,
  Icon: PropTypes.func
};

FieldButton.defaultProps = {
  renderButtonValue: noop,
  onBlur: noop,
  open: false,
  fieldLabel: '',
  placeHolder: '',
  Icon: null
};

export default FieldButton;
