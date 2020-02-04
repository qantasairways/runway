import React from 'react';
import { css } from '@emotion/core';
import { colours } from '../../theme/airways';
import Triangle from '../../icons/Triangle';

export default function FormFieldError({ children, ...props }) {
  return (
    <div>
      <Triangle
        css={css({
          fill: colours.warningOrangeLight,
          display: 'block',
          position: 'relative',
          left: '15px'
        })}
      />
      <div
        css={css({
          background: colours.warningOrangeLight,
          padding: '10px'
        })}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}
