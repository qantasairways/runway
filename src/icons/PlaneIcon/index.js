import React from 'react';
import PropTypes from 'prop-types';
import { generate } from 'shortid';

function PlaneIcon({ height, width, className }) {
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
          d="M19.058 10.588h-4.755L10.34 4H8.755l1.982 6.588h-4.36L5.19 8.706H4l.793 2.823L4 14.353h1.189l1.189-1.882h4.359l-1.982 6.588h1.585l3.963-6.588h4.755c.52 0 .962-.31.941-.942.02-.462-.415-.94-.94-.94z"
        />
      </defs>
      <g fillRule="evenodd">
        <mask id={maskId}>
          <use xlinkHref={`#${pathId}`} />
        </mask>
        <use xlinkHref={`#${pathId}`} />
        <g mask={`url(#${maskId})`}>
          <path d="M0 0h24v24H0z" />
        </g>
      </g>
    </svg>
  );
}

PlaneIcon.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  className: PropTypes.string
};

PlaneIcon.defaultProps = {
  height: '24',
  width: '24',
  className: ''
};

export default PlaneIcon;
