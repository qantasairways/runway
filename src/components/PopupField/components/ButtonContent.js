import React from 'react';
import PropTypes from 'prop-types';

import {
  fontSize,
  colours,
  buttons,
  letterSpacing
} from '../../../theme/airways';

function ButtonContent({
  fieldLabel,
  placeHolder,
  largeValue,
  smallValue,
  icon
}) {
  return (
    <div
      css={{
        height: buttons.heightLarge,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        maxWidth: '100%'
      }}
    >
      <span
        css={{
          color: 'white',
          textTransform: 'uppercase',
          position: 'absolute',
          top: '8px',
          left: '8px',
          fontSize: fontSize.label
        }}
      >
        {fieldLabel}
      </span>
      {largeValue && (
        <div
          css={{
            color: colours.white,
            fontSize: fontSize.large,
            letterSpacing: letterSpacing.small
          }}
        >
          {largeValue}
        </div>
      )}
      {smallValue && (
        <div
          css={{
            color: colours.white,
            fontSize: fontSize.body,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '100%'
          }}
        >
          {smallValue}
        </div>
      )}
      {!largeValue && !smallValue && (
        <div
          css={{
            color: colours.darkGrey,
            fontSize: fontSize.large,
            letterSpacing: letterSpacing.small
          }}
        >
          {placeHolder}
        </div>
      )}
      {!largeValue && !smallValue && !!icon && (
        <span
          css={{
            position: 'absolute',
            right: '10px'
          }}
        >
          {icon}
        </span>
      )}
    </div>
  );
}

ButtonContent.propTypes = {
  fieldLabel: PropTypes.string,
  placeHolder: PropTypes.string,
  largeValue: PropTypes.string,
  smallValue: PropTypes.string,
  icon: PropTypes.element
};

ButtonContent.defaultProps = {
  fieldLabel: null,
  placeHolder: null,
  largeValue: null,
  smallValue: null,
  icon: null
};

export default ButtonContent;
