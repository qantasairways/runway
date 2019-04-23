import React from 'react';
import PropTypes from 'prop-types';
import { generate } from 'shortid';

function PinIcon({ height, width, className }) {
  const pathId = generate();
  const maskId = generate();

  return (
    <svg
      width={width}
      height={height}
      className={className}
      focusable="false"
      viewBox="0 0 24 24"
    >
      <defs>
        <path
          id={pathId}
          d="M7 0C3.13 0 0 3.13 0 7c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"
        />
      </defs>
      <g fillRule="evenodd" transform="translate(5 2)">
        <mask id={maskId} fill="#fff">
          <use xlinkHref={`#${pathId}`} />
        </mask>
        <g mask={`url(#${maskId})`}>
          <path d="M-5-2h24v24H-5z" />
        </g>
      </g>
    </svg>
  );
}

PinIcon.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  className: PropTypes.string
};

PinIcon.defaultProps = {
  height: '24',
  width: '24',
  className: ''
};

export default PinIcon;
