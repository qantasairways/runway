import React from 'react';
import PropTypes from 'prop-types';
import { generate } from 'shortid';

export default function ChevronDown({ width, height, className }) {
  const pathId = generate();
  const maskId = generate();

  return (
    <svg
      viewBox="0 0 24 24"
      width={width}
      height={height}
      className={className}
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <path
          id={pathId}
          d="M2.12 1.29L6 5.17l3.88-3.88a.996.996 0 1 1 1.41 1.41L6.7 7.29a.996.996 0 0 1-1.41 0L.7 2.7a.996.996 0 0 1 0-1.41c.39-.38 1.03-.39 1.42 0z"
        />
      </defs>
      <g fillRule="evenodd" transform="translate(6 8)">
        <mask id={maskId}>
          <use xlinkHref={`#${pathId}`} />
        </mask>
        <use fillRule="nonzero" xlinkHref={`#${pathId}`} />
        <g mask={`url(#${maskId})`}>
          <path d="M0 0h12v8H0z" />
        </g>
      </g>
    </svg>
  );
}

ChevronDown.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string
};

ChevronDown.defaultProps = {
  width: '24',
  height: '24',
  className: ''
};
