import React from 'react';
import PropTypes from 'prop-types';

import InfoIcon from '../../icons/InfoIcon';
import { colours } from '../../theme/airways';

const iconSize = '21px';

const getContainerStyles = ({ height, width }) => ({
  height,
  width,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  marginRight: '10px'
});

const iconStyles = {
  fill: colours.darkerGrey,
  flex: `0 0 ${iconSize}`,
  marginRight: '11px',
  position: 'relative',
  top: '3px'
};

const contentStyles = {
  color: colours.darkerGrey,
  lineHeight: '1.21',
  fontSize: '14px',
  fontFamily: 'Ciutadella'
};

const InfoSection = ({ content, height, width }) => (
  <div css={getContainerStyles({ height, width })}>
    <InfoIcon css={iconStyles} height={iconSize} width={iconSize} />
    <span css={contentStyles}>{content}</span>
  </div>
);

InfoSection.propTypes = {
  content: PropTypes.node.isRequired,
  height: PropTypes.string,
  width: PropTypes.string
};

InfoSection.defaultProps = {
  height: 'auto',
  width: '100%;'
};

export default InfoSection;
