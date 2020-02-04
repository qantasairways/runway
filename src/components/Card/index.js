import React from 'react';
import { css } from '@emotion/core';

const Card = ({ children, ...props }) => (
  <div
    css={css({
      background: 'white',
      padding: '20px',
      borderRadius: '4px',
      overflow: 'hidden',
      boxShadow: '0 1px 2px 0 rgba(0,0,0,0.2)'
    })}
    {...props}
  >
    {children}
  </div>
);

export default Card;
