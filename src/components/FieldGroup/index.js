/* eslint-disable jsx-a11y/label-has-for */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import generateId from 'shortid';
import { css } from '@emotion/core';
import InputValidationError from '../InputValidationError';

const labelStyles = css({
  display: 'block',
  fontSize: '16px',
  lineHeight: '24px'
});

export default function FieldGroup({ label, errorMessage, children }) {
  const [id] = useState(generateId());
  return (
    <div>
      <label htmlFor={id} css={labelStyles}>
        {label}
      </label>
      {React.cloneElement(children, {
        id,
        'aria-describedby': `error-${id}`,
        'aria-invalid': !!errorMessage
      })}
      <div role="alert" id={`error-${id}`}>
        {errorMessage && (
          <InputValidationError>{errorMessage}</InputValidationError>
        )}
      </div>
    </div>
  );
}

FieldGroup.propTypes = {
  label: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};
