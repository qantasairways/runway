import React from 'react';
import PropTypes from 'prop-types';
import { generate } from 'shortid';

function ClassicRewards({ height, width, className }) {
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
          d="M16.067 13.976L18 19.328l-3.168-1.497L13.374 21l-.99-2.637 1.123-3.139a6.207 6.207 0 0 0 2.56-1.248zm-7.692-1.13a5.172 5.172 0 0 1-1.493-3.64C6.882 6.332 9.23 4 12.124 4s5.242 2.331 5.242 5.207c0 2.555-1.853 4.68-4.296 5.122L10.626 21l-1.458-3.17L6 19.329l2.375-6.482zm5.964-.373a.2.2 0 0 0 .116-.038.204.204 0 0 0 .081-.198l-.383-2.322 1.525-1.542a.203.203 0 0 0-.108-.343l-2.296-.387-.953-1.928a.2.2 0 0 0-.358 0l-.953 1.928-2.296.387a.2.2 0 0 0-.158.138.204.204 0 0 0 .05.205l1.525 1.542-.383 2.322a.203.203 0 0 0 .081.198c.062.045.144.05.211.013l2.102-1.16 2.102 1.16c.03.017.062.025.095.025z"
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

ClassicRewards.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  className: PropTypes.string
};

ClassicRewards.defaultProps = {
  height: '24',
  width: '24',
  className: ''
};

export default ClassicRewards;
