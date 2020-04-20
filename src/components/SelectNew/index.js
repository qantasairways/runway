import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import ChevronDownSmall from '../../icons/ChevronDownSmall';
import { sharedFormControlStyles } from '../../theme/airways';

const SelectNew = forwardRef(
  ({ children, hasError, ...selectAttributes }, ref) => (
    <div css={{ position: 'relative' }}>
      <select
        css={sharedFormControlStyles(hasError)}
        {...selectAttributes}
        ref={ref}
      >
        {children}
      </select>
      <ChevronDownSmall
        css={{
          position: 'absolute',
          top: '22px',
          right: '17px'
        }}
      />
    </div>
  )
);

SelectNew.propTypes = {
  hasError: PropTypes.bool,
  children: PropTypes.node.isRequired,
  ref: PropTypes.any // eslint-disable-line react/forbid-prop-types
};

export default SelectNew;
