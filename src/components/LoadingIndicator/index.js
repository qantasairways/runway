import { css, keyframes } from '@emotion/core';
import React from 'react';
import PropTypes from 'prop-types';
import { colours } from '../../theme/airways';

const BUBBLE_SIZE = 1.5;
const DELAY_RANGE = 0.32;

const threeBounce = keyframes`
  from { transform: scale(0); }
  40% { transform: scale(1); }
  80% { transform: scale(0); }
  to { transform: scale(0); }
`;

const loadingIndicator = css`
  position: relative;
  margin: auto;
  text-align: center;
  width: ${BUBBLE_SIZE * 2}rem;
`;

const bounceAnimation = css`
  animation: ${threeBounce} 1.4s ease-in-out infinite both;
  background-color: ${colours.darkGrey};
  border-radius: 100%;
  display: inline-block;
  height: ${(BUBBLE_SIZE / 2).toFixed(2)}rem;
  width: ${(BUBBLE_SIZE / 2).toFixed(2)}rem;
`;

const bounceAnimation1 = css`
  ${bounceAnimation};
  animation-delay: ${DELAY_RANGE}s;
  margin-right: 0.25rem;
`;

const bounceAnimation2 = css`
  ${bounceAnimation};
  animation-delay: ${(DELAY_RANGE / 2).toFixed(2)}s;
  margin-right: 0.25rem;
`;

const screenReaderOnly = css`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`;

const LoadingIndicator = ({ screenReaderText }) => (
  <div css={loadingIndicator}>
    <span css={screenReaderOnly}>{screenReaderText}</span>
    <div css={bounceAnimation1} />
    <div css={bounceAnimation2} />
    <div css={bounceAnimation} />
  </div>
);

LoadingIndicator.propTypes = {
  /** Mandatory string to indicate loading for accessibility */
  screenReaderText: PropTypes.string.isRequired
};

export default LoadingIndicator;
