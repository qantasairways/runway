import React from 'react';
import PropTypes from 'prop-types';
import { generate } from 'shortid';

export default function Tick({ width, height, className }) {
  const pathId = generate();
  const maskId = generate();

  return (
    <svg
      viewBox="0 0 24 24"
      width={width}
      height={height}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <path
          id={pathId}
          d="M9 16.17L5.53 12.7a.996.996 0 1 0-1.41 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71a.996.996 0 1 0-1.41-1.41L9 16.17z"
        />
      </defs>
      <g fillRule="evenodd">
        <mask id={maskId}>
          <use xlinkHref={`#${pathId}`} />
        </mask>
        <use fillRule="nonzero" xlinkHref={`#${pathId}`} />
        <g mask={`url(#${maskId})`}>
          <path d="M0 0h24v24H0z" />
        </g>
      </g>
    </svg>
  );
}

Tick.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string
};

Tick.defaultProps = {
  width: '24',
  height: '24',
  className: ''
};
