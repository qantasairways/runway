import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

export const cardStyles = {
  borderRadius: '4px',
  overflow: 'hidden',
  boxShadow: '0 1px 2px 0 rgba(0,0,0,0.2)'
};

const Card = ({ children, ...props }) => (
  <div
    css={css({
      ...cardStyles,
      background: 'white',
      padding: '20px'
    })}
    {...props}
  >
    {children}
  </div>
);

Card.propTypes = {
  children: PropTypes.node.isRequired
};

export default Card;
