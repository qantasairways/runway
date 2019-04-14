import React from 'react';
import PropTypes from 'prop-types';

import ButtonValues from './ButtonValues';

import {
  fontSize,
  colours,
  buttons,
  letterSpacing
} from '../../../theme/airways';

function ButtonContent({ fieldLabel, placeHolder, values, Icon }) {
  const [firstValue, secondValue] = values;

  return (
    <div
      css={{
        height: buttons.heightLarge,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '100%'
      }}
    >
      <span
        css={{
          label: 'runway-popup-field__label',
          color: 'white',
          textTransform: 'uppercase',
          position: 'absolute',
          top: '5px',
          left: '7px',
          fontSize: fontSize.label
        }}
      >
        {fieldLabel}
      </span>
      {firstValue && (
        <ButtonValues firstValue={firstValue} secondValue={secondValue} />
      )}
      {!firstValue && (
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
      {!firstValue && !!Icon && (
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
  );
}

ButtonContent.propTypes = {
  fieldLabel: PropTypes.string,
  placeHolder: PropTypes.string,
  values: PropTypes.arrayOf(
    PropTypes.shape({
      large: PropTypes.string,
      small: PropTypes.string
    })
  ),
  Icon: PropTypes.func
};

ButtonContent.defaultProps = {
  fieldLabel: null,
  placeHolder: null,
  values: [],
  Icon: null
};

export default ButtonContent;
