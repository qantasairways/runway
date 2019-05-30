import React from 'react';
import PropTypes from 'prop-types';
import { generate } from 'shortid';

function TicketIcon({ height, width, className }) {
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
          d="M9.438 7v1.918h.975V7h8.883c.166 0 .3.126.3.282v2.823c0 .156-.134.282-.3.282-.828 0-1.5.632-1.5 1.412 0 .78.672 1.411 1.5 1.411.166 0 .3.127.3.283v2.822c0 .156-.134.283-.3.283H4.3c-.166 0-.3-.127-.3-.283v-2.822c0-.156.134-.283.3-.283.828 0 1.5-.632 1.5-1.411 0-.78-.672-1.412-1.5-1.412-.166 0-.3-.126-.3-.282V7.282C4 7.126 4.134 7 4.3 7h5.138zm0 3.838v1.92h.975v-1.92h-.975zm0 3.839v1.92h.975v-1.92h-.975z"
        />
      </defs>
      <g fillRule="evenodd">
        <mask id={maskId} fill="#fff">
          <use xlinkHref={`#${pathId}`} transform="rotate(-29 11.798 11.799)" />
        </mask>
        <g mask={`url(#${maskId})`}>
          <path d="M0 0h24v24H0z" />
        </g>
      </g>
    </svg>
  );
}

TicketIcon.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  className: PropTypes.string
};

TicketIcon.defaultProps = {
  height: '24',
  width: '24',
  className: ''
};

export default TicketIcon;
