/* eslint-disable react/no-unknown-property */
import React from 'react';
import PropTypes from 'prop-types';

import { generate } from 'shortid';

const MinusIcon = ({ className, width, height, ...rest }) => {
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
          d="M17.214 13.25H7.786c-.432 0-.786-.338-.786-.75s.354-.75.786-.75h9.428c.432 0 .786.338.786.75s-.354.75-.786.75z"
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

PropTypes.propTypes = {
  className: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
};

export default MinusIcon;
