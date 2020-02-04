import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { sharedFormControlStyles } from '../../theme/airways';

const Input = forwardRef(({ hasError = false, ...inputAttributes }, ref) => (
  <input
    css={sharedFormControlStyles(hasError)}
    {...inputAttributes}
    ref={ref}
  />
));

Input.propTypes = {
  hasError: PropTypes.bool,
  ref: PropTypes.any // eslint-disable-line react/forbid-prop-types
};

export default Input;
