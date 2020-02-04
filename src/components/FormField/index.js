/* eslint-disable jsx-a11y/label-has-for */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import generateId from 'shortid';
import { css } from '@emotion/core';
import FormFieldError from '../FormFieldError';
import Input from '../Input';
import Textarea from '../Textarea';
import SelectNew from '../SelectNew';

const labelStyles = css({
  display: 'block',
  fontSize: '16px',
  lineHeight: '24px'
});

function FormField({ component, label, errorMessage = null }) {
  const [id] = useState(generateId());
  const errorID = `error-${id}`;
  return (
    <div>
      <label htmlFor={id} css={labelStyles}>
        {label}
      </label>
      {React.cloneElement(component, {
        id,
        hasError: !!errorMessage,
        'aria-describedby': errorID,
        'aria-invalid': !!errorMessage
      })}
      <div role="alert" id={errorID}>
        {errorMessage && <FormFieldError>{errorMessage}</FormFieldError>}
      </div>
    </div>
  );
}

FormField.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.instanceOf(Input),
    PropTypes.instanceOf(Textarea),
    PropTypes.instanceOf(SelectNew)
  ]).isRequired,
  label: PropTypes.string.isRequired,
  errorMessage: PropTypes.string
};

export default FormField;
