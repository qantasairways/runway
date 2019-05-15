/* eslint-disable react/no-unknown-property */
import React from 'react';
import PropTypes from 'prop-types';
import { generate } from 'shortid';

const PlusIcon = ({ className, width, height, ...rest }) => {
  const pathId = generate();
  const maskId = generate();

  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 24 24"
      {...rest}
    >
      <defs>
        <path
          id={pathId}
          d="M17.214 13.286h-3.928v3.928A.788.788 0 0 1 12.5 18a.788.788 0 0 1-.786-.786v-3.928H7.786A.788.788 0 0 1 7 12.5c0-.432.354-.786.786-.786h3.928V7.786c0-.432.354-.786.786-.786.432 0 .786.354.786.786v3.928h3.928c.432 0 .786.354.786.786a.788.788 0 0 1-.786.786z"
        />
      </defs>
      <g fillRule="evenodd">
        <mask id={maskId} fill="#fff">
          <use xlinkHref={`#${pathId}`} />
        </mask>
        <g mask={`url(#${maskId})`}>
          <path d="M0 0h24v24H0z" />
        </g>
      </g>
    </svg>
  );
};

PlusIcon.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  className: PropTypes.string
};

PlusIcon.defaultProps = {
  height: '24',
  width: '24',
  className: ''
};

export default PlusIcon;
