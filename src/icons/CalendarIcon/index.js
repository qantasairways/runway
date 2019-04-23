import React from 'react';
import PropTypes from 'prop-types';
import { generate } from 'shortid';

function CalendarIcon({ height, width, className }) {
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
          d="M10 10h2v2h-2v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2zm-9 3h2v2H7v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2zm-9 3h2v2H7v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2zm5-10V4.5a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 0-.5.5V6h-5V4.5a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 0-.5.5V6H5v14h15V6h-2zm-2-1h1v2h-1V5zM8 5h1v2H8V5zM6 9h13v10H6V9z"
        />
      </defs>
      <g fillRule="evenodd">
        <mask id={maskId}>
          <use xlinkHref={`#${pathId}`} />
        </mask>
        <use xlinkHref={`#${pathId}`} />
        <g mask={`url(#${maskId})`}>
          <path d="M0 0h198v120H0z" />
        </g>
      </g>
    </svg>
  );
}

CalendarIcon.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  className: PropTypes.string
};

CalendarIcon.defaultProps = {
  height: '24',
  width: '24',
  className: ''
};

export default CalendarIcon;
