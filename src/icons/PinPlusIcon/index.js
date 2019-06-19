import React from 'react';
import PropTypes from 'prop-types';
import { generate } from 'shortid';

function PinPlusIcon({ height, width, className }) {
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
          d="M16.667 11.333a5.333 5.333 0 1 1 0 10.667 5.333 5.333 0 0 1 0-10.667zm2.666 6a.667.667 0 1 0 0-1.333h-2v-2A.667.667 0 1 0 16 14v2h-2a.667.667 0 0 0 0 1.333h2v2a.667.667 0 1 0 1.333 0v-2h2zm-9.366-.666c0 .893.182 1.778.533 2.6-1.033 1.266-1.833 2.066-1.833 2.066S2 14.667 2 8.667a6.667 6.667 0 1 1 13.333 0 9.167 9.167 0 0 1-.133 1.5 6.667 6.667 0 0 0-5.233 6.5zm-1.3-6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
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
}

PinPlusIcon.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  className: PropTypes.string
};

PinPlusIcon.defaultProps = {
  height: '24',
  width: '24',
  className: ''
};

export default PinPlusIcon;
