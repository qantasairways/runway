import React from 'react';
import PropTypes from 'prop-types';
import { generate } from 'shortid';

import { colours, fontFamily, fontWeight } from '../../../theme/airways';

import Button from '../../Button';

const textTruncationStyles = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
};

const primaryLabelContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  marginRight: '15px'
};

const primaryLabelStyles = {
  color: colours.darkerGrey,
  fontFamily: fontFamily.body,
  fontSize: '18px',
  ...textTruncationStyles
};

// eslint-disable-next-line react/prop-types
const buildLabel = ({ primaryLabels }) => {
  if (primaryLabels) {
    return (
      <div css={primaryLabelContainerStyles}>
        {primaryLabels.map((label, idx) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            css={primaryLabelStyles}
          >
            {label}
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const seperatorStyles = {
  borderTop: '1px solid #eeeeee'
};
const spacingStyles = { padding: '15px' };

const preFooterStyles = {
  ...spacingStyles,
  ...seperatorStyles,
  paddingTop: '9px',
  paddingBottom: '9px'
};

const buildPreFooter = preFooter =>
  preFooter && <div css={preFooterStyles}>{preFooter}</div>;

const actionButtonStyles = {
  fontFamily: 'Ciutadella',
  fontSize: '16px',
  fontWeight: fontWeight.regular,
  lineHeight: '1.5',
  letterSpacing: '1.5px',
  textAlign: 'center'
};

const primaryLabelOuterContainerStyles = {
  flex: 1,
  justifySelf: 'left',
  paddingRight: '15px',
  overflow: 'hidden'
};

const footerOuterContainerStyles = {
  label: 'runway-footer__root',
  zIndex: 1
};

const footerContainerStyles = {
  label: 'runway-footer__layout-container',
  ...spacingStyles,
  ...seperatorStyles,
  fontFamily: fontFamily.body,
  fontWeight: fontWeight.regular,
  background: colours.white,
  color: colours.darkerGrey,
  paddingRight: '15px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const Footer = ({
  primaryLabels,
  primaryLabelAriaTitle,
  actionText,
  onAction,
  closeAriaLabel,
  preFooter
}) => {
  const summaryId = generate();

  return (
    <div css={footerOuterContainerStyles}>
      {buildPreFooter(preFooter)}
      <div css={footerContainerStyles}>
        <span
          title={primaryLabelAriaTitle}
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
          id={summaryId}
          css={primaryLabelOuterContainerStyles}
        >
          {buildLabel({ primaryLabels })}
        </span>
        <Button
          className="runway-footer__button"
          aria-label={closeAriaLabel}
          label={actionText}
          onClick={onAction}
          cssOverrides={[actionButtonStyles]}
        />
      </div>
    </div>
  );
};

Footer.propTypes = {
  primaryLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  primaryLabelAriaTitle: PropTypes.string.isRequired,
  actionText: PropTypes.string.isRequired,
  onAction: PropTypes.func,
  closeAriaLabel: PropTypes.string.isRequired,
  preFooter: PropTypes.node
};

Footer.defaultProps = {
  onAction: () => {},
  preFooter: null
};

export default Footer;
