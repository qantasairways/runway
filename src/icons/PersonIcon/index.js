import React from 'react';
import PropTypes from 'prop-types';
import { generate } from 'shortid';

function PersonIcon({ height, width, className }) {
  const pathId = generate();
  const maskId = generate();

  return (
    <svg
      className={className}
      width={width}
      height={height}
      focusable="false"
      viewBox="0 0 24 24"
    >
      <defs>
        <path
          id={pathId}
          d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
        />
      </defs>
      <g fillRule="evenodd">
        <mask id={maskId} fill="#fff">
          <use xlinkHref={`#${pathId}`} />
        </mask>
        <g mask={`url(#${maskId})`}>
          <path d="M.235.235h23v23h-23z" />
        </g>
      </g>
    </svg>
  );
}

PersonIcon.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  className: PropTypes.string
};

PersonIcon.defaultProps = {
  height: '24',
  width: '24',
  className: ''
};

export default PersonIcon;
