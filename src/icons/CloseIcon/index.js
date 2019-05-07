import React from 'react';
import PropTypes from 'prop-types';
import { generate } from 'shortid';

function CloseIcon({ height, width, className }) {
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
          d="M17.892 5.303a.996.996 0 0 0-1.41 0l-4.89 4.88-4.89-4.89a.996.996 0 1 0-1.41 1.41l4.89 4.89-4.89 4.89a.996.996 0 1 0 1.41 1.41l4.89-4.89 4.89 4.89a.996.996 0 1 0 1.41-1.41l-4.89-4.89 4.89-4.89c.38-.38.38-1.02 0-1.4z"
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

CloseIcon.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  className: PropTypes.string
};

CloseIcon.defaultProps = {
  height: '32',
  width: '32',
  className: ''
};

export default CloseIcon;
