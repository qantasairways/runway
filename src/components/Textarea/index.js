import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { sharedFormControlStyles } from '../../theme/airways';

const Textarea = forwardRef(
  ({ hasError = false, ...textareaAttributes }, ref) => (
    <textarea
      css={sharedFormControlStyles(hasError)}
      {...textareaAttributes}
      ref={ref}
    />
  )
);

Textarea.propTypes = {
  hasError: PropTypes.bool
};

export default Textarea;
