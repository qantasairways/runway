import React from 'react';
import PropTypes from 'prop-types';
import { layout } from '../../theme/airways';

function PinIcon({ color }) {
  return (
    <svg
      focusable="false"
      width={layout.iconSize}
      height={layout.iconSize}
      viewBox="0 0 24 24"
    >
      <defs>
        <path
          id="a"
          d="M7 0C3.13 0 0 3.13 0 7c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"
        />
      </defs>
      <g fill="none" fillRule="evenodd" transform="translate(5 2)">
        <mask id="b" fill="#fff">
          <use xlinkHref="#a" />
        </mask>
        <g fill={color} mask="url(#b)">
          <path d="M-5-2h24v24H-5z" />
        </g>
      </g>
    </svg>
  );
}

PinIcon.propTypes = {
  color: PropTypes.string.isRequired
};

export default PinIcon;
