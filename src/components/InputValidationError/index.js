import React from 'react';
import { css } from '@emotion/core';
import { colours } from '../../theme/airways';

export default function InputValidationError({ children, ...props }) {
  return (
    <div>
      <svg
        width={16}
        height={8}
        viewBox="0 0 16 8"
        css={css({ display: 'block', position: 'relative', left: '15px' })}
      >
        <path
          d="M0 8l8-8 8 8z"
          fill={colours.warningOrangeLight}
          fillRule="evenodd"
        />
      </svg>
      <div
        css={css({ background: colours.warningOrangeLight, padding: '10px' })}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}
