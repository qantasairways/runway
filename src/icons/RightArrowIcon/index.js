import React from 'react';
import PropTypes from 'prop-types';
import { generate } from 'shortid';

const RightArrowIcon = ({ color, width, height, className }) => {
  const maskId = generate();
  const pathId = generate();

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
          d="M10.138 11.269l5.088-4.766.005-.004.769-.721L10.138.287a1.144 1.144 0 0 0-1.53.012.976.976 0 0 0-.013 1.433l3.23 3.024H1.09C.488 4.756 0 5.214 0 5.778 0 6.342.488 6.8 1.09 6.8h10.733L8.595 9.824a.976.976 0 0 0 .014 1.432c.42.394 1.1.4 1.529.013z"
        />
      </defs>
      <g fill="none" fillRule="evenodd" transform="translate(4 6)">
        <mask id={maskId} fill="#fff">
          <use xlinkHref={`#${pathId}`} />
        </mask>
        <use fill="#202020" xlinkHref={`#${pathId}`} />
        <g fill={color} mask={`url(#${maskId})`}>
          <path d="M-4-6h24v24H-4z" />
        </g>
      </g>
    </svg>
  );
};
RightArrowIcon.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.string.isRequired
};

RightArrowIcon.defaultProps = {
  height: '24',
  width: '24',
  className: ''
};

export default RightArrowIcon;
