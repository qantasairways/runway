import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import ChevronDownSmall from '../../icons/ChevronDownSmall';
import { sharedFormControlStyles } from '../../theme/airways';

export default function Select({
  children,
  hasError,
  selectRef,
  ...selectAttributes
}) {
  return (
    <div css={css({ position: 'relative' })}>
      <select
        css={sharedFormControlStyles(hasError)}
        {...selectAttributes}
        ref={selectRef}
      >
        {children}
      </select>
      <ChevronDownSmall
        css={css({ position: 'absolute', top: '22px', right: '17px' })}
      />
    </div>
  );
}

Select.propTypes = {
  children: PropTypes.node.isRequired,
  hasError: PropTypes.bool,
  selectRef: PropTypes.node
};
