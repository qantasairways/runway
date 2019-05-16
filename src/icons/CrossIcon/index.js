import React from 'react';
import PropTypes from 'prop-types';
import { generate } from 'shortid';

function CrossIcon({ height, width, className }) {
  const pathId = generate();
  const maskId = generate();

  return (
    <svg
      width={width}
      height={height}
      className={className}
      focusable="false"
      viewBox="-0.5 -0.5 24 24"
    >
      <defs>
        <path
          id={pathId}
          d="M12.893.302a.996.996 0 0 0-1.41 0l-4.89 4.88-4.89-4.89a.996.996 0 1 0-1.41 1.41l4.89 4.89-4.89 4.89a.996.996 0 1 0 1.41 1.41l4.89-4.89 4.89 4.89a.996.996 0 1 0 1.41-1.41l-4.89-4.89 4.89-4.89c.38-.38.38-1.02 0-1.4z"
        />
      </defs>
      <g fillRule="evenodd" transform="translate(5 5)">
        <mask id={maskId}>
          <use xlinkHref={`#${pathId}`} />
        </mask>
        <use fillRule="nonzero" xlinkHref={`#${pathId}`} />
        <g mask={`url(#${maskId})`}>
          <path d="M-5-5h24v24H-5z" />
        </g>
      </g>
    </svg>
  );
}

CrossIcon.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  className: PropTypes.string
};

CrossIcon.defaultProps = {
  height: '24',
  width: '24',
  className: ''
};

export default CrossIcon;
