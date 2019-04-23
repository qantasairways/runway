import React from 'react';
import PropTypes from 'prop-types';

import { fontSize, colours, letterSpacing } from '../../../theme/airways';

function ButtonValue({ large, small }) {
  return (
    <div css={{ maxWidth: '100%', minWidth: 0 }}>
      {large && (
        <div
          css={{
            label: 'runway-popup-field__value--large',
            color: colours.white,
            fontSize: fontSize.large,
            letterSpacing: letterSpacing.small,
            lineHeight: '2.65rem'
          }}
        >
          {large}
        </div>
      )}
      {small && (
        <div
          css={{
            label: 'runway-popup-field__value--small',
            color: colours.white,
            fontSize: fontSize.body,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '100%'
          }}
        >
          {small}
        </div>
      )}
    </div>
  );
}

ButtonValue.propTypes = {
  large: PropTypes.string,
  small: PropTypes.string
};

ButtonValue.defaultProps = {
  large: '',
  small: ''
};

function ButtonValues({ firstValue, secondValue }) {
  return (
    <div
      css={{
        display: 'flex',
        overflow: 'hidden',
        maxWidth: '100%'
      }}
    >
      <ButtonValue {...firstValue} />
      {secondValue && (
        <div
          css={{
            color: 'white',
            margin: '0 15px',
            fontSize: '36px',
            marginBottom: '20px'
          }}
        >
          -
        </div>
      )}
      {secondValue && <ButtonValue {...secondValue} />}
    </div>
  );
}

ButtonValues.propTypes = {
  firstValue: PropTypes.shape({
    large: PropTypes.string,
    small: PropTypes.string
  }).isRequired,
  secondValue: PropTypes.shape({
    large: PropTypes.string,
    small: PropTypes.string
  })
};

ButtonValues.defaultProps = {
  secondValue: null
};

export default ButtonValues;
