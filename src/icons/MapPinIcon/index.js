import React from 'react';
import PropTypes from 'prop-types';
import { generate } from 'shortid';

function MapPinIcon({ height, width, className }) {
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
          d="M11.744 15.333s-4.616-4.466-4.616-8.666C7.128 4.089 9.195 2 11.744 2c2.549 0 4.615 2.09 4.615 4.667 0 4.2-4.615 8.666-4.615 8.666zm-1.32-8.666c0 .736.591 1.333 1.32 1.333.728 0 1.318-.597 1.318-1.333 0-.737-.59-1.334-1.318-1.334-.729 0-1.32.597-1.32 1.334zm2.51 9.659a21.96 21.96 0 0 0 2.4-2.82v6.636l-6.667 1.692v-8.329a22.157 22.157 0 0 0 2.4 2.854l.933.863.933-.896zM2 20.009v-9.291l5.333 1.759V21.8L2 20.009zm16-8.627l4 1.327V22l-5.333-1.792v-8.826l.2-.365 1.133.365z"
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

MapPinIcon.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  className: PropTypes.string
};

MapPinIcon.defaultProps = {
  height: '24',
  width: '24',
  className: ''
};

export default MapPinIcon;
