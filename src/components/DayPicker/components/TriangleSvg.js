import React from 'react';
import PropTypes from 'prop-types';

function Triangle({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="60px"
      height="66px"
      viewBox="0 0 50 80"
      xmlSpace="preserve"
      className={className}
    >
      <polyline
        fill="none"
        stroke="#8de2e0"
        strokeWidth="6"
        points="0.375,0.375 21.63,38.087 0.375,75.8 "
      />
    </svg>
  );
}

Triangle.propTypes = {
  className: PropTypes.string
};

Triangle.defaultProps = {
  className: ''
};

export default Triangle;
